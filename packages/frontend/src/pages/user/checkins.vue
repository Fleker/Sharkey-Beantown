<!--
SPDX-FileCopyrightText: syuilo and other misskey contributors
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
	<MkSpacer :contentMax="700">
		<div class="_gaps">
			<MkFoldableSection class="item">
				<MkLoading v-if="fetching"/>
				<template #header><i class="ph-pulse ph-bold ph-lg"></i> Data</template>
				<canvas ref="chartEl"></canvas>
			</MkFoldableSection>
			<MkFoldableSection class="item">
				<MkLoading v-if="fetching"/>
				<template #header><i class="ph-chart-polar ph-bold ph-lg"></i> Flavor Profile</template>
				<canvas ref="flavorsEl"></canvas>
			</MkFoldableSection>
			<MkFoldableSection class="item">
				<template #header><i class="ph-pencil ph-bold ph-lg"></i> All Checkins</template>
				<h1>{{ allCheckinsTitle }}</h1>
				<MkLoading v-if="fetching"/>
				<table>
					<tr v-for="checkin in sortedCheckins">
						<td>
							<img :src="checkin.checkinLogo" style="width:48px;height:48px;vertical-align:top;" />
						</td>
						<td>
							<strong>{{ checkin.checkinLabel }}</strong>
							<br>
							<em>{{ checkin.checkinSource }}</em>
							<br>
							{{ checkin.checkinClass }}
							<br><br>
						</td>
						<td style="padding-left:24px;">
							My Rating: <strong>{{ checkin.checkinRating }}</strong>
							<br>
							<small>Had on {{ checkin.createdString }}</small>
							<br><br>
						</td>
						<td style="padding-left:24px;" v-show="checkin.tags">
							<i class="ph-tag ph-bold ph-lg"></i>&emsp;
							{{ checkin.tags?.join(', ') }}
						</td>
					</tr>
				</table>
			</MkFoldableSection>
		</div>
	</MkSpacer>
	</template>
	
	<script lang="ts" setup>
	import * as Misskey from 'misskey-js';
	import { onMounted } from 'vue';
	import * as os from '@/os.js';
	import { Chart, ChartDataset, RadarController, RadialLinearScale } from 'chart.js';
	import MkFoldableSection from '@/components/MkFoldableSection.vue';
	import { defaultStore } from '@/store.js';
	import { chartVLine } from '@/scripts/chart-vline.js';
	import { initChart } from '@/scripts/init-chart.js';
	import { chartLegend } from '@/scripts/chart-legend.js';
	import MkChartLegend from '@/components/MkChartLegend.vue';
	import { useChartTooltip } from '@/scripts/use-chart-tooltip.js';
	import gradient from 'chartjs-plugin-gradient';
	
	let fetching = $ref(true);
	const chartEl = $shallowRef<HTMLCanvasElement>(null);
	const flavorsEl = $shallowRef<HTMLCanvasElement>(null);
	let chartInstance: Chart = null;
	let flavorInstance: Chart = null;
	const chartLimit = 100; // FIXME at some point
	const { handler: externalTooltipHandler } = useChartTooltip();
	let sortedCheckins: Misskey.entities.Note[]
	let allCheckinsTitle = 'Sorted by Rating'
	
	const props = defineProps<{
		user: Misskey.entities.User;
	}>();
	
	async function renderChart() {
		Chart.register(RadarController, RadialLinearScale)
		if (chartInstance) {
			chartInstance.destroy();
		}
		if (flavorInstance) {
			flavorInstance.destroy();
		}
	
		const raw = await os.api('users/notes', { userId: props.user.id, limit: chartLimit });
		const checkins = raw.filter(x => x.checkinRating)
		sortedCheckins = [...checkins.map(c => {
			const d = new Date(c.createdAt)
			return {
				...c,
				createdString: d.toLocaleDateString()
			}
		})]
		sortedCheckins.sort((a, b) => b.checkinRating - a.checkinRating)
		const map = new Map();
		const labels = [];
		for (let i = 0.25; i <= 5; i += 0.25) {
			map.set(i, 0)
			labels.push(i.toString())
		}
		checkins.forEach(c => {
			const r = c.checkinRating
			map.set(r, map.get(r) + 1)
		})
		const vLineColor = defaultStore.state.darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';
	
		chartInstance = new Chart(chartEl, {
			type: 'line',
			data: {
				labels: labels,
				datasets: [{
					fill: true,
					borderColor: 'rgb(75, 192, 192)',
					data: [...map.values()],
					tension: 0.1,
				}],
			},
			options: {
				aspectRatio: 3,
				layout: {
					padding: {
						left: 0,
						right: 8,
						top: 0,
						bottom: 0,
					},
				},
				scales: {
					y: {
						position: 'left',
						stacked: true,
						min: 0,
						
						grid: {
							display: true,
						},
						ticks: {
							stepSize: 1,
							display: true,
							//mirror: true,
						},
					},
				},
				interaction: {
					intersect: false,
					mode: 'index',
				},
				plugins: {
					legend: {
						display: false,
					},
					tooltip: {
						enabled: false,
						mode: 'index',
						animation: {
							duration: 0,
						},
						external: externalTooltipHandler,
					},
					gradient,
				},
			},
			plugins: [chartVLine(vLineColor)],
		});
	
		const average = (arr: number[]) => {
			const sum = arr.reduce((prev, curr) => prev + curr)
			return sum/arr.length
		}
	
		const flavorsMap: Record<string, number[]> = {}
		checkins.forEach(c => {
			c.tags?.forEach(t => {
				if (flavorsMap[t]) {
					flavorsMap[t].push(c.checkinRating)
				} else {
					flavorsMap[t] = [c.checkinRating]
				}
			})
		})
		const flavorsData: Record<string, number> = {}
		for (const [key, data] of Object.entries(flavorsMap)) {
			flavorsData[key] = average(data)
		}
		console.log(flavorsData)
	
		flavorInstance = new Chart(flavorsEl, {
			type: 'radar',
			data: {
				labels: Object.keys(flavorsData),
				datasets: [{
					label: 'Average flavor rating',
					data: Object.values(flavorsData),
					fill: true,
					backgroundColor: 'rgba(255, 99, 132, 0.2)',
					borderColor: 'rgb(255, 99, 132)',
					pointBackgroundColor: 'rgb(255, 99, 132)',
					pointBorderColor: '#fff',
					pointHoverBackgroundColor: '#fff',
					pointHoverBorderColor: 'rgb(255, 99, 132)'
				}]
			},
			options: {
				elements: {
					line: {
						borderWidth: 3
					}
				}
			},
			plugins: [chartVLine(vLineColor)],
	
		})
	
		fetching = false;
	}
	
	onMounted(async () => {
		renderChart();
	});
	
	</script>
	