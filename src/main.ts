import './style.css'
import {setupScatterChart} from './scatter-chart.ts'
import {setupPieChart} from './pie-chart.ts'
//import setupTreeMap from './tree-map.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    
    <h1>Slave Voyage Vizualisation</h1>
    <div class="card">
      <div id="scatter-chart"></div>
    </div>
      <div id="pie-chart"></div>
      <div class="piechart-slider">
        <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
      </div>
    <div class="card">
      <div id="treemap"></div>
    </div>
    <p class="read-the-docs">
      A interactive data visualisation of the many voyages from europe to the americas in the transatlantic slave trade.
    </p>
  </div>
`

setupScatterChart(document.querySelector<HTMLButtonElement>('#scatter-chart')!);
setupPieChart(
  document.querySelector<HTMLButtonElement>('#pie-chart')!,
  document.querySelector<HTMLInputElement>('.piechart-slider')!
);
//setupTreeMap(document.querySelector<HTMLDivElement>('.treemap')!)
