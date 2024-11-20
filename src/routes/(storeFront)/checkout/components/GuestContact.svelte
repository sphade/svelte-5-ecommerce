<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { guestInformationSchema } from '$lib/formSchema';

	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';

	export const form = superForm(defaults(zod(guestInformationSchema)));
	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<p class="mb-10 text-lg font-medium capitalize text-muted-foreground">Contact information</p>
	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Email <span class="font-bold text-red-500">*</span></Form.Label>

				<Input {...props} bind:value={$formData.email} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<div class="flex items-center justify-between gap-5">
		<Form.Field {form} name="firstName" class="w-full">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>First name <span class="font-bold text-red-500">*</span></Form.Label>

					<Input {...props} bind:value={$formData.firstName} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="lastName" class="w-full">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Last name <span class="font-bold text-red-500">*</span></Form.Label>

					<Input {...props} bind:value={$formData.lastName} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>
</form>
