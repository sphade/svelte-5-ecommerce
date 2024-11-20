<script lang="ts">
	import { Search } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import { goto } from '$app/navigation';

	let value = $state('');
</script>

<form
	onsubmit={(e) => {
		e.preventDefault();
		goto(`/search?term=${value}`);
	}}
	class="  absolute bottom-3 left-5 flex w-full max-w-xs items-center rounded-md bg-white px-1 text-foreground focus-within:ring focus-within:ring-primary sm:max-w-md md:left-10 md:gap-2 md:px-3"
>
	<Search />
	<input class="h-12 flex-1 outline-none md:h-16" bind:value />
	<Button type="submit">Search</Button>
</form>
