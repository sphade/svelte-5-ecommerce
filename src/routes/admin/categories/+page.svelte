<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Table from '$lib/components/ui/table';
	import { toast } from 'svelte-sonner';
	let { data } = $props();
	console.log('🚀 ~ data:', data);
	
</script>

<div class="flex-1 space-y-4 p-8 pt-6">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight">Categories</h2>
		<div class="flex items-center space-x-2">
			<Input class="w-[150px] lg:w-[250px]" placeholder="Search categories..." />
			<Button href="categories/add">Add new Category</Button>
		</div>
	</div>
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">ID</Table.Head>
				<Table.Head>Name</Table.Head>
				<Table.Head>number of subcategories</Table.Head>
				<Table.Head>description</Table.Head>

				<Table.Head class="text-right">Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.categories as category}
				<Table.Row>
					<Table.Cell class="font-medium">{category.id}</Table.Cell>
					<Table.Cell>{category.name}</Table.Cell>
					<Table.Cell>{category.subCategories.length}</Table.Cell>
					<Table.Cell>{category.description || 'no description'}</Table.Cell>

					<Table.Cell class="text-right">
						<form action="?/deleteCategory" method="POST" class="inline"
						use:enhance={({}) => {
							return async ({ update, result }) => {
								// Wait for the form to be updated
								await update();
								// Check if there's a message in the result
								if (result.type === 'success') {
									const data = result.data as any;

									toast.success(data?.message!);
								} else if (result.type === 'failure') {
									const data = result.data as any;

									toast.error(data?.message!);
								}
							};
						}}
						>
							<input type="text" name="id" value={category.id} hidden />
							<Button type="submit" variant="outline" size="sm">Delete</Button>
						</form>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
