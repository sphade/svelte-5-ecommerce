<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { confirmEmailModalState } from '$lib/states/modalState.svelte';

	import Button from '../ui/button/button.svelte';
</script>

<Dialog.Root bind:open={confirmEmailModalState.value}>
	<Dialog.Content class="w-full p-5 ">
		<Dialog.Header class="mt-10">
			<Dialog.Title class="font-display text-3xl ">Confirm Email</Dialog.Title>
			<Dialog.Description>
				We’ve sent a link to your email address The link expires shortly, so please enter it soon.
			</Dialog.Description>
		</Dialog.Header>
		<div class="flex items-center justify-center gap-5 py-10">
			<Button variant="secondary" href="https://mail.google.com/mail/u/0/" class="gap-1">
				<img src="/gmail.png" alt="" />
				open Gmail</Button
			>
			<Button href="https://outlook.live.com/mail/0/inbox" variant="secondary" class="gap-1">
				<img src="/outlook.png" alt="" />
				open Outlook</Button
			>
		</div>

		<p class="text-center text-sm text-muted-foreground">
			Can’t find your link? Check your spam folder!
		</p>
	</Dialog.Content>
</Dialog.Root>
