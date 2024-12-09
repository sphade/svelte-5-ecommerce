<script lang="ts">
	import { page } from '$app/stores';

	// import { BellIcon, Package2Icon } from '@radix-ui/react-icons'
	import {
		BellIcon,
		Blocks,
		Box,
		Boxes,
		Group,
		Home,
		Layers,
		Layers2,
		Package2Icon,
		Truck,
		User
	} from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import Calendar from 'lucide-svelte/icons/calendar';
	import House from 'lucide-svelte/icons/house';
	import Inbox from 'lucide-svelte/icons/inbox';
	import Search from 'lucide-svelte/icons/search';
	import Settings from 'lucide-svelte/icons/settings';
	import { LayoutDashboard } from 'lucide-svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	// Menu items.
	const items = [
		{
			title: 'Overview',
			url: 'overview',
			icon: LayoutDashboard
		},
		{
			title: 'Products',
			url: 'products',
			icon: Box
		},
		{
			title: 'users',
			url: 'users',
			icon: User
		},
		{
			title: 'Orders',
			url: 'order',
			icon: Truck
		},
		{
			title: 'Categories',
			url: 'categories',
			icon: Blocks
		},
		{
			title: 'Store front',
			url: '../',
			icon: Home
		}
	];

	let { children } = $props();
</script>

<Sidebar.Provider>
	<Sidebar.Root>
		<Sidebar.Content>
			<Sidebar.Group>
				<Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each items as item (item.title)}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton>
									{#snippet child({ props })}
										<a href={'/admin/' + item.url} {...props}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									{/snippet}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		</Sidebar.Content>
	</Sidebar.Root>
	<main class=" flex-1">
		<Sidebar.Trigger />
		{@render children?.()}
	</main>
</Sidebar.Provider>
