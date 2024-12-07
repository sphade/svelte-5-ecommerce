<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { formatCurrency } from '$lib/utils';
	import { toast } from 'svelte-sonner';
	import { page } from '$app/stores';
	import { loadStripe } from '@stripe/stripe-js';
	import { Elements, LinkAuthenticationElement, PaymentElement } from 'svelte-stripe';
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Loader } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { SHIPPING_FEE } from '$lib/constant.js';
	let { data } = $props();
	let stripe: any = $state(null);
	let error = $state(null);
	let elements: any = $state(null);
	let processing = $state(false);
	let message = $state('');
	onMount(async () => {
		stripe = await loadStripe(PUBLIC_STRIPE_KEY);
	});
	let cartItems = $derived($page.data.user?.cart?.cartItems ?? []);
	let totalAmount = $derived(
		cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
	);
	async function submit(e) {
		e.preventDefault();
		if (!stripe || !elements || processing) {
			return;
		}

		processing = true;
		error = null;

		// confirm payment with stripe

		const result = await stripe.confirmPayment({
			elements,
			redirect: 'if_required'
		});

		console.log({ result });
		// if (result.error.type === 'card_error' || result.error.type === 'validation_error') {
		// 	message = error.message;
		// } else {
		// 	message = 'An unexpected error occurred.';
		// }
		if (result.error) {
			// payment failed, notify user
			error = result.error.message;
			processing = false;
		} else {
			const res = await fetch('/api/order', {
				method: 'POST',
				body: JSON.stringify({ cartId: $page.data.user.cart?.id })
			});
			const code = await res.text();
			processing = false;
			console.log('🚀 ~ submit ~ res:', res);
			console.log('🚀 ~ submit ~ code:', code);

			goto(`confirmation/${code}`, { invalidateAll: true });
		}
	}
</script>

<!-- on:change={(e) => {
					email = e.detail.value.email;
				}} -->

<Breadcrumb.Root class="mx-auto my-10 w-fit">
	<Breadcrumb.List>
		<Breadcrumb.Item>
			<Breadcrumb.Link>Shipping</Breadcrumb.Link>
		</Breadcrumb.Item>
		<Breadcrumb.Separator />
		<Breadcrumb.Item>
			<Breadcrumb.Page>Payment</Breadcrumb.Page>
		</Breadcrumb.Item>
		<Breadcrumb.Separator />
		<Breadcrumb.Item>
			<Breadcrumb.Link>Confirmation</Breadcrumb.Link>
		</Breadcrumb.Item>
	</Breadcrumb.List>
</Breadcrumb.Root>
{#if error}
	<div
		transition:fade
		class="mx-auto mb-5 max-w-6xl border-l-4 border-red-500 bg-red-100 p-4 text-red-700"
		role="alert"
	>
		<p class="font-bold">Error</p>
		<p>{error}</p>
	</div>
{/if}
<div class="grid grid-cols-1 gap-5 px-5 md:grid-cols-2">
	<div class="grid place-items-center">
		<div class="space-y-3 text-center">
			<p>This is a test payment for demonstration purposes only</p>
			<form onsubmit={submit}>
				<Elements {stripe} clientSecret={data.clientSecret} bind:elements>
					<LinkAuthenticationElement />
					<PaymentElement />
				</Elements>

				<Button type="submit" class="mt-5 w-full">
					{#if processing}
						<Loader class="animate-spin " />
					{:else}
						Pay
					{/if}
				</Button>
			</form>
		</div>
	</div>

	<div class="px-10">
		<h1 class="text-xl font-semibold capitalize">Order Summary</h1>
		<div class="space-y-3 divide-y">
			{#each cartItems as { product: { name, description, images, id, stock, price }, quantity, productId, cartId } (id)}
				<div
					class="flex justify-between gap-5 rounded-lg px-1 py-3 transition-colors hover:bg-slate-50"
				>
					<img src={images[0].fileUrl} class="h-24 w-36 rounded-md object-cover" alt="" />
					<div class="flex-1 space-y-3">
						<p class="font-semibold capitalize">{name}</p>

						<p class="text-sm text-primary">
							{formatCurrency(price)}
						</p>
					</div>
					<button class="h-10 w-10 rounded-md border-2 border-border"> {quantity} </button>
				</div>
			{/each}
			<div class="space-y-5 py-5">
				<div class="flex items-center justify-between">
					<p>Subtotal</p>
					<p>
						{formatCurrency(totalAmount)}
					</p>
				</div>
				<div class="flex items-center justify-between">
					<p>Shipping</p>
					<p>
						{formatCurrency(SHIPPING_FEE)}
					</p>
				</div>
			</div>
			<div class="flex items-center justify-between">
				<p class="py-5 font-semibold">Total</p>
				<p>{formatCurrency(totalAmount + SHIPPING_FEE)}</p>
			</div>
		</div>
	</div>
</div>
