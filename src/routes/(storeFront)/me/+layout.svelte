<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	let { children } = $props();
	const tabs = [
		{
			link: 'personal-info',
			txt: 'Personal info'
		},

		{
			link: 'addresses',
			txt: 'Addresses'
		},
		{
			link: 'order-history',
			txt: 'Order history'
		},

		{
			link: 'settings',
			txt: 'Settings'
		}
	];
	let path = $derived($page.url.pathname.split('/').slice(2, 3).toString());
</script>

<div class="mx-auto mt-10 w-full max-w-4xl px-3">
	<div class="flex items-center justify-between">
		<h1 class="font-display text-4xl font-bold capitalize">Profile</h1>
	</div>
	<div class="my-5 flex w-full flex-col gap-2 border-b-2 sm:flex-row md:gap-10">
		{#each tabs as { link, txt }}
			<a
				class={cn(
					'border-b-2  py-3 text-sm  font-normal  text-[#202125a3] sm:w-fit sm:border-b-0 md:text-base',
					{
						'border-b-2 border-b-black font-bold  text-black sm:border-b-2 ': path === link
					}
				)}
				href="/me/{link}"
			>
				{txt}
			</a>
		{/each}
	</div>
</div>

<div class="mx-auto my-10 w-full max-w-4xl px-3 md:px-0">
	{@render children()}
</div>
