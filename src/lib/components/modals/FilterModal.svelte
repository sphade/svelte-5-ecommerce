<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { SlidersHorizontal } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';

	let open = $state(false);

	// Dummy data for the filter
	const filter = [
		{
			facetName: 'Color',
			facetValues: [
				{ id: 'red', name: 'Red' },
				{ id: 'blue', name: 'Blue' },
				{ id: 'green', name: 'Green' }
			]
		},
		{
			facetName: 'Size',
			facetValues: [
				{ id: 'small', name: 'Small' },
				{ id: 'medium', name: 'Medium' },
				{ id: 'large', name: 'Large' }
			]
		}
	];

	let localFilters: string[] = []; // Initialize localFilters as an empty array

	const handleFacetClick = (id: string) => {
		// Toggle the filter
		if (localFilters.includes(id)) {
			localFilters = localFilters.filter((filterId) => filterId !== id);
		} else {
			localFilters.push(id);
		}
	};
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="w-full ">
		<Dialog.Header class="p-5">
			<Dialog.Title class="font-display text-3xl">Filter</Dialog.Title>
		</Dialog.Header>

		<div class="space-y-5 p-5">
			{#each filter as { facetName, facetValues }}
				<div>
					<h2 class="font-display mb-2 text-xl font-semibold capitalize">{facetName}</h2>
					<div class="flex flex-wrap items-center gap-2">
						{#each facetValues as { id, name }}
							<Button
								variant={localFilters.includes(id) ? 'default' : 'outline'}
								onclick={() => handleFacetClick(id)}
								class="rounded-3xl capitalize hover:border-primary"
							>
								{name}
							</Button>
						{/each}
					</div>
				</div>
			{/each}
		</div>
		<div class="sticky bottom-0 bg-background p-3">
			<Button
				onclick={() => {
					open = false;
				}}
				class="w-full   shadow-md"
				size="lg"
				variant="secondary">Close filter</Button
			>
		</div>
	</Dialog.Content>
</Dialog.Root>

<Button
	variant="link"
	onclick={() => {
		open = true;
	}}
	class="group lg:hidden "
>
	<SlidersHorizontal
		class="ml-2 h-10 w-10 rounded-full bg-primary/20 p-2 transition-colors group-hover:bg-primary/30"
	/>
</Button>
