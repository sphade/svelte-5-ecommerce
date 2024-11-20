<script lang="ts">
	import { Verified } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
</script>

<main class="h-[500px] grid place-items-center px-3">
	<div class="bg-primary/20 rounded-md space-y-3 text-center mx-auto max-w-[350px] p-5">
		<Verified class="mx-auto text-primary " />

		<h1 class="text-2xl font-display capitalize font-bold text-primary">confirmed successfully</h1>
		<p>Your email has been updated successfully</p>

		<Button href="/me/personal-info" class="shadow-md">Go to your account page</Button>
		<Button href="/explore/stores" variant="secondary" class="shadow-md"
			>Explore restaurants and stores</Button
		>
	</div>
</main>
