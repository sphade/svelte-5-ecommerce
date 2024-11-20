<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Table from '$lib/components/ui/table';

	const products = [
		{
			id: 1,
			name: 'Product 1',
			category: 'Electronics',
			subCategory: 'phone',
			price: 99.99,
			stock: 50
		},
		{
			id: 2,
			name: 'Product 2',
			subCategory: 'phone',
			category: 'Clothing',
			price: 49.99,
			stock: 100
		},
		{ id: 3, name: 'Product 3', category: 'Home', subCategory: 'phone', price: 149.99, stock: 25 },
		{
			id: 4,
			name: 'Product 4',
			category: 'Electronics',
			subCategory: 'phone',
			price: 199.99,
			stock: 10
		},
		{
			id: 5,
			name: 'Product 5',
			category: 'Clothing',
			subCategory: 'phone',
			price: 29.99,
			stock: 200
		}
	];
</script>

<div class="flex-1 space-y-4 p-8 pt-6">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight">Products</h2>
		<div class="flex items-center space-x-2">
			<Input class="w-[150px] lg:w-[250px]" placeholder="Search products..." />
			<Button href="products/add">Add Product</Button>
			<a href="add">Add Product</a>
		</div>
	</div>
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">ID</Table.Head>
				<Table.Head>Name</Table.Head>
				<Table.Head>Category</Table.Head>
				<Table.Head>Sub category</Table.Head>
				<Table.Head>Price</Table.Head>
				<Table.Head>Stock</Table.Head>
				<Table.Head class="text-right">Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each products as product}
				<Table.Row>
					<Table.Cell class="font-medium">{product.id}</Table.Cell>
					<Table.Cell>{product.name}</Table.Cell>
					<Table.Cell>{product.category}</Table.Cell>
					<Table.Cell>{product.subCategory}</Table.Cell>
					<Table.Cell>${product.price.toFixed(2)}</Table.Cell>
					<Table.Cell>{product.stock}</Table.Cell>
					<Table.Cell class="text-right">
						<Button variant="outline" size="sm" class="mr-2">Edit</Button>
						<Button variant="outline" size="sm">Delete</Button>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
