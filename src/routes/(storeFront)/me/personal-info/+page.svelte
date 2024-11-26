<script lang="ts">
	import { page } from '$app/stores';
	// import * as Alert from '$lib/components/ui/alert';

	let { user } = $derived($page.data);

	function getUserInitial(name: string) {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('');
	}
</script>

<div class="space-y-16">
	<!-- {#if true}
		<Alert.Root variant="destructive" class="bg-red-600 text-white">
			<Alert.Title>Profile is incomplete</Alert.Title>
			<Alert.Description>
				Kindly complete your profile update
				<a href="/me/settings" class="border-b border-b-white text-lg font-semibold md:text-lg">
					Here
				</a>
			</Alert.Description>
		</Alert.Root>
	{/if} -->
	<section class="flex gap-10">
		<div class="flex flex-col items-center gap-3">
			<div
				class="h-[3.75rem] w-[3.75rem] rounded-full bg-white p-1 shadow-lg md:h-[6.25rem] md:w-[6.25rem]"
			>
				<div
					class="relative flex h-full w-full items-center justify-center rounded-full bg-[#FAE9C7]"
				>
					<p class="text-2xl font-medium capitalize text-[#b6b5b1] lg:text-4xl">
						{getUserInitial('lawal adebola')}
					</p>
				</div>
			</div>
		</div>
		<div class="flex flex-col gap-3">
			<h1 class="font-display text-lg font-semibold capitalize md:text-2xl">
				{$page.data.user.name}
			</h1>
			<div class="flex flex-col">
				<h2 class="text-sm font-semibold md:text-base">Email</h2>
				<p class="text-sm font-normal md:text-base">{$page.data.user.email}</p>
			</div>
		</div>
	</section>
</div>
