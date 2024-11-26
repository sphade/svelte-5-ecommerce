<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Table from '$lib/components/ui/table';
	let { data } = $props();
	console.log('🚀 ~ data:', data);
	const categories = [
		{
			id: 1,
			noOfProducts: 100,
			subCategoryCount: 100,
			role: 'Customer',
			status: 'Active',
			joinDate: '2023-01-15',
			lastLogin: '2023-10-01',
			totalSpent: 250.0,
			orderCount: 5
		},
		{
			id: 2,
			name: 'Sarah Johnson',
			subCategoryCount: 100,
			role: 'Customer',
			status: 'Active',
			joinDate: '2023-02-20',
			lastLogin: '2023-09-28',
			totalSpent: 150.5,
			orderCount: 3
		},
		{
			id: 3,
			name: 'Mike Wilson',
			subCategoryCount: 100,
			role: 'Admin',
			status: 'Active',
			joinDate: '2023-03-10',
			lastLogin: '2023-10-02',
			totalSpent: 500.0,
			orderCount: 10
		},
		{
			id: 4,
			name: 'Emma Davis',
			subCategoryCount: 100,
			role: 'Customer',
			status: 'Inactive',
			joinDate: '2023-04-05',
			lastLogin: '2023-08-15',
			totalSpent: 75.0,
			orderCount: 2
		},
		{
			id: 5,
			name: 'James Brown',
			subCategoryCount: 100,
			role: 'Customer',
			status: 'Active',
			joinDate: '2023-05-12',
			lastLogin: '2023-09-30',
			totalSpent: 300.25,
			orderCount: 6
		}
	];
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
						<Button variant="outline" size="sm">Delete</Button>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
