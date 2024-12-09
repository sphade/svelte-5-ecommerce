<script lang="ts">
	import { Toaster } from 'svelte-sonner';
	import '../app.css';
	import NProgress from 'nprogress';

	import { afterNavigate, beforeNavigate } from '$app/navigation';

	let { children } = $props();

	beforeNavigate(() => {
		NProgress.start();
	});
	afterNavigate(() => {
		NProgress.done();
	});
	NProgress.configure({
		showSpinner: false
	});
</script>

<Toaster closeButton richColors />

{@render children()}
