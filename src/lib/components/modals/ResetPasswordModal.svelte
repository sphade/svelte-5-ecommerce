<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import Input from '../ui/input/input.svelte';
	import * as Form from '$lib/components/ui/form';
	import { requestPasswordResetSchema } from '$lib/formSchema';
	import { Loader2 } from 'lucide-svelte';
	import { defaults, superForm } from 'sveltekit-superforms/client';
	import { toast } from 'svelte-sonner';
	import { zod } from 'sveltekit-superforms/adapters';
	import { requestPasswordResetModalState } from '$lib/states/modalState.svelte';
	const form = superForm(defaults(zod(requestPasswordResetSchema)), {});

	const { form: formData, enhance, delayed } = form;
</script>

<Dialog.Root bind:open={requestPasswordResetModalState.value}>
	<Dialog.Content class="w-full p-3 sm:p-5">
		<Dialog.Header class="mt-10">
			<Dialog.Title class="font-display text-3xl ">Request to reset your password</Dialog.Title>
		</Dialog.Header>
		<form method="post" use:enhance>
			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email</Form.Label>
						<Input {...props} bind:value={$formData.email} />
					{/snippet}
				</Form.Control>
				<Form.Description>place in your email</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Button class="mt-2 w-full shadow-md"
				>{#if $delayed}
					<Loader2 class="size-6 animate-spin " />
				{:else}
					Request password reset
				{/if}</Form.Button
			>
		</form>
	</Dialog.Content>
</Dialog.Root>
