<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { buttonVariants } from '../ui/button';
	import Input from '../ui/input/input.svelte';
	import { page } from '$app/stores';
	import * as Form from '$lib/components/ui/form';
	import { updatePasswordSchema } from '$lib/formSchema';
	import { Loader2 } from 'lucide-svelte';
	import { defaults, superForm } from 'sveltekit-superforms/client';
	import { toast } from 'svelte-sonner';
	import { zod } from 'sveltekit-superforms/adapters';
	let modalState = $state(false);
	const form = superForm(defaults(zod(updatePasswordSchema)), {});

	const { form: formData, enhance, delayed } = form;
</script>

<Dialog.Root bind:open={modalState}>
	<Dialog.Trigger class={buttonVariants({ variant: 'link' })}>Change Password</Dialog.Trigger>
	<Dialog.Content class="w-full p-3 sm:p-5">
		<Dialog.Header class="mt-10">
			<Dialog.Title class="font-display text-3xl ">Change Password</Dialog.Title>
		</Dialog.Header>
		<form method="post" use:enhance>
			<Form.Field {form} name="currentPassword">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Current Password</Form.Label>
						<Input type="password" {...props} bind:value={$formData.currentPassword} />
					{/snippet}
				</Form.Control>
				<Form.Description>Your current password</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="newPassword">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>New Password</Form.Label>

						<Input type="password" {...props} bind:value={$formData.newPassword} />
					{/snippet}
				</Form.Control>
				<Form.Description>Your new password</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="confirmNewPassword">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Confirm New Password</Form.Label>

						<Input type="password" {...props} bind:value={$formData.confirmNewPassword} />
					{/snippet}
				</Form.Control>
				<Form.Description>Confirm your new password</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Button class="mt-2 w-full"
				>{#if $delayed}
					<Loader2 class="size-6 animate-spin " />
				{:else}
					Change Password
				{/if}</Form.Button
			>
		</form>
	</Dialog.Content>
</Dialog.Root>
