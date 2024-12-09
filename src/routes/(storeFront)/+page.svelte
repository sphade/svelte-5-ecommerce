<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Carousel from '$lib/components/ui/carousel';
	import Fade from 'embla-carousel-fade';
	import Autoplay from 'embla-carousel-autoplay';
	import SearchBar from '$lib/components/SearchBar.svelte';

	const carouselPics = ['/hero/hero-1.jpg', '/hero/hero-2.jpg', '/hero/hero-3.jpg'];
</script>

<div class="mx-auto mt-2 max-w-7xl px-2 md:mt-5 md:px-5">
	<Carousel.Root
		opts={{ containScroll: false }}
		plugins={[Fade(), Autoplay({ stopOnInteraction: false, stopOnMouseEnter: true })]}
		class="relative w-full max-w-full"
	>
		<Carousel.Content>
			{#each carouselPics as pic}
				<Carousel.Item>
					<div
						class="relative mx-auto h-[350px] overflow-clip rounded-lg bg-cover bg-center bg-no-repeat p-1 text-white md:h-[480px]"
						style:background-image="url({pic})"
					>
						<div class="absolute inset-0 bg-gradient-to-br from-black/20 to-black/80"></div>
						<div class="absolute bottom-0 right-0 z-10 mb-14 px-5 md:mb-20 md:px-10">
							<h1 class="mb-1 text-2xl font-bold text-white md:mb-3 md:text-6xl">
								Goods and more delivered to your door
							</h1>
							<p class=" mb-2 text-sm md:mb-5 md:text-lg">
								Discover, explore, and enjoy on-demand delivery from this store and more. Shop now
								and get access to a wide range of products, including electronics, fashion, home
								goods, and much more.
							</p>
						</div>
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<SearchBar />
	</Carousel.Root>

	<section class="mt-20">
		<h2 class="text-2xl font-bold md:text-4xl">What We offer</h2>
		<p class="mt-2 text-sm text-muted-foreground md:mt-3 md:text-base">
			With our fast and reliable delivery service, you can have your favorite items delivered right
			to your doorstep. Start shopping today and experience the convenience of online shopping with
			us.
		</p>
		<Button href="/search" class="my-4 md:my-7">Explore products now</Button>
	</section>
</div>
