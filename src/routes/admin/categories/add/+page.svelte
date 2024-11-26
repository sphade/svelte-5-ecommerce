<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
	import { X } from 'lucide-svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { categorySchema } from '$lib/formSchema.js';
	import * as Form from '$lib/components/ui/form';

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
	let { data } = $props();
	const form = superForm(data.form, {
		validators: zodClient(categorySchema),
		dataType: 'json'
	});

	const { form: formData, enhance, delayed } = form;
	let subcategoryInput = $state('');

	function handleKeydown(e: Event) {
		const event = e as KeyboardEvent;
		const input = e.currentTarget as HTMLInputElement;

		if (event.key === ' ') {
			const word = input.value.trim();
			console.log('🚀 ~ handleKeydown ~ word:', word);

			if (word && !$formData.subCategories.includes(word)) {
				$formData.subCategories = [...$formData.subCategories, word];
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

			if (trimmedWord && !$formData.subCategories.includes(trimmedWord)) {
				$formData.subCategories = [...$formData.subCategories, trimmedWord];
				subcategoryInput = '';
			}
		}
	}

	function removeSubcategory(index: number) {
		$formData.subCategories = $formData.subCategories.filter((_, i) => i !== index);
	}
</script>

<div class="flex-1 space-y-4 p-8 pt-6">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight">Add New Category</h2>
	</div>
	<form method="POST" use:enhance action="add">
		<Card.Root>
			<Card.Header>
				<Card.Title>Category Information</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-4">
				<div class="grid grid-cols-2 gap-4">
					<Form.Field {form} name="name">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Category Name</Form.Label>
								<Input {...props} bind:value={$formData.name} />
							{/snippet}
						</Form.Control>

						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="description">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Short Description</Form.Label>
								<Input {...props} bind:value={$formData.description} />
							{/snippet}
						</Form.Control>

						<Form.FieldErrors />
					</Form.Field>
				</div>
				<Form.Field {form} name="subCategories">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Subcategories</Form.Label>
							{#if $formData.subCategories.length > 0}
								<div class="mb-2 flex flex-wrap gap-2">
									{#each $formData.subCategories as subcategory, index}
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
							<Input
								{...props}
								bind:value={subcategoryInput}
								oninput={handleSubcategoryInput}
								placeholder="Type subcategory and press space to add"
							/>
						{/snippet}
					</Form.Control>

					<Form.FieldErrors />
				</Form.Field>

				<Button type="submit">Add Category</Button>
			</Card.Content>
		</Card.Root>
	</form>
</div>
