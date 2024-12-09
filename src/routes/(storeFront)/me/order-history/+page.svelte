<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import Button from '$lib/components/ui/button/button.svelte';
	import { ChevronsUpDown, Star } from 'lucide-svelte';
	import { cn, formatCurrency } from '$lib/utils';

	let { data } = $props();
	// Dummy data

	let orders = $derived(data.user?.orders ?? []);
</script>

{#if orders?.length > 0}
	{#each orders ?? [] as { createdAt, amount, code, status, orderProducts }}
		<Collapsible.Root class=" mb-2">
			<div class="flex items-center justify-between rounded-md bg-muted p-5">
				<div class="flex flex-wrap items-center justify-between gap-3 md:gap-10">
					<div class="">
						<p class="text-sm font-medium capitalize">Date placed</p>
						<p class="text-xs text-muted-foreground">
							{new Intl.DateTimeFormat('en-US', {
								year: 'numeric',
								month: 'short',
								day: '2-digit'
							}).format(createdAt)}
						</p>
					</div>
					<div>
						<p class="text-sm font-medium capitalize">Total sum</p>
						<p class="text-xs text-muted-foreground">
							{formatCurrency(amount)}
						</p>
					</div>
					<div>
						<p class="text-sm font-medium capitalize">Order number</p>
						<p class="text-xs text-muted-foreground">{code}</p>
					</div>
					<div class="">
						<p class="text-sm font-medium capitalize">Status</p>
						<span
							class={cn(
								'inline-flex items-center justify-center rounded-full border px-2 py-1 text-xs font-medium',
								{
									'border-yellow-200 bg-yellow-100 text-yellow-800': status === 'processing',
									'border-green-200 bg-green-100 text-green-800': ['shipped', 'delivered'].includes(
										status
									)
								}
							)}
						>
							{status}
						</span>
					</div>
				</div>
				<Collapsible.Trigger>
					<Button variant="ghost" size="sm" class="w-9 p-0">
						<ChevronsUpDown class="h-4 w-4" />
						<span class="sr-only">Toggle</span>
					</Button>
				</Collapsible.Trigger>
			</div>
			<Collapsible.Content class="m-0 space-y-2 p-0">
				<Table.Root class="rounded-md border">
					<Table.Header>
						<Table.Row class="text-sm">
							<Table.Head class="w-[100px]"></Table.Head>
							<Table.Head>Name</Table.Head>
							<Table.Head>sku</Table.Head>
							<Table.Head>Unit Price</Table.Head>
							<Table.Head>Quantity</Table.Head>
							<Table.Head class="text-right">Total</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body class="text-xs">
						{#each orderProducts as { product: { images, name, sku, price }, quantity }}
							<Table.Row>
								<Table.Cell class="font-medium">
									<img src={images[0].fileUrl} class="size-16 rounded-lg" alt="" />
								</Table.Cell>
								<Table.Cell class="capitalize">{name}</Table.Cell>
								<Table.Cell class="capitalize">{sku}</Table.Cell>
								<Table.Cell>{formatCurrency(price)}</Table.Cell>
								<Table.Cell>{quantity}</Table.Cell>
								<Table.Cell class="text-right">{formatCurrency(price * quantity)}</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</Collapsible.Content>
		</Collapsible.Root>
	{/each}
{:else}
	<div class="flex h-[50vh] w-full flex-col items-center justify-center text-center">
		<h1 class="font-display text-3xl font-semibold">You haven't made any orders yet</h1>
		<p class="text-muted-foreground">You'll find all the details of your orders here</p>
	</div>
{/if}
