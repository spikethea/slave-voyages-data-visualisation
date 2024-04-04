import './style.css'
import { setupChart } from './scatter-chart.ts'
//import setupTreeMap from './tree-map.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    
    <h1>Slave Voyage Vizualisation</h1>
    <div class="card">
      <div id="chart"></div>
    </div>
    <div class="card">
      <div id="treemap"></div>
    </div>
    <p class="read-the-docs">
      A interactive data visualisation of the many voyages from europe to the americas in the transatlantic slave trade.
    </p>
  </div>
`

setupChart(document.querySelector<HTMLButtonElement>('#chart')!);
//setupTreeMap(document.querySelector<HTMLDivElement>('.treemap')!)
