<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';

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
</script>

<div class="flex-1 space-y-4 p-8 pt-6">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight">Add New Product</h2>
	</div>
	<form>
		<Card.Root>
			<Card.Header>
				<Card.Title>Product Information</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-4">
				<div class="grid grid-cols-2 gap-4">
					<div class="space-y-2">
						<Label>Product Name</Label>
						<Input id="name" name="name" required />
					</div>
					<div class="space-y-2">
						<Label>SKU</Label>
						<Input id="sku" name="sku" required />
					</div>
				</div>
				<div class="space-y-2">
					<Label>Description</Label>
					<Textarea id="description" name="description" required />
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div class="space-y-2">
						<Label>Price</Label>
						<Input id="price" name="price" type="number" step="0.01" required />
					</div>
					<div class="space-y-2">
						<Label>Stock</Label>
						<Input id="stock" name="stock" type="number" required />
					</div>
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div class="space-y-2">
						<Label>Category</Label>
						<!-- <Select.Root>
							<Select.Trigger class="w-[180px]">
								<Select.Value placeholder="Theme" />
							</Select.Trigger>
							<Select.Content>
								<Select.Item value="light">Light</Select.Item>
								<Select.Item value="dark">Dark</Select.Item>
								<Select.Item value="system">System</Select.Item>
							</Select.Content>
						</Select.Root> -->
					</div>
					<div class="space-y-2">
						<Label>Subcategory</Label>
						<Input id="subcategory" name="subcategory" />
					</div>
				</div>
				<div class="space-y-2">
					<Label>Brand</Label>
					<Input id="brand" name="brand" />
				</div>
				<div class="space-y-2">
					<Label>Tags (comma-separated)</Label>
					<Input id="tags" name="tags" />
				</div>
				<Button type="submit">Add Product</Button>
			</Card.Content>
		</Card.Root>
	</form>
</div>
