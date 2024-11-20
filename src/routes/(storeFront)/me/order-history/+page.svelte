<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import Button from '$lib/components/ui/button/button.svelte';
	import { ChevronsUpDown, Star } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { cn, formatCurrency } from '$lib/utils';
	import { Badge } from '$lib/components/ui/badge';

	// Dummy data
	const dummyOrderList = [
		{
			code: 'ORD123456',
			orderPlacedAt: '2023-04-15T12:34:56.789Z',
			currencyCode: 'USD',
			subTotalWithTax: 99.99,
			state: 'Created',
			lines: [
				{
					featuredAsset: {
						preview: 'https://via.placeholder.com/150'
					},
					quantity: 2,
					linePriceWithTax: 49.99,
					productVariant: {
						name: 'Product 1',
						sku: 'PROD1',
						priceWithTax: 24.99
					},
					id: 1
				},
				{
					featuredAsset: {
						preview: 'https://via.placeholder.com/150'
					},
					quantity: 1,
					linePriceWithTax: 49.99,
					productVariant: {
						name: 'Product 2',
						sku: 'PROD2',
						priceWithTax: 49.99
					},
					id: 2
				}
			]
		},
		{
			code: 'ORD789012',
			orderPlacedAt: '2023-03-01T09:12:34.567Z',
			currencyCode: 'EUR',
			subTotalWithTax: 149.99,
			state: 'Shipped',
			lines: [
				{
					featuredAsset: {
						preview: 'https://via.placeholder.com/150'
					},
					quantity: 1,
					linePriceWithTax: 99.99,
					productVariant: {
						name: 'Product 3',
						sku: 'PROD3',
						priceWithTax: 99.99
					},
					id: 3
				},
				{
					featuredAsset: {
						preview: 'https://via.placeholder.com/150'
					},
					quantity: 1,
					linePriceWithTax: 49.99,
					productVariant: {
						name: 'Product 4',
						sku: 'PROD4',
						priceWithTax: 49.99
					},
					id: 4
				}
			]
		}
	];
</script>

{#if dummyOrderList.length > 0}
	{#each dummyOrderList as { code, orderPlacedAt, currencyCode, subTotalWithTax, state, lines }}
		<Collapsible.Root class=" mb-2">
			<div class="flex items-center justify-between rounded-md bg-muted p-5">
				<div class="flex flex-wrap items-center justify-between gap-3 md:gap-10">
					<div class="">
						<p class="text-sm font-medium capitalize">Date placed</p>
						<p class="text-xs text-muted-foreground">
							{new Intl.DateTimeFormat('en-US', {
								year: 'numeric',
								month: 'short',
								day: '2-digit'
							}).format(new Date(orderPlacedAt))}
						</p>
					</div>
					<div>
						<p class="text-sm font-medium capitalize">Total sum</p>
						<p class="text-xs text-muted-foreground">
							{formatCurrency(Number(subTotalWithTax), currencyCode)}
						</p>
					</div>
					<div>
						<p class="text-sm font-medium capitalize">Order number</p>
						<p class="text-xs text-muted-foreground">{code}</p>
					</div>
					<div class="">
						<p class="text-sm font-medium capitalize">Status</p>
						<span
							class={cn(
								'inline-flex  items-center justify-center rounded-full border px-2 py-1  text-xs font-medium',
								{
									'border-yellow-200 bg-yellow-100 text-yellow-800': [
										'Created',
										'Draft',
										'AddingItems',
										'ArrangingPayment',
										'Modifying'
									].includes(state),
									'border-red-200 bg-red-100 text-red-800': state === 'Cancelled',
									'border-green-200 bg-green-100 text-green-800': [
										'PaymentAuthorized',
										'PaymentSettled',
										'PartiallyShipped',
										'Shipped',
										'PartiallyDelivered',
										'Delivered'
									].includes(state),
									'border-gray-200 bg-gray-100 text-gray-800': state === 'Unknown'
								}
							)}
						>
							{#if ['Created', 'Draft'].includes(state)}
								{state}
							{:else if ['AddingItems', 'ArrangingPayment', 'Modifying'].includes(state)}
								{state.replace(/([A-Z])/g, ' $1').trim()}
							{:else if state === 'Cancelled'}
								Cancelled
							{:else if ['PaymentAuthorized', 'PaymentSettled'].includes(state)}
								{state.replace(/([A-Z])/g, ' $1').trim()}
							{:else if ['PartiallyShipped', 'Shipped', 'PartiallyDelivered', 'Delivered'].includes(state)}
								{state.replace(/([A-Z])/g, ' $1').trim()}
							{:else}
								Unknown
							{/if}
						</span>
					</div>
				</div>
				<Collapsible.Trigger asChild>
					{#snippet children({ builder })}
						<Button builders={[builder]} variant="ghost" size="sm" class="w-9 p-0">
							<ChevronsUpDown class="h-4 w-4" />
							<span class="sr-only">Toggle</span>
						</Button>
					{/snippet}
				</Collapsible.Trigger>
			</div>
			<Collapsible.Content class="m-0 space-y-2 p-0">
				<Table.Root class="rounded-md border">
					<Table.Header>
						<Table.Row class="text-sm">
							<Table.Head class="w-[100px]"></Table.Head>
							<Table.Head>Name</Table.Head>
							<Table.Head>sku</Table.Head>
							<Table.Head>Unit Price</Table.Head>
							<Table.Head>Quantity</Table.Head>
							<Table.Head class="text-right">Total</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body class="text-xs">
						{#each lines as { featuredAsset, quantity, linePriceWithTax, productVariant, id }}
							<Table.Row>
								<Table.Cell class="font-medium">
									<img src={featuredAsset?.preview} class="size-16 rounded-lg" alt="" />
								</Table.Cell>
								<Table.Cell class="capitalize">{productVariant.name}</Table.Cell>
								<Table.Cell class="capitalize">{productVariant.sku}</Table.Cell>
								<Table.Cell
									>{formatCurrency(Number(productVariant.priceWithTax), currencyCode)}</Table.Cell
								>
								<Table.Cell>{quantity}</Table.Cell>
								<Table.Cell class="text-right"
									>{formatCurrency(Number(linePriceWithTax), currencyCode)}</Table.Cell
								>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</Collapsible.Content>
		</Collapsible.Root>
	{/each}
{:else}
	<div class="flex h-[50vh] w-full flex-col items-center justify-center text-center">
		<h1 class="font-display text-3xl font-semibold">You haven't made any orders yet</h1>
		<p class="text-muted-foreground">You'll find all the details of your orders here</p>
	</div>
{/if}
