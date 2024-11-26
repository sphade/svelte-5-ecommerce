<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Table from '$lib/components/ui/table';
	import { ALargeSmall } from 'lucide-svelte';

	const orders = [
		{ id: 3210, status: 'Shipped', customer: 'Olivia Martin', amount: 79.0, date: '2023-01-15' },
		{ id: 3209, status: 'Processing', customer: 'Ava Johnson', amount: 149.0, date: '2023-01-14' },
		{
			id: 3208,
			status: 'Cancelled',
			customer: 'Michael Johnson',
			amount: 39.0,
			date: '2023-01-13'
		},
		{ id: 3207, status: 'Shipped', customer: 'Lisa Anderson', amount: 299.0, date: '2023-01-12' },
		{ id: 3206, status: 'Processing', customer: 'Richard Davis', amount: 189.0, date: '2023-01-11' }
	];
</script>

<div class="flex-1 space-y-4 p-8 pt-6">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight">Orders</h2>
		<div class="flex items-center space-x-2">
			<Input class="w-[150px] lg:w-[250px]" placeholder="Search orders..." />
			<Button>Export</Button>
		</div>
	</div>
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">Order ID</Table.Head>
				<Table.Head>Status</Table.Head>
				<Table.Head>Customer</Table.Head>
				<Table.Head>Amount</Table.Head>
				<Table.Head>Date</Table.Head>
				<Table.Head class="text-right">Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each orders as order (order.id)}
				<Table.Row>
					<Table.Cell class="font-medium">#{order.id}</Table.Cell>
					<Table.Cell>
						<div class="flex items-center">
							{#if order.status === 'Shipped'}
								<ALargeSmall class="mr-2 h-4 w-4 text-green-500" />
							{:else if order.status === 'Processing'}
								<ALargeSmall class="mr-2 h-4 w-4 text-yellow-500" />
							{:else if order.status === 'Cancelled'}
								<ALargeSmall class="mr-2 h-4 w-4 text-red-500" />
							{/if}
							<span>{order.status}</span>
						</div>
					</Table.Cell>
					<Table.Cell>{order.customer}</Table.Cell>
					<Table.Cell>${order.amount.toFixed(2)}</Table.Cell>
					<Table.Cell>{order.date}</Table.Cell>
					<Table.Cell class="text-right">
						<Button variant="outline" size="sm">View</Button>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
