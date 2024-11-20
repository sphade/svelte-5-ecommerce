<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Button } from '$lib/components/ui/button';
</script>

<div class="flex-1 space-y-4 p-8 pt-6">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight">Content Management</h2>
		<Button>Create New Content</Button>
	</div>
	<Tabs.Root class="space-y-4">
		<Tabs.List>
			<Tabs.Trigger value="pages">Pages</Tabs.Trigger>
			<Tabs.Trigger value="blog">Blog Posts</Tabs.Trigger>
			<Tabs.Trigger value="reviews">Product Reviews</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="pages" class="space-y-4">
			<Card.Root>
				<Card.Header>
					<Card.Title>Store Pages</Card.Title>
					<Card.Description>Manage your store's static pages.</Card.Description>
				</Card.Header>
				<Card.Content>
					<p>List of store pages will be displayed here.</p>
				</Card.Content>
			</Card.Root>
		</Tabs.Content>
		<Tabs.Content value="blog" class="space-y-4">
			<Card.Root>
				<Card.Header>
					<Card.Title>Blog Posts</Card.Title>
					<Card.Description>Manage your store's blog content.</Card.Description>
				</Card.Header>
				<Card.Content>
					<p>Blog post management interface will be displayed here.</p>
				</Card.Content>
			</Card.Root>
		</Tabs.Content>
		<Tabs.Content value="reviews" class="space-y-4">
			<Card.Root>
				<Card.Header>
					<Card.Title>Product Reviews</Card.Title>
					<Card.Description>Moderate and manage customer reviews.</Card.Description>
				</Card.Header>
				<Card.Content>
					<p>Product review moderation interface will be displayed here.</p>
				</Card.Content>
			</Card.Root>
		</Tabs.Content>
	</Tabs.Root>
</div>
