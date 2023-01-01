<script setup>
import { BanguiButton } from '@/components'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
const colors = ['primary', 'secondary', 'danger', 'success', 'warning', 'light', 'dark']
</script>

<template>
	<div>
		<div>
			<h1>Label From Slot</h1>
			<bangui-button>Label From Slot</bangui-button>
		</div>
		<hr>
		<div>
			<h1>Label From Props</h1>
			<bangui-button label="Label From Props" />
		</div>
		<hr>
		<div>
			<h1>As Other Tag</h1>
			<bangui-button tag="router-link" :to="{ name: 'home' }" label="As Link" />
		</div>
		<hr>
		<div>
			<h1>Sizes</h1>
			<bangui-button
				v-for="(size, index) in sizes"
				:key="index"
				:size="size"
				:label="size" />
		</div>
		<hr>
		<div>
			<h1>Colors</h1>
			<bangui-button
				v-for="(color, index) in colors"
				:key="index"
				:color="color"
				:label="color" />
		</div>
		<hr>
		<div>
			<h1>Block</h1>
			<bangui-button label="Block" block />
		</div>
		<hr>
		<div>
			<h1>Disabled</h1>
			<bangui-button label="Disabled" disabled />
		</div>
		<hr>
		<div>
			<h1>Loading</h1>
			<bangui-button label="Loading" loading />
		</div>
	</div>
</template>