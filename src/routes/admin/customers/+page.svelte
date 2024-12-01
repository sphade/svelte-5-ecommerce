<script lang="ts">
	import type { PageData } from './$types';
	import * as Table from '$lib/components/ui/table';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { ChevronDown } from 'lucide-svelte';

	const customers = [
		{ id: 1, name: 'Olivia Martin', email: 'olivia.martin@email.com', orders: 5, spent: 299.0 },
		{ id: 2, name: 'Ava Johnson', email: 'ava.johnson@email.com', orders: 3, spent: 249.0 },
		{ id: 3, name: 'Michael Johnson', email: 'michael.johnson@email.com', orders: 2, spent: 99.0 },
		{ id: 4, name: 'Lisa Anderson', email: 'lisa.anderson@email.com', orders: 1, spent: 39.0 },
		{ id: 5, name: 'Richard Davis', email: 'richard.davis@email.com', orders: 4, spent: 189.0 }
	];
</script>

<div class="flex-1 space-y-4 p-8 pt-6">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight">Customers</h2>
		<div class="flex items-center space-x-2">
			<Input class="w-[150px] lg:w-[250px]" placeholder="Search customers..." />
			<Button>Add Customer</Button>
		</div>
	</div>
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">ID</Table.Head>
				<Table.Head>Name</Table.Head>
				<Table.Head>Email</Table.Head>
				<Table.Head>Orders</Table.Head>
				<Table.Head>Total Spent</Table.Head>
				<Table.Head class="text-right">Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each customers as customer}
				<Table.Row>
					<Table.Cell class="font-medium">{customer.id}</Table.Cell>
					<Table.Cell>{customer.name}</Table.Cell>
					<Table.Cell>{customer.email}</Table.Cell>
					<Table.Cell>{customer.orders}</Table.Cell>
					<Table.Cell>${customer.spent.toFixed(2)}</Table.Cell>
					<Table.Cell class="text-right">
						<Button variant="outline" size="sm" class="mr-2">View</Button>
						<Button variant="outline" size="icon">
							<ChevronDown />
							Edit
						</Button>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
