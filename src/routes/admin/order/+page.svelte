<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Table from '$lib/components/ui/table';

	import { formatCurrency } from '$lib/utils.js';
	import { ALargeSmall, CheckCircleIcon, ClipboardIcon, ClockIcon, Truck } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { queryParam, ssp } from 'sveltekit-search-params';

	let { data } = $props();
	console.log('🚀 ~ data:', data.orders);
	let code = queryParam('code', ssp.string(), {
		debounceHistory: 500,
		pushHistory: false
	});
	let searchTerm = $state($code);
</script>

<div class="flex-1 space-y-4 p-8 pt-6">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight">Orders</h2>
		<form
			class="flex items-center space-x-2"
			onsubmit={(e) => {
				e.preventDefault();
				code.set(searchTerm);
			}}
		>
			<Input
				bind:value={searchTerm}
				class="w-[150px] lg:w-[250px]"
				placeholder="Search by  order code "
			/>
			<Button type="submit">Search</Button>
		</form>
	</div>
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">Order ID</Table.Head>
				<Table.Head>Status</Table.Head>
				<Table.Head>Customer</Table.Head>
				<Table.Head>Amount + Shipping</Table.Head>
				<Table.Head>Date</Table.Head>
				<Table.Head class="text-right">Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.orders as { status, code, amount, user: { name }, createdAt, id } (id)}
				<Table.Row>
					<Table.Cell class="font-medium  ">
						<div class="flex items-center">
							<span>{code}</span>
							<button
								class="ml-2 inline text-muted-foreground hover:text-primary"
								onclick={() => {
									navigator.clipboard.writeText(code);
									toast.success('Copied to clipboard');
								}}
							>
								<ClipboardIcon class="h-4 w-4" />
							</button>
						</div>
					</Table.Cell>
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
					<Table.Cell>{formatCurrency(amount)}</Table.Cell>
					<Table.Cell>{createdAt.toLocaleString()}</Table.Cell>
					<Table.Cell class="text-right">
						<form
							action="?/updateOrder"
							use:enhance={({ formData }) => {
								formData.append('id', String(id));
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
							method="POST"
						>
							{#if status === 'processing'}
								<Button type="submit" variant="outline" size="sm" class="mr-2"
									>Update to shipped</Button
								>
							{:else if status === 'shipped'}
								<Button type="submit" variant="outline" size="sm" class="mr-2"
									>Update to delivered</Button
								>
							{/if}
						</form>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
