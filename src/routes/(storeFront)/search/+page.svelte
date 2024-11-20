<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import FilterDesktop from '$lib/components/FilterDesktop.svelte';
	import SearchBar2 from '$lib/components/SearchBar2.svelte';
	import FilterModal from '$lib/components/modals/FilterModal.svelte';

	let { data } = $props();

	// Dummy data
	let allProducts = [
		{
			productName: 'Product 1',
			productAsset: 'https://via.placeholder.com/150',
			description: 'This is a sample product description',
			priceWithTax: 19.99,
			currencyCode: 'USD',
			slug: 'product-1'
		},
		{
			productName: 'Product 2',
			productAsset: 'https://via.placeholder.com/150',
			description: 'This is another sample product description',
			priceWithTax: 29.99,
			currencyCode: 'USD',
			slug: 'product-2'
		},
		{
			productName: 'Product 3',
			productAsset: 'https://via.placeholder.com/150',
			description: 'A third product description for demonstration purposes',
			priceWithTax: 39.99,
			currencyCode: 'USD',
			slug: 'product-3'
		}
	];

	let hasNextPage = false; // Placeholder for pagination

	// Example of how to use the dummy data (replace with your actual logic)
	() => {
		hasNextPage = false; // In a real scenario, this would fetch more data
	};
</script>

<div class="mx-auto my-5 max-w-6xl md:my-20 lg:px-10">
	{#if true}
		<h1 class="text-xl font-bold capitalize md:text-3xl">Search for "chair"</h1>
	{/if}
	<div class="my-5 flex items-center justify-between">
		<SearchBar2 />
		<FilterModal />
	</div>
	<section class="  flex w-full flex-col justify-between gap-6 lg:flex-row">
		{#if true}
			{#if true}
				<div class="relative hidden basis-[200px] lg:inline-flex">
					<div class="sticky left-0 top-[5rem] flex flex-col gap-5">
						<FilterDesktop />
					</div>
				</div>
				<div class="flex flex-1 flex-col gap-5">
					<div class="category-section space-y-3 md:space-y-5">
						{#each allProducts as product}
							<div class="grid grid-cols-1 gap-4">
								<ProductCard
									productName={product.productName}
									productAsset={product.productAsset}
									description={product.description}
									priceWithTax={product.priceWithTax}
									currencyCode={product.currencyCode}
									slug={product.slug}
								/>
							</div>
						{/each}
					</div>
					p
					{#if hasNextPage}
						<div class="mx-auto w-fit py-2">
							<Button variant="outline">Show more</Button>
						</div>
					{/if}
				</div>
			{:else}
				<div class="grid h-[400px] w-full place-content-center place-items-center">
					<p class="text-center text-xl font-medium text-muted-foreground">
						No Product Found in the store
					</p>
				</div>
			{/if}
		{/if}
	</section>
</div>
