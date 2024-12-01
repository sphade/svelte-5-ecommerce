<script lang="ts">
	import { formatCurrency } from '$lib/utils';
	import { Loader, Loader2, Minus, Plus, Trash } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import Button from './ui/button/button.svelte';
	import { page } from '$app/stores';

	
	const cartItems = $derived($page.data.user.cart.cartItems);
	$inspect(cartItems);
</script>

<div class="grid gap-4 py-4">
	{#each cartItems as { product: { name, description, images, id }, quantity, priceAtTimeOfAddition, productId, cartId } (id)}
		<div animate:flip={{ duration: 300 }} out:fly={{ x: 200, duration: 300 }}>
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
					<p class="text-xs text-muted-foreground">
						{description}
					</p>
					<p class="text-sm text-primary">
						{formatCurrency(priceAtTimeOfAddition)}
					</p>
				</div>
				<div class="flex items-center gap-2">
					<Button disabled={quantity === 1} size="icon"><Minus /></Button>
					<button
						class="flex h-10 w-10 items-center justify-center rounded-md border-2 border-border"
					>
						{#if false}
							<Loader2 class="size-4 animate-spin text-primary" />
						{:else}
							{quantity}
						{/if}
					</button>
					<Button size="icon"><Plus /></Button>
				</div>
			</div>
			<Button
				variant="outline"
				size="sm"
				class="w-fit border-destructive bg-destructive/5 text-destructive hover:bg-destructive/5 hover:text-destructive"
			>
				<Trash class="mr-3 size-4 " />
				{#if false}
					<Loader />
				{:else}
					Delete item
				{/if}
			</Button>
		</div>
	{/each}
</div>
