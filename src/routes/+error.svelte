<script lang="ts">
	import { page } from '$app/stores';
</script>

<main class="mx-auto flex w-full max-w-6xl flex-grow flex-col px-4 sm:px-6 lg:px-8">
	<div class="my-auto flex-shrink-0 py-16 sm:py-32">
		<p class="text-primary-600 text-sm font-semibold uppercase tracking-wide">
			{$page.status} error
		</p>
		<h1 class="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
			{$page.error?.message || 'Something went wrong'}
		</h1>
		<p class="mt-2 text-base text-gray-500">
			Sorry, {$page.status === 404
				? 'we couldn’t find the page you’re looking for'
				: 'the page you were looking for encountered an error'}.
		</p>
		<div class="mt-6">
			<a href="/" class="text-primary-600 hover:text-primary-500 text-base font-medium">
				Go back home<span aria-hidden="true"> &rarr;</span>
			</a>
		</div>
	</div>
</main>
