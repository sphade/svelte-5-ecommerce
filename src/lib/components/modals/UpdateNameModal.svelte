<script lang="ts">
	import Button from '../ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { buttonVariants } from '../ui/button';
	import Input from '../ui/input/input.svelte';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { updateNameSchema } from '$lib/formSchema';
	import { Loader2 } from 'lucide-svelte';
	import * as Form from '$lib/components/ui/form';
	import { toast } from 'svelte-sonner';
	import { page } from '$app/stores';
	let { user } = $derived($page.data);

	let modalState = $state(false);
	const form = superForm(defaults(zod(updateNameSchema)));

	const { form: formData, enhance, delayed } = form;
</script>

<Dialog.Root bind:open={modalState}>
	<Dialog.Trigger class={buttonVariants({ variant: 'link' })}>lawal adebola</Dialog.Trigger>
	<Dialog.Content class="w-full p-3 sm:p-5">
		<Dialog.Header class="mt-10">
			<Dialog.Title class="font-display text-lg sm:text-xl md:text-3xl  ">Name</Dialog.Title>
		</Dialog.Header>

		<form class="mt-5 flex flex-col gap-5" use:enhance>
			<div class="grid grid-cols-2 items-center gap-3">
				<Form.Field {form} name="firstName">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>First name</Form.Label>

							<Input {...props} bind:value={$formData.firstName} />
						{/snippet}
					</Form.Control>

					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="lastName">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Last name</Form.Label>
							<Input {...props} bind:value={$formData.lastName} />
						{/snippet}
					</Form.Control>

					<Form.FieldErrors />
				</Form.Field>
			</div>
			<div class="flex flex-col items-center justify-between gap-2 sm:flex-row sm:gap-3">
				<Button type="submit" class="h-12 w-full font-medium  ">
					{#if $delayed}
						<Loader2 class="size-6 animate-spin " />
					{:else}
						Save
					{/if}
				</Button>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>
