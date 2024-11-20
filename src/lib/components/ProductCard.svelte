<script lang="ts">
	import { formatCurrency } from '$lib/utils';

	interface Props {
		productName: string;
		description: string;
		priceWithTax: { min: number; max: number };
		slug?: string;
		productAsset: { id: number; preview: string } | null;
		currencyCode: string;
	}

	let {
		productName,
		description,
		priceWithTax,
		slug = '',
		productAsset,
		currencyCode
	}: Props = $props();
</script>

<a
	class="group relative w-full cursor-pointer overflow-clip rounded-lg border px-4 text-left transition-[border] hover:shadow-sm md:px-10 lg:px-5"
	href="/product/{slug}"
>
	<div
		class="absolute left-0 top-1/2 h-[90%] w-[3px] -translate-y-1/2 bg-primary transition-all group-hover:w-1"
	></div>

	<div
		class="flex justify-between gap-5 border border-solid border-[transparent] border-b-[#e4e4e4] py-6 hover:border-transparent"
	>
		<div class="flex flex-1 flex-col gap-6">
			<h4 class="text-sm font-semibold capitalize lg:text-lg">{productName}</h4>
			<p class="line-clamp-2 text-xs font-medium text-muted-foreground lg:text-sm">
				{@html description}
			</p>
			<div>
				<span class="w-fit rounded bg-primary/10 p-1 text-xs font-semibold text-primary lg:text-sm">
					{formatCurrency(priceWithTax.min, currencyCode)}
				</span>
				{#if priceWithTax.max !== priceWithTax.min}
					to
					<span
						class="w-fit rounded bg-primary/10 p-1 text-xs font-semibold text-primary lg:text-sm"
					>
						{formatCurrency(priceWithTax.max, currencyCode)}
					</span>
				{/if}
			</div>
		</div>

		<div class="relative h-20 w-[7.5rem] md:h-[8.125rem] md:w-[13.125rem]">
			<img
				class="absolute left-0 top-0 h-full w-full overflow-hidden rounded-xl object-cover"
				src={productAsset?.preview || '/noImage.png'}
				alt="productAsset"
			/>
		</div>
	</div>
</a>
