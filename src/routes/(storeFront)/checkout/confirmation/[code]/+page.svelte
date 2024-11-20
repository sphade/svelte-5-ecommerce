<script lang="ts">
	import { CheckCircle2 } from 'lucide-svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { formatCurrency } from '$lib/utils.js';

	import { Confetti } from 'svelte-confetti';

	// Dummy data
	let data = {
		order: {
			code: 'ORDER-12345',
			currencyCode: 'USD',
			lines: [
				{
					featuredAsset: {
						preview: 'https://placehold.co/600x400',
						id: 'product-image-1'
					},
					id: 'line-item-1',
					linePriceWithTax: 19.99,
					productVariant: {
						name: 'T-Shirt',
						sku: 'TSHIRT-001'
					},
					quantity: 2
				},
				{
					featuredAsset: {
						preview: 'https://placehold.co/600x400',
						id: 'product-image-2'
					},
					id: 'line-item-2',
					linePriceWithTax: 29.99,
					productVariant: {
						name: 'Hoodie',
						sku: 'HOODIE-002'
					},
					quantity: 1
				}
			],
			subTotalWithTax: 49.98,
			shippingWithTax: 5.99,
			totalWithTax: 55.97
		}
	};
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
		{#each data.order.lines as { featuredAsset, id, linePriceWithTax, productVariant, quantity } (id)}
			<div
				class="flex justify-between gap-5 rounded-lg px-1 py-3 transition-colors hover:bg-slate-50"
			>
				<img
					src={featuredAsset?.preview}
					class="h-24 w-36 rounded-md object-cover"
					alt={featuredAsset?.id}
				/>
				<div class="flex-1 space-y-3">
					<p class="font-semibold capitalize">{productVariant.name}</p>
					<p class="text-xs text-muted-foreground">
						{productVariant.sku}
					</p>
					<p class="text-sm text-primary">
						{formatCurrency(Number(linePriceWithTax), data.order.currencyCode)}
					</p>
				</div>
				<button class="h-10 w-10 rounded-md border-2 border-border"> {quantity} </button>
			</div>
		{/each}
		<div class="space-y-5 py-5">
			<div class="flex items-center justify-between">
				<p>Subtotal</p>
				<p>{formatCurrency(Number(data.order.subTotalWithTax), data.order.currencyCode)}</p>
			</div>
			<div class="flex items-center justify-between">
				<p>Shipping</p>
				<p>{formatCurrency(Number(data.order.shippingWithTax), data.order.currencyCode)}</p>
			</div>
		</div>
		<div class="flex items-center justify-between">
			<p class="py-5 font-semibold">Total</p>
			<p>{formatCurrency(Number(data.order.totalWithTax), data.order.currencyCode)}</p>
		</div>
	</div>
</div>
