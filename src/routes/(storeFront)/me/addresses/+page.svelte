<script lang="ts">
	import { page } from '$app/stores';
	import AddAddressModal from '$lib/components/modals/AddAddressModal.svelte';
	import EditAddressModal from '$lib/components/modals/EditAddressModal.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Pen, Trash } from 'lucide-svelte';
	import { goto, invalidateAll, preloadData, pushState } from '$app/navigation';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import type { ActionData } from './$types';

	let addresses = $derived($page.data.user.addresses);
	let deleteModalState = $state(false);
	let addressId = $state(0);
</script>

<!-- {#if $page.state.form}
	<EditAddressModal />
{/if} -->

{#if addresses.length === 0}
	<div class="flex h-[50vh] flex-col items-center justify-center text-center">
		<h1 class="font-display text-3xl font-semibold">You haven't saved any addresses yet</h1>
		<p class="mb-5 text-sm text-muted-foreground">Add a new address easily below</p>
		<AddAddressModal />
	</div>
{:else}
	<div>
		<div class="mb-2 ml-auto w-fit px-3">
			<AddAddressModal />
		</div>

		<div class="mb-3 grid gap-5 lg:grid-cols-2">
			{#each addresses as address (address.id)}
				<Card.Root>
					<Card.Header class="border-none">
						<Card.Title class="capitalize ">{address.label}</Card.Title>
					</Card.Header>
					<Card.Content class="flex justify-between text-sm capitalize text-muted-foreground ">
						<div>
							<p>{address.address}</p>
							<p>{address.state}</p>
							<p>{address.country}</p>
						</div>
						<div class="mt-auto w-[150px] space-y-2">
							{#if address.isDefaultShipping}
								<Badge variant="secondary" class="uppercase">Shipping Address</Badge>
							{/if}
							{#if address.isDefaultBilling}
								<Badge variant="secondary" class=" uppercase">Billing Address</Badge>
							{/if}
						</div>
					</Card.Content>
					<Card.Footer class=" -pb-2 gap-5 pt-1 text-sm">
						
						<Button
							onclick={() => {
								addressId = address.id;
								console.log('🚀 ~ addressId:', addressId);
								deleteModalState = true;
							}}
							variant="destructive"
							class="gap-2 bg-destructive/20 text-destructive hover:bg-destructive/30 "
						>
							<Trash class="size-3" />
							<p>Remove</p>
						</Button>
					</Card.Footer>
				</Card.Root>
			{/each}
		</div>
	</div>
{/if}
<AlertDialog.Root bind:open={deleteModalState}>
	<AlertDialog.Content class="w-full  p-5">
		<form
			action="?/deleteAddress"
			use:enhance={() => {
				return async ({ update, result }) => {
					await update();
					if (result.type === 'success') {
						const data = result.data as ActionData;
						toast.success(data?.message || '');
						deleteModalState = false;
					}
				};
			}}
			method="post"
		>
			<input type="number" name="id" value={addressId} hidden />
			<AlertDialog.Header class="mt-10">
				<AlertDialog.Title class="font-display text-lg sm:text-xl md:text-3xl  "
					>Are you absolutely sure?</AlertDialog.Title
				>
				<AlertDialog.Description>
					This action cannot be undone. This will permanently delete this address and remove it data
					from our servers.
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer class="mt-5">
				<AlertDialog.Cancel type="button" class="w-full">Cancel</AlertDialog.Cancel>
				<AlertDialog.Action type="submit" class=" w-full bg-destructive hover:bg-destructive/90">
					Delete addresses</AlertDialog.Action
				>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
