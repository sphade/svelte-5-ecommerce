<script lang="ts">
	import { Verified } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
</script>

<main class="grid h-[500px] place-items-center px-3">
	<div class="mx-auto max-w-[350px] space-y-3 rounded-md bg-primary/20 p-5 text-center">
		<Verified class="mx-auto text-primary " />

		<h1 class="font-display text-2xl font-bold capitalize text-primary">confirm successfully</h1>
		<p>Your email has been confirmed successfully, you can now login to your account</p>

		<Button class="shadow-md">Login</Button>
	</div>
</main>
