<script lang="ts">
	import { ArrowUpIcon, CheckCircleIcon, ClockIcon, ShoppingCartIcon, Truck } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import { formatCurrency } from '$lib/utils';

	let { data } = $props();
</script>

<div class="flex-1 space-y-4 p-8 pt-6">
	<h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
	<div class="grid gap-4 md:grid-cols-2">
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Total Revenue</Card.Title>
				<ShoppingCartIcon class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">{formatCurrency(data.totalRevenue)}</div>
				<p class="text-xs text-muted-foreground">+{data.revenueGrowth}% from last month</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">New Customers</Card.Title>
				<ArrowUpIcon class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">+{data.newCustomers}</div>
				<p class="text-xs text-muted-foreground">+{data.userGrowth}% from last month</p>
			</Card.Content>
		</Card.Root>
	</div>
	<Card.Root class="col-span-5">
		<Card.Header>
			<Card.Title>Recent Orders</Card.Title>
		</Card.Header>
		<Card.Content>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head class="w-[100px]">Order</Table.Head>
						<Table.Head>Status</Table.Head>
						<Table.Head>Customer</Table.Head>
						<Table.Head class="text-right">AMT + SHP</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each data.order as { addressId, amount, orderProducts, code, user: { name }, status }}
						<Table.Row>
							<Table.Cell class="font-medium">{code}</Table.Cell>
							<Table.Cell>
								<div class="flex items-center">
									{#if status === 'delivered'}
										<CheckCircleIcon class="mr-2 h-4 w-4 text-green-500" />
									{:else if status === 'processing'}
										<ClockIcon class="mr-2 h-4 w-4 text-yellow-500" />
									{:else if status === 'shipped'}
										<Truck class="mr-2 h-4 w-4 text-red-500" />
									{/if}
									<span>{status}</span>
								</div>
							</Table.Cell>
							<Table.Cell>{name}</Table.Cell>
							<Table.Cell class="text-right">{formatCurrency(amount)}</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</Card.Content>
	</Card.Root>
</div>
