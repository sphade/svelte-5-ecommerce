<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import { XCircle } from 'lucide-svelte';
</script>

<main class="h-[500px] grid place-items-center px-3">
	<div class="bg-destructive/20 rounded-md space-y-3 text-center mx-auto max-w-[350px] p-5">
		<XCircle class="mx-auto text-destructive " />

		<h1 class="text-2xl [word-spacing:3px] font-display capitalize font-bold text-destructive">
			something went wrong
		</h1>
		<Button href="/" class="shadow-md">Go to home page</Button>

		<p>{$page.error?.message}</p>
	</div>
</main>
