<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { formatCurrency } from '$lib/utils';
	import { toast } from 'svelte-sonner';

	let data = {
		activeOrder: {
			code: '1234567890',
			state: 'AddingItems',
			currencyCode: 'USD',
			lines: [
				{
					featuredAsset: {
						preview: 'https://placehold.co/600x400'
					},
					quantity: 2,
					linePriceWithTax: 100,
					id: '1',
					productVariant: {
						name: 'Product A'
					}
				},
				{
					featuredAsset: {
						preview: 'https://placehold.co/600x400'
					},
					quantity: 1,
					linePriceWithTax: 50,
					id: '2',
					productVariant: {
						name: 'Product B'
					}
				}
			],
			subTotalWithTax: 150,
			shippingWithTax: 10,
			totalWithTax: 160
		},
		paymentMethods: [
			{
				name: 'Card Payment',
				isEligible: true
			},
			{
				name: 'PayPal',
				isEligible: false
			}
		]
	};

	// ... rest of the component logic ...
</script>

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
<div class="grid grid-cols-1 gap-5 px-5 md:grid-cols-2">
	<div class="grid place-items-center">
		<div class="space-y-3 text-center">
			<p>This is a dummy payment for demonstration purposes only</p>
			<div class="flex flex-col gap-5">
				{#each data.paymentMethods ?? [] as paymentMethod}
					<Button>{paymentMethod.name}</Button>
				{/each}
			</div>
		</div>
	</div>

	<div class="px-10">
		<h1 class="text-xl font-semibold capitalize">Order Summary</h1>
		<div class="space-y-3 divide-y">
			{#each data?.activeOrder?.lines ?? [] as { featuredAsset, quantity, linePriceWithTax, id, productVariant } (id)}
				<div
					class="flex justify-between gap-5 rounded-lg px-1 py-3 transition-colors hover:bg-slate-50"
				>
					<img src={featuredAsset?.preview} class="h-24 w-36 rounded-md object-cover" alt="" />
					<div class="flex-1 space-y-3">
						<p class="font-semibold capitalize">{productVariant.name}</p>

						<p class="text-sm text-primary">
							{formatCurrency(linePriceWithTax, data?.activeOrder?.currencyCode)}
						</p>
					</div>
					<button class="h-10 w-10 rounded-md border-2 border-border"> {quantity} </button>
				</div>
			{/each}
			<div class="space-y-5 py-5">
				<div class="flex items-center justify-between">
					<p>Subtotal</p>
					<p>
						{formatCurrency(data?.activeOrder?.subTotalWithTax, data?.activeOrder?.currencyCode)}
					</p>
				</div>
				<div class="flex items-center justify-between">
					<p>Shipping</p>
					<p>
						{formatCurrency(data?.activeOrder?.shippingWithTax, data?.activeOrder?.currencyCode)}
					</p>
				</div>
			</div>
			<div class="flex items-center justify-between">
				<p class="py-5 font-semibold">Total</p>
				<p>{formatCurrency(data?.activeOrder?.totalWithTax, data?.activeOrder?.currencyCode)}</p>
			</div>
		</div>
	</div>
</div>
