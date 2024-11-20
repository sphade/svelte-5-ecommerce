<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { registerSchema } from '$lib/formSchema';
	import * as Form from '$lib/components/ui/form';
	import { Loader2 } from 'lucide-svelte';
	import Input from '../ui/input/input.svelte';
	import { zod } from 'sveltekit-superforms/adapters';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import { registerModalState } from '$lib/states/modalState.svelte';
	const form = superForm(defaults(zod(registerSchema)));

	const { form: formData, enhance, delayed } = form;
</script>

<Dialog.Root bind:open={registerModalState.value}>
	<Dialog.Content class="w-full  p-5">
		<Dialog.Header class="mt-10">
			<Dialog.Title class="font-display text-3xl ">Create an account</Dialog.Title>
			<Dialog.Description>
				Enter your email and password to log in. Click login when you're ready.
			</Dialog.Description>
		</Dialog.Header>

		<form method="POST" use:enhance>
			<div class="flex items-center gap-3">
				<Form.Field {form} name="firstName">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>First name</Form.Label>
							<Input {...props} bind:value={$formData.firstName} />
						{/snippet}
					</Form.Control>
					<Form.Description>This is your public display first name.</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="lastName">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Last name</Form.Label>
							<Input {...props} bind:value={$formData.lastName} />
						{/snippet}
					</Form.Control>
					<Form.Description>This is your public display last name.</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email</Form.Label>
						<Input {...props} bind:value={$formData.email} />
					{/snippet}
				</Form.Control>
				<Form.Description>This is your email address</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="password">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Password</Form.Label>
						<Input {...props} type="password" bind:value={$formData.password} />
					{/snippet}
				</Form.Control>
				<Form.Description>Add your password</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="confirmPassword">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Confirm password</Form.Label>
						<Input {...props} type="password" bind:value={$formData.confirmPassword} />
					{/snippet}
				</Form.Control>
				<Form.Description>confirm your password</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Button disabled={$delayed} class="mt-2 w-full">
				{#if $delayed}
					<Loader2 class="h-6 w-6 animate-spin " />
				{:else}
					Register
				{/if}
			</Form.Button>
		</form>
	</Dialog.Content>
</Dialog.Root>
