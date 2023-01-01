<script setup>
const pages = [
	{
		key: 'button',
		route: { name: 'components.button' },
		label: 'Button'	
	}
]
</script>

<template>
	<ul>
		<li v-for="page in pages" :key="page.key">
			<router-link :to="page.route">{{ page.label }}</router-link>
		</li>
	</ul>
</template>