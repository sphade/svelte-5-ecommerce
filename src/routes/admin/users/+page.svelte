<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Table from '$lib/components/ui/table';
	import { ChevronDown } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { authClient } from '$lib/client';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';
	let { data } = $props();
	console.log('🚀 ~ data:', data);
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
				<Table.Head>Name</Table.Head>
				<Table.Head>Email</Table.Head>
				<Table.Head>Role</Table.Head>
				<Table.Head>Status</Table.Head>
				<Table.Head>Join Date</Table.Head>
				<Table.Head>Total Spent</Table.Head>
				<!-- <Table.Head>Order Count</Table.Head> -->
				<Table.Head class="text-right">Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.users as user}
				<Table.Row>
					<Table.Cell>{user.name}</Table.Cell>
					<Table.Cell>{user.email}</Table.Cell>
					<Table.Cell>{user.role}</Table.Cell>
					<Table.Cell>{!user.banned ? 'active' : 'banned'}</Table.Cell>
					<Table.Cell>{user.createdAt}</Table.Cell>
					<Table.Cell>${100}</Table.Cell>
					<!-- <Table.Cell>{user.orderCount}</Table.Cell> -->
					<Table.Cell class="text-right">
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								<Button variant="outline" size="icon">
									<ChevronDown />
								</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								{#if user.banned}
									<DropdownMenu.Item
										onclick={async () => {
											const res = await authClient.admin.unbanUser({
												userId: user.id
											});
											if (res.error) {
												toast.error(res.error.message || '');
												return;
											}
											toast.success('user has been unbanned');
											invalidateAll();
										}}>Unban user</DropdownMenu.Item
									>
								{:else}
									<DropdownMenu.Item
										onclick={async () => {
											const res = await authClient.admin.banUser({
												userId: user.id
											});
											if (res.error) {
												toast.error(res.error.message || '');
												return;
											}
											toast.success('user has been banned');
											invalidateAll();
										}}>ban user</DropdownMenu.Item
									>
								{/if}
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
