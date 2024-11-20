<script lang="ts">
	import { formatCurrency } from '$lib/utils';
	import { Loader, Loader2, Minus, Plus, Trash } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import Button from './ui/button/button.svelte';

	// Dummy data
	const dummyData = [
		{
			featuredAsset: './hero-1.jpg',
			quantity: 2,
			linePriceWithTax: 100,
			id: 1,
			productVariant: {
				name: 'A Black chair',
				description: 'This is the description for the chair'
			}
		},
		{
			featuredAsset: './hero-2.jpg',
			quantity: 1,
			linePriceWithTax: 150,
			id: 2,
			productVariant: {
				name: 'A Red sofa',
				description: 'This is the description for the red sofa'
			}
		},
		{
			featuredAsset: './hero-3.jpg',
			quantity: 3,
			linePriceWithTax: 200,
			id: 3,
			productVariant: {
				name: 'A Wooden table',
				description: 'This is the description for the wooden table'
			}
		}
	];
</script>

<div class="grid gap-4 py-4">
	{#each dummyData as { featuredAsset, quantity, linePriceWithTax, id, productVariant } (id)}
		<div animate:flip={{ duration: 300 }} out:fly={{ x: 200, duration: 300 }}>
			<div
				class="flex justify-between gap-2 rounded-lg px-1 py-3 transition-colors hover:bg-slate-50"
			>
				<img class="h-24 w-36 overflow-hidden rounded-xl object-cover" src={featuredAsset} alt="" />
				<div class="flex-1 space-y-1">
					<p class="font-semibold capitalize">{productVariant.name}</p>
					<p class="text-xs text-muted-foreground">
						{productVariant.description}
					</p>
					<p class="text-sm text-primary">
						{formatCurrency(linePriceWithTax)}
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
