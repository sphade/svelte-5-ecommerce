<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Table from '$lib/components/ui/table';

	const users = [
		{
			id: 1,
			name: 'John Smith',
			email: 'john.smith@email.com',
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
			email: 'sarah.j@email.com',
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
			email: 'mike.w@email.com',
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
			email: 'emma.d@email.com',
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
			email: 'james.b@email.com',
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
		<h2 class="text-3xl font-bold tracking-tight">Users</h2>
		<div class="flex items-center space-x-2">
			<Input class="w-[150px] lg:w-[250px]" placeholder="Search users..." />
			<Button href="users/add">Add User</Button>
		</div>
	</div>
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">ID</Table.Head>
				<Table.Head>Name</Table.Head>
				<Table.Head>Email</Table.Head>
				<Table.Head>Role</Table.Head>
				<Table.Head>Status</Table.Head>
				<Table.Head>Join Date</Table.Head>
				<Table.Head>Last Login</Table.Head>
				<Table.Head>Total Spent</Table.Head>
				<Table.Head>Order Count</Table.Head>
				<Table.Head class="text-right">Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each users as user}
				<Table.Row>
					<Table.Cell class="font-medium">{user.id}</Table.Cell>
					<Table.Cell>{user.name}</Table.Cell>
					<Table.Cell>{user.email}</Table.Cell>
					<Table.Cell>{user.role}</Table.Cell>
					<Table.Cell>{user.status}</Table.Cell>
					<Table.Cell>{user.joinDate}</Table.Cell>
					<Table.Cell>{user.lastLogin}</Table.Cell>
					<Table.Cell>${user.totalSpent.toFixed(2)}</Table.Cell>
					<Table.Cell>{user.orderCount}</Table.Cell>
					<Table.Cell class="text-right"></Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
