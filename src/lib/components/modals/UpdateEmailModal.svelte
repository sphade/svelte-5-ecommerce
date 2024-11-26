<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { buttonVariants } from '../ui/button';
	import { authClient } from '$lib/client';
	import Input from '../ui/input/input.svelte';
	import * as Form from '$lib/components/ui/form';
	import { updateEmailSchema } from '$lib/formSchema';
	import { Loader2 } from 'lucide-svelte';
	import { defaults, superForm } from 'sveltekit-superforms/client';
	import { toast } from 'svelte-sonner';
	import { zod } from 'sveltekit-superforms/adapters';
	let modalState = $state(false);
	const form = superForm(defaults(zod(updateEmailSchema)), {
		SPA: true,
		validators: zod(updateEmailSchema),
		onUpdate: async ({ form }) => {
			if (form.valid) {
				const { email } = form.data;
				const { error } = await authClient.changeEmail(
					{
						newEmail: email
					},
					{
						onSuccess(ctx) {
							toast.success('Email updated successfully');
							modalState = false;
						}
					}
				);
				if (error) {
					if (error.message) {
						toast.error(error.message);
					} else {
						toast.error(error.statusText);
					}
				}
			}
		}
	});

	const { form: formData, enhance, delayed } = form;
</script>

<Dialog.Root bind:open={modalState}>
	<Dialog.Trigger class={buttonVariants({ variant: 'link' })}>Change Email</Dialog.Trigger>
	<Dialog.Content class="w-full p-3 sm:p-5">
		<Dialog.Header class="mt-10">
			<Dialog.Title class="font-display text-3xl ">Change Email</Dialog.Title>
		</Dialog.Header>
		<form method="post" use:enhance>
			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email</Form.Label>
						<Input {...props} bind:value={$formData.email} />
					{/snippet}
				</Form.Control>
				<Form.Description>This is your new email.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Button class="mt-2 w-full shadow-md"
				>{#if $delayed}
					<Loader2 class="size-6 animate-spin " />
				{:else}
					Update Email
				{/if}</Form.Button
			>
		</form>
	</Dialog.Content>
</Dialog.Root>
