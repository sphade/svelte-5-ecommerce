<script lang="ts">
	import { ArrowUpIcon, ShoppingCartIcon } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
</script>

<div class="flex-1 space-y-4 p-8 pt-6">
	<h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Total Revenue</Card.Title>
				<ShoppingCartIcon class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">$45,231.89</div>
				<p class="text-xs text-muted-foreground">+20.1% from last month</p>
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Active Now</Card.Title>
				<ArrowUpIcon class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">+573</div>
				<p class="text-xs text-muted-foreground">+201 since last hour</p>
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">New Customers</Card.Title>
				<ArrowUpIcon class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">+2350</div>
				<p class="text-xs text-muted-foreground">+180.1% from last month</p>
			</Card.Content>
		</Card.Root>
	</div>
	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
		<Card.Root class="col-span-4">
			<Card.Header>
				<Card.Title>Overview</Card.Title>
			</Card.Header>
			<Card.Content class="pl-2"></Card.Content>
		</Card.Root>
		<Card.Root class="col-span-3">
			<Card.Header>
				<Card.Title>Recent Orders</Card.Title>
				<Card.Description>You made 265 sales this month.</Card.Description>
			</Card.Header>
			<Card.Content>
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head class="w-[100px]">Order</Table.Head>
							<Table.Head>Status</Table.Head>
							<Table.Head>Customer</Table.Head>
							<Table.Head class="text-right">Amount</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						<Table.Row>
							<Table.Cell class="font-medium">#3210</Table.Cell>
							<Table.Cell>
								<div class="flex items-center">
									<ArrowUpIcon class="mr-2 h-4 w-4 text-muted-foreground" />
									<span>Shipped</span>
								</div>
							</Table.Cell>
							<Table.Cell>Olivia Martin</Table.Cell>
							<Table.Cell class="text-right">$79.00</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell class="font-medium">#3209</Table.Cell>
							<Table.Cell>
								<div class="flex items-center">
									<ArrowUpIcon class="mr-2 h-4 w-4 text-muted-foreground" />
									<span>Processing</span>
								</div>
							</Table.Cell>
							<Table.Cell>Ava Johnson</Table.Cell>
							<Table.Cell class="text-right">$149.00</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell class="font-medium">#3208</Table.Cell>
							<Table.Cell>
								<div class="flex items-center">
									<ArrowUpIcon class="mr-2 h-4 w-4 text-muted-foreground" />
									<span>Cancelled</span>
								</div>
							</Table.Cell>
							<Table.Cell>Michael Johnson</Table.Cell>
							<Table.Cell class="text-right">$39.00</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table.Root>
			</Card.Content>
		</Card.Root>
	</div>
</div>
