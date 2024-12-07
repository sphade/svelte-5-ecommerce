<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Form from '$lib/components/ui/form';
	import SuperDebug, { filesProxy, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { productSchema } from '$lib/formSchema.js';
	import { Loader2 } from 'lucide-svelte';

	let { data } = $props();
	const form = superForm(data.form, {
		validators: zodClient(productSchema),
		validationMethod: 'auto'
	});
	const { form: formData, enhance, delayed, errors } = form;
	function getSubCategories(id: number) {
		const category = data.categories.find((cat) => cat.id === id);
		return category?.subCategories || [];
	}
	const images = filesProxy(form, 'images');
	let previews = $derived(Array.from($images).map((file) => URL.createObjectURL(file)));
</script>

<div class="flex-1 space-y-4 p-8 pt-6">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight">Add New Product</h2>
	</div>
	<!-- <SuperDebug data={$formData} /> -->
	<form enctype="multipart/form-data" method="POST" use:enhance action="/admin/products/add">
		<Card.Root>
			<Card.Header>
				<Card.Title>Product Information</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-4">
				<Form.Field {form} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Product Name</Form.Label>
							<Input {...props} bind:value={$formData.name} />
						{/snippet}
					</Form.Control>

					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="description">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Description</Form.Label>
							<Input {...props} bind:value={$formData.description} />
						{/snippet}
					</Form.Control>

					<Form.FieldErrors />
				</Form.Field>

				<div class="grid grid-cols-2 gap-4">
					<Form.Field {form} name="price">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Price</Form.Label>
								<Input {...props} type="number" bind:value={$formData.price} />
							{/snippet}
						</Form.Control>

						<Form.FieldErrors />
					</Form.Field>

					<Form.Field {form} name="stock">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Stock</Form.Label>
								<Input {...props} type="number" bind:value={$formData.stock} />
							{/snippet}
						</Form.Control>

						<Form.FieldErrors />
					</Form.Field>
				</div>
				<div class="grid grid-cols-2 gap-4">
					<Form.Field {form} name="category">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Category</Form.Label>

								<select
									class="block w-full rounded-md border-2 p-1.5"
									{...props}
									bind:value={$formData.category}
									onchange={() => {
										formData.update(
											($f) => {
												$f.subCategory = '';
												return $f;
											},
											{
												taint: true
											}
										);
									}}
								>
									{#each data.categories as category}
										<option value={category.id}>{category.name}</option>
									{/each}
								</select>
							{/snippet}
						</Form.Control>

						<Form.FieldErrors />
					</Form.Field>

					<Form.Field {form} name="subCategory">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Sub Category</Form.Label>

								<select
									class="block w-full rounded-md border-2 p-1.5"
									{...props}
									bind:value={$formData.subCategory}
								>
									{#each getSubCategories($formData.category) as subCategory}
										<option value={subCategory}>{subCategory}</option>
									{/each}
								</select>
							{/snippet}
						</Form.Control>

						<Form.FieldErrors />
					</Form.Field>
				</div>
				<Form.Field {form} name="images">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Images</Form.Label>
							<input
								{...props}
								accept="image/png, image/jpeg"
								bind:files={$images}
								type="file"
								multiple
							/>
						{/snippet}
					</Form.Control>
					{#if $errors.images}
						{#each $errors.images[0] as error}
							<p class="text-red-600">{error}</p>
						{/each}
					{/if}

					<Form.FieldErrors />
				</Form.Field>
				<div class="grid w-fit grid-cols-3 gap-2">
					{#each previews as preview}
						<img src={preview} alt="" class="size-20 rounded-md border-2" />
					{/each}
				</div>

				<Button type="submit">
					{#if $delayed}
						<Loader2 class="size-6 animate-spin " />
					{:else}
						Add Product
					{/if}
				</Button>
			</Card.Content>
		</Card.Root>
	</form>
</div>
