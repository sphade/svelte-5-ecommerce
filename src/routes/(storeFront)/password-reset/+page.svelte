<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import Input from '$lib/components/ui/input/input.svelte';
	import { resetPasswordSchema } from '$lib/formSchema';
	import { Loader2 } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	const token = $page.url.searchParams.get('token') || '';
	const form = superForm(defaults(zod(resetPasswordSchema)));

	const { form: formData, enhance, delayed } = form;
</script>

<div class="mt-5 grid h-[70vh] w-full place-items-center">
	<Card.Root class="w-full max-w-lg">
		<Card.Header>
			<Card.Title>Reset Your Password</Card.Title>
		</Card.Header>
		<Card.Content>
			<form method="POST" use:enhance>
				<Form.Field {form} name="password">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Password</Form.Label>
							<Input {...props} type="password" bind:value={$formData.password} />
						{/snippet}
					</Form.Control>
					<Form.Description>Enter your new password here</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="confirmPassword">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Confirm Password</Form.Label>
							<Input {...props} type="password" bind:value={$formData.confirmPassword} />
						{/snippet}
					</Form.Control>
					<Form.Description>Enter your new password again</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Button>
					{#if $delayed}
						<Loader2 class="size-4 animate-spin" />
					{:else}
						Submit
					{/if}
				</Form.Button>
			</form>
		</Card.Content>
	</Card.Root>
</div>
