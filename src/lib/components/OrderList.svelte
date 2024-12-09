<script lang="ts">
	import { formatCurrency } from '$lib/utils';
	import { Loader, Loader2, Minus, Plus, Trash } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import Button from './ui/button/button.svelte';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { loginModalState } from '$lib/states/modalState.svelte';

	let cartItems = $derived($page.data.user.cart?.cartItems ?? []);
</script>

<div class="grid gap-4 py-4">
	{#each cartItems as { product: { name, description, images, id, stock, price }, quantity, productId, cartId } (id)}
		<form
			method="post"
			use:enhance={() => {
				return async ({ update, result }) => {
					await update();
					// Check if there's a message in the result
					if (result.type === 'success') {
						const data = result.data as ActionData;
						toast.success(data?.message || '');
					} else if (result.type === 'failure') {
						const data = result.data as ActionData;
						if (result.status === 401) {
							toast.error(data?.message!, {
								action: {
									label: 'login',
									onClick: () => loginModalState.setTrue()
								}
							});
							return;
						}
						toast.error(data?.message!);
					}
				};
			}}
			animate:flip={{ duration: 300 }}
			out:fly={{ x: 200, duration: 300 }}
		>
			<div
				class="flex justify-between gap-2 rounded-lg px-1 py-3 transition-colors hover:bg-slate-50"
			>
				<img
					class="h-24 w-36 overflow-hidden rounded-xl object-cover"
					src={images[0].fileUrl}
					alt=""
				/>
				<div class="flex-1 space-y-1">
					<p class="font-semibold capitalize">{name}</p>
					<p class="h-10 w-[150px] truncate text-xs text-muted-foreground">
						{description}
					</p>
					<p class="text-sm text-primary">
						{formatCurrency(price)}
					</p>
				</div>
				<div class="flex items-center gap-2">
					<Button
						formaction={`/?/decrementInCart&productId=${productId}&cartId=${cartId}`}
						type="submit"
						size="icon"><Minus /></Button
					>
					<button
						class="flex h-10 w-10 items-center justify-center rounded-md border-2 border-border"
					>
						{quantity}
					</button>
					<Button
						formaction={`/?/incrementInCart&productId=${productId}&cartId=${cartId}&stock=${stock}`}
						type="submit"
						size="icon"><Plus /></Button
					>
				</div>
			</div>
			<Button
				variant="outline"
				size="sm"
				class="w-fit border-destructive bg-destructive/5 text-destructive hover:bg-destructive/5 hover:text-destructive"
				formaction={`/?/deleteFromCart&productId=${productId}&cartId=${cartId}`}
				type="submit"
			>
				<Trash class="mr-3 size-4 " />

				Delete item
			</Button>
		</form>
	{/each}
</div>
