<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { formatCurrency } from '$lib/utils';
	import { ShoppingBasket } from 'lucide-svelte';
	import OrderList from '../OrderList.svelte';
	import { cartSheetState } from '$lib/states/modalState.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const totalPrice = $derived(
		$page.data.user?.cart?.cartItems.reduce(
			(total, item) => total + item.quantity * item.product.price,
			0
		)
	);
</script>

<Sheet.Root bind:open={cartSheetState.value}>
	<Sheet.Content class="overflow-y-auto rounded-s-lg p-2 pt-10 sm:max-w-xl sm:p-4" side="right">
		<Sheet.Header>
			<Sheet.Title class="font-display mb-5 text-3xl ">Your Order</Sheet.Title>
		</Sheet.Header>
		<OrderList />
		<p class="my-5 capitalize md:my-0">
			total : <span class="font-semibold">{formatCurrency(totalPrice)}</span>
		</p>
		<Sheet.Footer>
			<Button
				class="h-[50px]"
				onclick={() => {
					cartSheetState.setFalse();
					goto('/checkout');
				}}
				>Proceed To Checkout <ShoppingBasket class="ml-3 " />
			</Button>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
