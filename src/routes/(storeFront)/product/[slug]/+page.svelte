<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Loader, Minus, Plus, Heart, Star } from 'lucide-svelte';
	import { formatCurrency } from '$lib/utils';
	import { Badge } from '$lib/components/ui/badge';
	import * as Carousel from '$lib/components/ui/carousel';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import type { ActionData } from './$types';
	import { loginModalState } from '$lib/states/modalState.svelte.js';

	let { data, form } = $props();
	let quantity = $state(1);
	let price = $derived(data.product.price * quantity);

	// Dummy data for product and variants
</script>

<div class="mx-auto w-full max-w-6xl px-3 xl:px-0">
	<h1 class=" mt-3 text-2xl font-semibold capitalize md:mt-5 md:text-4xl">{data.product?.name}</h1>

	<div class="mt-5 flex flex-col gap-5 md:mt-10 md:flex-row">
		<Carousel.Root class="basis-[600px]">
			<Carousel.Content class="border  border-red-500">
				{#each data.product.images as image}
					<Carousel.Item
						class="h-[300px]  w-full rounded-md border-4 border-red-700 p-1 md:h-[400px]"
					>
						<img
							class="h-full w-full rounded-md object-cover"
							src={image.fileUrl}
							alt={image.key}
						/>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
		</Carousel.Root>

		<div class="flex-1 space-y-3">
			<div class="relative h-fit">
				<p class="space-y-3 text-sm leading-7 text-muted-foreground md:text-base">
					{data.product?.description}
				</p>
			</div>

			<form
				class="fixed bottom-0 flex w-full items-center gap-2 border bg-background p-1 px-3 py-3 md:static md:border-none md:p-4 md:px-1"
				action="?/addToOrder"
				method="POST"
				use:enhance={() => {
					return async ({ update, result }) => {
						await update();
						// Check if there's a message in the result
						if (result.type === 'success') {
							const data = result.data as ActionData;

							toast.success(data?.message!);
						} else if (result.type === 'failure') {
							const data = result.data as ActionData;

							toast.error(data?.message!, {
								action: {
									label: 'login',
									onClick: () => loginModalState.setTrue()
								}
							});
						}
					};
				}}
			>
				{data.product.stock}
				<input value={quantity} name="quantity" type="number" hidden />
				<div class="flex items-center gap-4 rounded-lg border border-primary/10 bg-primary/10 p-2">
					<Button disabled={quantity <= 1} onclick={() => quantity--} size="icon" variant="outline">
						<Minus />
					</Button>
					<p class="text-xl font-normal text-primary">{quantity}</p>
					<Button
						disabled={!data.product.stock}
						onclick={() => quantity++}
						size="icon"
						variant="outline"
					>
						<Plus />
					</Button>
				</div>
				<Button
					type="submit"
					size="lg"
					class="flex-1  justify-between py-7 shadow-lg transition-all"
					disabled={!data.product.stock}
				>
					{#if false}
						<Loader class="size-5 animate-spin" />
					{:else}
						<span class="font-bold capitalize">add to order</span>
					{/if}
					{formatCurrency(price)}
				</Button>
			</form>

			<div class="flex items-center gap-4 text-sm">
				<p class="text-lg text-muted-foreground">
					{data.product.sku}
				</p>
				{#if data.product.stock === 0}
					<Badge variant="destructive">Out of Stock</Badge>
				{:else}
					<Badge class="bg-green-500 hover:bg-green-500">In Stock</Badge>
				{/if}
			</div>

			<div class="pt-3">
				<p class="text-sm font-bold">Shipping & Returns</p>
				<p class="text-xs text-muted-foreground">
					Standard shipping: 3 - 5 working days. Express shipping: 1 - 3 working days. Shipping
					costs depend on delivery address and will be calculated during checkout. Returns are
					subject to terms. Please see the RETURNS PAGE for further information.
				</p>
			</div>
		</div>
	</div>
</div>
