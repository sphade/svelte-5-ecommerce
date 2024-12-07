<script lang="ts">
	import { Search } from 'lucide-svelte';
	import { queryParam, ssp } from 'sveltekit-search-params';
	let term = queryParam('term', ssp.string(), {
		debounceHistory: 500,
		pushHistory: false
	});
</script>

<form
	class="flex w-full items-center justify-between rounded-3xl bg-muted px-3.5 focus-within:ring-2 focus-within:ring-primary"
>
	<input
		type="text"
		placeholder="search.."
		class="h-11 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
		name=""
		id=""
		bind:value={$term}
	/>
	<Search class="text-muted-foreground" />
</form>
