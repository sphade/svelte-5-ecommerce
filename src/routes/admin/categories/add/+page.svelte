<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
	import { X } from 'lucide-svelte';
	import { Badge } from '$lib/components/ui/badge';

	const categories = [
		{ id: 'electronics', name: 'Electronics' },
		{ id: 'clothing', name: 'Clothing' },
		{ id: 'home-and-garden', name: 'Home & Garden' },
		{ id: 'sports-and-outdoors', name: 'Sports & Outdoors' },
		{ id: 'books', name: 'Books' },
		{ id: 'beauty', name: 'Beauty' },
		{ id: 'toys', name: 'Toys' },
		{ id: 'food-and-beverage', name: 'Food & Beverage' },
		{ id: 'health', name: 'Health' },
		{ id: 'automotive', name: 'Automotive' }
	];

	let subCategories = $state<string[]>([]);
	let subcategoryInput = $state('');

	function handleKeydown(e: Event) {
		const event = e as KeyboardEvent;
		const input = e.currentTarget as HTMLInputElement;

		if (event.key === ' ') {
			const word = input.value.trim();
			console.log('🚀 ~ handleKeydown ~ word:', word);

			if (word && !subCategories.includes(word)) {
				subCategories = [...subCategories, word];
				input.value = '';
				event.preventDefault();
			}
		}
	}
	function handleSubcategoryInput(e: Event) {
		const input = e.target as HTMLInputElement;
		console.log('🚀 ~ handleSubcategoryInput ~ e:', e);
		const value = input.value;

		// Add subcategory when space is pressed
		if (value.endsWith(' ')) {
			const trimmedWord = value.trim();
			console.log('🚀 ~ handleKeydown ~ word:', trimmedWord);

			if (trimmedWord && !subCategories.includes(trimmedWord)) {
				subCategories = [...subCategories, trimmedWord];
				subcategoryInput = '';
			}
		}
	}

	function removeSubcategory(index: number) {
		subCategories = subCategories.filter((_, i) => i !== index);
	}
</script>

<div class="flex-1 space-y-4 p-8 pt-6">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight">Add New Category</h2>
	</div>
	<form>
		<Card.Root>
			<Card.Header>
				<Card.Title>Category Information</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-4">
				<div class="grid grid-cols-2 gap-4">
					<div class="space-y-2">
						<Label>Category Name</Label>
						<Input id="name" name="name" required />
					</div>
					<div class="space-y-2">
						<Label>Short Description</Label>
						<Input id="sku" name="sku" required />
					</div>
				</div>

				<div class="space-y-2">
					<Label>Subcategories</Label>

					<!-- Badges container -->
					{#if subCategories.length > 0}
						<div class="mb-2 flex flex-wrap gap-2">
							{#each subCategories as subcategory, index}
								<Badge
									>{subcategory}

									<button
										type="button"
										class="ml-1.5 hover:text-red-500"
										onclick={() => removeSubcategory(index)}
									>
										<X class="size-3" />
									</button>
								</Badge>
							{/each}
						</div>
					{/if}

					<!-- Input for adding subcategories -->
					<Input
						bind:value={subcategoryInput}
						oninput={handleSubcategoryInput}
						placeholder="Type subcategory and press space to add"
					/>
				</div>

				<Button type="submit">Add Category</Button>
			</Card.Content>
		</Card.Root>
	</form>
</div>
