<script lang="ts">

import Button from '$lib/components/ui/button/button.svelte';
</script>

<div class="h-[50vh] flex items-center gap-5 flex-col text-center justify-center">
	<h1 class="text-3xl font-display font-semibold">Redeem code</h1>
	<p class="text-sm text-muted-foreground">If you have a Wolt code, enter it below to get your gift!</p>
	<div
		class="flex items-center max-w-md w-full text-foreground px-3 focus-within:ring-2 focus-within:ring-primary border-input border-2 bg-white rounded-md"
	>
		<input type="text" placeholder="Enter Promo Code" class="h-14 outline-none flex-1" />
		<Button>Submit</Button>
	</div>
</div>
