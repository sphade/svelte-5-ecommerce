<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import type { TCategories } from '$lib/types';
	import { cn } from '$lib/utils';
	import { queryParam, ssp } from 'sveltekit-search-params';

	type TProps = {
		categories: TCategories[];
	};
	let { categories }: TProps = $props();
	let categoryId = queryParam('categoryId', ssp.number());
	let selectedSubCategories = queryParam('subCategories', ssp.array(['']), {
		showDefaults: false
	});

	function toggleSubCategory(subCategory: string) {
		selectedSubCategories.update((currentList) => {
			if (currentList.includes(subCategory)) {
				// Remove the subCategory if it's already in the list
				return currentList.filter((category) => category !== subCategory);
			} else {
				// Add the subCategory if it's not in the list
				return [...currentList, subCategory];
			}
		});
	}

	function isSubCategorySelected(subCategory: string): boolean {
		return $selectedSubCategories.includes(subCategory) || false;
	}
</script>

<div class="lawal">
	{#each categories as { name, id, subCategories }}
		<button
			class={cn(' mt-5 text-lg font-semibold capitalize', {
				'activeMenu sideMenu-active': $categoryId === id
			})}
			onclick={() => {
				$categoryId = id;
			}}
		>
			{name}
		</button>
		<div class="mt-7 space-y-5 pl-5">
			{#each subCategories as subCategory}
				<div class="flex items-center space-x-4">
					<Checkbox
						id="term-{subCategory}"
						checked={isSubCategorySelected(subCategory)}
						aria-labelledby="terms-label"
						onCheckedChange={() => toggleSubCategory(subCategory)}
					/>
					<Label
						id="terms-label"
						for="term-{subCategory}"
						class="  cursor-pointer text-sm font-medium"
					>
						{subCategory}
					</Label>
				</div>
			{/each}
		</div>
	{/each}
</div>

<style lang="postcss">
	.sideMenu {
		position: relative;
		width: max-content;
		transition: width 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
	}

	.sideMenu-active {
		position: relative;
		width: max-content;
		transition: width 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
	}

	.sideMenu:hover.sideMenu::after {
		content: '';
		height: 2px;
		width: 100%;
		position: absolute;
		background-color: #f6b01e;
		bottom: -5px;
		left: 0;
		animation: activeMenu ease 0.5s;
	}
	.sideMenu-active::after {
		content: '';
		height: 2px;
		width: 100%;
		position: absolute;
		background-color: #f6b01e;
		bottom: -5px;
		left: 0;

		animation: activeMenu ease 0.5s;
	}
	@keyframes activeMenu {
		0% {
			width: 0;
		}
		100% {
			width: 100%;
		}
	}
	/* Your existing styles */

	.category-section {
		scroll-margin-top: 100px; /* Adjusts the scroll position */
	}

	.category-section h2 {
		padding-top: 1rem; /* Adds some padding at the top of each category */
		margin-bottom: 1rem;
		background-color: rgba(255, 255, 255, 0.9); /* Adjust based on your background color */
		backdrop-filter: blur(5px);
	}
</style>
