<!-- <script lang="ts">
	import { page } from '$app/stores';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { addressSchema } from '$lib/formSchema';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';

	export const form = superForm(defaults(zod(addressSchema)));

	const { form: formData, enhance, delayed } = form;

	// Dummy data for countries (replace with your actual data source)
	const countries = [
		{ name: 'United States', code: 'US', id: 1 },
		{ name: 'Canada', code: 'CA', id: 2 },
		{ name: 'United Kingdom', code: 'GB', id: 3 }
	];
</script>

<div>
	<p class="mb-10 text-lg font-medium capitalize text-muted-foreground">Shipping information</p>
	<form method="POST" use:enhance>
		<Form.Field {form} name="name">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Full Name <span class="font-bold text-red-500">*</span></Form.Label>

					<Input {...props} bind:value={$formData.name} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="address">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Address <span class="font-bold text-red-500">*</span></Form.Label>
					<Input {...props} autocomplete="shipping address-line1" bind:value={$formData.address} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="apartment">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Apartment, suites, etc</Form.Label>
					<Input
						{...props}
						bind:value={$formData.apartment}
						autocomplete="shipping address-line2"
					/>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<div class="grid grid-cols-4 gap-2">
			<Form.Field {form} name="postalCode" class="col-span-1">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Postal code <span class="font-bold text-red-500">*</span></Form.Label>
						<Input
							{...props}
							autocomplete="shipping postal-code"
							bind:value={$formData.postalCode}
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} class="col-span-3" name="city">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>City <span class="font-bold text-red-500">*</span></Form.Label>
						<Input {...props} bind:value={$formData.city} autocomplete="shipping address-level2" />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>
		<Form.Field {form} name="state">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>State / Province</Form.Label>
					<Input {...props} bind:value={$formData.state} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="country">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Country <span class="font-bold text-red-500">*</span></Form.Label>
					<select
						{...props}
						class="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
						bind:value={$formData.country}
					>
						<option value="" disabled selected>Select a country</option>
						{#each countries as { name, code, id }}
							<option value={code}>{name}</option>
						{/each}
					</select>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="phone">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Phone</Form.Label>
					<Input {...props} bind:value={$formData.phone} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</form>
</div> -->
