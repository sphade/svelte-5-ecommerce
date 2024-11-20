<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Bike, ChevronRight, CreditCard, Loader2, Minus, Plus } from 'lucide-svelte';
	import { Label } from '$lib/components/ui/label';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import GuestContact from './components/GuestContact.svelte';
	import GuestShippingInformation from './components/GuestShippingInformation.svelte';
	import { formatCurrency } from '$lib/utils';
	import OrderList from '$lib/components/OrderList.svelte';
	import { toast } from 'svelte-sonner';

	let shippingMethodId = 1;

	const contactForm = {
		fullName: 'John Doe',
		email: 'john.doe@example.com',
		phoneNumber: '123-456-7890'
	};

	const shippingForm = {
		fullName: 'John Doe',
		address1: '123 Main Street',
		address2: 'Apt 4B',
		city: 'New York',
		state: 'NY',
		postalCode: '10001'
	};

	const data = $state({
		user: {
			activeCustomer: {
				defaultAddress: {
					fullName: 'John Doe',
					address1: '123 Main Street',
					address2: 'Apt 4B',
					city: 'New York',
					state: 'NY',
					postalCode: '10001'
				}
			}
		},
		activeOrder: {
			lines: [
				{
					id: 1,
					name: 'Classic Kebab',
					price: 10.99,
					quantity: 1
				},
				{
					id: 2,
					name: 'Chicken Wings',
					price: 7.99,
					quantity: 2
				}
			],
			subTotalWithTax: 26.97,
			currencyCode: 'USD',
			shippingAddress: {
				fullName: 'John Doe',
				address1: '123 Main Street',
				address2: 'Apt 4B',
				city: 'New York',
				state: 'NY',
				postalCode: '10001'
			}
		},
		shippingMethods: [
			{
				id: 1,
				name: 'Standard Shipping',
				price: 5.99
			},
			{
				id: 2,
				name: 'Express Shipping',
				price: 12.99
			}
		]
	});

	const activeOrder = data?.activeOrder;

	const defaultAddress =
		data?.user?.activeCustomer?.defaultAddress || data?.activeOrder?.shippingAddress;
</script>

<main>
	<div
		class="relative flex h-[400px] w-full flex-col border-b-2 bg-[url('/hero/hero-3.jpg')] bg-cover bg-fixed bg-no-repeat"
	>
		<div class="absolute top-[314px] z-50 h-3 w-full bg-white/5 backdrop-blur-sm sm:hidden"></div>
		<div class="absolute left-0 top-0 z-0 h-full w-full bg-black/50"></div>

		<div class=" pt-40 md:pt-44 lg:pt-56">
			<div
				class="  z-10 my-0 flex w-full max-w-md flex-col justify-center gap-7 border border-white/20 bg-white/20 px-4 py-3 text-white shadow-md drop-shadow-md backdrop-blur sm:rounded-r-md md:max-w-3xl md:gap-10 md:px-10"
			>
				<div class="flex flex-col gap-1 drop-shadow-md md:gap-2">
					<h2 class="font-display text-3xl font-bold md:text-6xl">Checkout</h2>
					<h4 class="text-xl font-semibold md:text-2xl">Kebab Royal</h4>
				</div>
			</div>
		</div>
	</div>

	<section
		class="m-auto my-0 flex h-full w-full max-w-6xl flex-col gap-5 px-2 py-5 sm:px-4 md:px-10 md:py-20 lg:flex-row lg:justify-between xl:px-0"
	>
		<div class="flex w-full flex-col gap-10 md:gap-10 lg:gap-20">
			{#if false}
				<div class="flex flex-col gap-4">
					<h4
						class="font-display text-lg font-semibold leading-loose tracking-wide md:text-2xl lg:text-3xl"
					>
						Delivery method
					</h4>
					<ul class="flex flex-col gap-1">
						<a
							href="/me/addresses"
							class="flex h-[auto] w-full cursor-pointer items-center justify-between rounded border-b py-5 transition-[shadow] md:border md:border-[#2021251f] md:px-4 md:hover:shadow lg:max-w-[600px]"
						>
							<div class="flex items-center gap-3">
								<Bike />
								<p class="text-sm font-normal md:text-base">
									{#if defaultAddress}
										This delivery would be made to <span
											class="font-medium capitalize text-muted-foreground"
											>{defaultAddress.fullName}</span
										> , (change it)
									{:else}
										Please add a delivery address or set one as your default
									{/if}
								</p>
							</div>
							<ChevronRight />
						</a>
					</ul>
				</div>
				<RadioGroup.Root value={''} class="gap-5 md:gap-10">
					{#each data.shippingMethods ?? [] as shippingMethod}
						<div class="flex items-center space-x-2">
							<RadioGroup.Item value="" />
							<Label>
								{shippingMethod.name}
								<span class="text-muted-foreground">
									{formatCurrency(Number(shippingMethod.price))}</span
								>
							</Label>
						</div>
					{/each}
					<!-- <RadioGroup.Input name="spacing" /> -->
				</RadioGroup.Root>
			{:else}
				<GuestContact />

				<GuestShippingInformation />
				<RadioGroup.Root class="gap-5 md:gap-10">
					{#each data.shippingMethods ?? [] as shippingMethod}
						<div class="flex items-center space-x-2">
							<RadioGroup.Item value={'shippingMethod.id'} id={'shippingMethod.id'} />
							<Label>
								{shippingMethod.name}
								<span class="text-muted-foreground">
									{formatCurrency(Number(shippingMethod.price))}</span
								>
							</Label>
						</div>
					{/each}
					<!-- <RadioGroup.Input name="spacing" /> -->
				</RadioGroup.Root>
			{/if}

			<div class="flex h-[auto] w-full flex-col gap-4 py-4 lg:max-w-[600px]">
				<h4 class="font-display text-lg font-semibold tracking-wide md:text-2xl lg:text-3xl">
					Selected items
				</h4>

				<OrderList />
				<div>
					<Button variant="secondary" href="/search">Add more items</Button>
				</div>
			</div>
		</div>

		<div class="relative z-10 mb-5 w-full lg:mt-[-7.5rem] lg:max-w-[400px]">
			<div class="left-0 top-[6rem] flex w-full flex-col lg:sticky">
				<div
					class="flex flex-col gap-4 rounded-2xl border border-[#2021251f] bg-card p-3 lg:p-[1.5rem] lg:shadow-lg"
				>
					<div class="flex items-center justify-between">
						<p class="text-lg font-semibold lg:text-2xl">Prices incl. taxes</p>
					</div>
					<ul class="flex flex-col gap-3 border-b pb-5 pt-2">
						<li class="flex items-center justify-between">
							<p class="text-sm font-medium lg:text-base">
								Item subtotal ({activeOrder?.lines?.length || 0} item)
							</p>
							<span
								class="rounded-md bg-primary/20 px-2 py-1 text-sm font-medium text-primary lg:text-base"
							>
								{formatCurrency(activeOrder?.subTotalWithTax, activeOrder?.currencyCode)}
							</span>
						</li>
						<li class="flex items-center justify-between">
							<p class="text-sm font-medium lg:text-base">
								Delivery ({data.shippingMethods.find((m) => m.id === shippingMethodId)?.name})
							</p>
							<span
								class="rounded-md bg-primary/20 px-2 py-1 text-sm font-medium text-primary lg:text-base"
							>
								{formatCurrency(
									Number(data.shippingMethods.find((m) => m.id === shippingMethodId)?.price),
									activeOrder?.currencyCode
								)}
							</span>
						</li>
					</ul>
					<div class="flex items-center justify-between">
						<p class="text-sm font-medium lg:text-base">Total</p>
						<span
							class="rounded-md bg-primary/20 px-2 py-1 text-sm font-medium text-primary lg:text-base"
						>
							{formatCurrency(
								(activeOrder?.subTotalWithTax || 0) +
									(Number(data.shippingMethods.find((m) => m.id === shippingMethodId)?.price) || 0),
								activeOrder?.currencyCode
							)}
						</span>
					</div>
					<Button class="w-full">Proceed To Make Payment</Button>
				</div>
			</div>
		</div>
	</section>
</main>
