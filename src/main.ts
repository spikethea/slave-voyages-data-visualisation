import './style.css'
import {setupScatterChart} from './scatter-chart.ts'
import {setupPieChart} from './pie-chart.ts'
//import setupTreeMap from './tree-map.ts'


setupScatterChart(document.querySelector<HTMLButtonElement>('#scatter-chart')!);
setupPieChart(
  document.querySelector<HTMLButtonElement>('#pie-chart')!,
  document.querySelector<HTMLInputElement>('.piechart-slider')!
);
//setupTreeMap(document.querySelector<HTMLDivElement>('.treemap')!)
