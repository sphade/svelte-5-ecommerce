<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';

	const sortBy = ['Recommended', 'Rating', 'Delivery Time', 'Delivery Fee', 'Minimum Order'];
	let open = $state(false);

	// Dummy data for categorizedFacets and facetValues
	const categorizedFacets = [
		{
			facetName: 'Cuisine',
			facetValues: [
				{ id: 'cuisine-1', name: 'Italian' },
				{ id: 'cuisine-2', name: 'Mexican' },
				{ id: 'cuisine-3', name: 'Chinese' }
			]
		},
		{
			facetName: 'Dietary',
			facetValues: [
				{ id: 'dietary-1', name: 'Vegetarian' },
				{ id: 'dietary-2', name: 'Vegan' },
				{ id: 'dietary-3', name: 'Gluten-Free' }
			]
		}
	];
</script>

<div class="">
	{#each categorizedFacets as { facetName, facetValues }}
		<h2 class="mt-5 text-lg font-semibold capitalize">{facetName}</h2>
		<div class="mt-7 space-y-5 pl-5">
			{#each facetValues as { id, name }}
				<div class="flex items-center space-x-4">
					<Checkbox id="term-{id}" aria-labelledby="terms-label" />
					<Label
						id="terms-label"
						for="term-{id}"
						class="activeMenu sideMenu cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						{name}
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
