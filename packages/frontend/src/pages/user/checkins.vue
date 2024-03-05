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
			<template #header><i class="ph-pencil ph-bold ph-lg"></i> All Checkins</template>
      TODO list
		</MkFoldableSection>
	</div>
</MkSpacer>
</template>

<script lang="ts" setup>
import * as Misskey from 'misskey-js';
import { onMounted } from 'vue';
import * as os from '@/os.js';
import { Chart, ChartDataset } from 'chart.js';
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
let chartInstance: Chart = null;
const chartLimit = 100; // FIXME at some point
const now = new Date();
const { handler: externalTooltipHandler } = useChartTooltip();


const props = defineProps<{
	user: Misskey.entities.User;
}>();

async function renderChart() {
	if (chartInstance) {
		chartInstance.destroy();
	}

	const getDate = (ago: number) => {
		const y = now.getFullYear();
		const m = now.getMonth();
		const d = now.getDate();

		return new Date(y, m, d - ago);
	};

	const format = (arr) => {
		return arr.map((v, i) => ({
			x: getDate(i).getTime(),
			y: v,
		}));
	};

	const raw = await os.api('users/notes', { userId: props.user.id, limit: chartLimit });
	const checkins = raw.filter(x => x.checkinRating)
  const map = new Map()
  const labels = []
  for (let i = 0.25; i <= 5; i += 0.25) {
    map.set(i, 0)
    labels.push(i.toString())
  }
  checkins.forEach(c => {
    const r = c.checkinRating
    map.set(r, map.get(r) + 1)
  })
  console.log(map)
  const vLineColor = defaultStore.state.darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';

	const colorFile = '#e300db';

	function makeDataset(label: string, data: ChartDataset['data'], extra: Partial<ChartDataset> = {}): ChartDataset {
		return Object.assign({
			label: label,
			data: data,
			parsing: false,
			pointRadius: 0,
			borderWidth: 0,
			borderJoinStyle: 'round',
			borderRadius: 4,
			barPercentage: 0.9,
			fill: true,
		/* @see <https://github.com/misskey-dev/misskey/pull/10365#discussion_r1155511107>
		} satisfies ChartData, extra);
		 */
		}, extra);
	}

  const points = new Map()
  console.log(map.values())

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

	fetching = false;
}

onMounted(async () => {
	renderChart();
});

</script>
