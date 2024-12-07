<script lang="ts">
	import { CheckCircle2 } from 'lucide-svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { formatCurrency } from '$lib/utils.js';

	import { Confetti } from 'svelte-confetti';
	import { SHIPPING_FEE } from '$lib/constant';

	// Dummy data
	let { data } = $props();
	let subTotal = data?.order?.amount || 0;
</script>

<div
	style="
 position: fixed;
 top: -50px;
 left: 0;
 height: 100vh;
 width: 100vw;
 display: flex;
 justify-content: center;
 overflow: hidden;
 pointer-events: none;"
>
	<Confetti
		x={[-5, 5]}
		y={[0, 0.1]}
		delay={[500, 2000]}
		duration={5000}
		amount={200}
		fallDistance="100vh"
	/>
</div>
<Breadcrumb.Root class="mx-auto my-10 w-fit">
	<Breadcrumb.List>
		<Breadcrumb.Item>
			<Breadcrumb.Link href="./">Shipping</Breadcrumb.Link>
		</Breadcrumb.Item>
		<Breadcrumb.Separator />
		<Breadcrumb.Item>
			<Breadcrumb.Link href="/components">Payment</Breadcrumb.Link>
		</Breadcrumb.Item>
		<Breadcrumb.Separator />
		<Breadcrumb.Item>
			<Breadcrumb.Page>Confirmation</Breadcrumb.Page>
		</Breadcrumb.Item>
	</Breadcrumb.List>
</Breadcrumb.Root>
<div class=" mx-auto max-w-4xl px-3">
	<h1 class="flex items-center gap-5 text-center text-4xl font-bold capitalize">
		<CheckCircle2 class="size-16 text-green-500" />
		Order summary
	</h1>
	<p class="mb-10 mt-5 text-2xl">
		Your order has been received! <span class="font-medium">{data.order?.code}</span>
	</p>
	<div class="space-y-3 divide-y">
		{#each data.order?.orderProducts ?? [] as { product: { images, sku, stock, name, price }, quantity }}
			<div
				class="flex justify-between gap-5 rounded-lg px-1 py-3 transition-colors hover:bg-slate-50"
			>
				<img
					src={images[0].fileUrl}
					class="h-24 w-36 rounded-md object-cover"
					alt={images[0].key}
				/>
				<div class="flex-1 space-y-3">
					<p class="font-semibold capitalize">{name}</p>
					<p class="text-xs text-muted-foreground">
						{sku}
					</p>
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
				<p>{formatCurrency(subTotal)}</p>
			</div>
			<div class="flex items-center justify-between">
				<p>Shipping</p>
				<p>{formatCurrency(SHIPPING_FEE)}</p>
			</div>
		</div>
		<div class="flex items-center justify-between">
			<p class="py-5 font-semibold">Total</p>
			<p>{formatCurrency(subTotal + SHIPPING_FEE)}</p>
		</div>
	</div>
</div>
