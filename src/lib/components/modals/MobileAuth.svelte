<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import {
		loginModalState,
		mobileAuthState,
		registerModalState
	} from '$lib/states/modalState.svelte';

	import Button from '../ui/button/button.svelte';
</script>

<Dialog.Root bind:open={mobileAuthState.value}>
	<Dialog.Content class="w-full p-5">
		<Dialog.Header class="mt-10"></Dialog.Header>
		<Button
			onclick={() => {
				mobileAuthState.setFalse();
				loginModalState.setTrue();
			}}
			variant="secondary">Login</Button
		>
		<Button
			onclick={() => {
				mobileAuthState.setFalse();
				registerModalState.setTrue();
			}}>Register</Button
		>
	</Dialog.Content>
</Dialog.Root>
