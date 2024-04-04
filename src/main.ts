import './style.css'
import { setupChart } from './scatter-chart.ts'
import setupMap from './tree-map.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    
    <h1>Slave Voyage Vizualisation</h1>
    <div class="card">
      <div id="chart"></div>
    </div>
    <div class="card">
      <div id="scatter"></div>
    </div>
    <p class="read-the-docs">
      A interactive data visualisation of the many voyages from europe to the americas in the transatlantic slave trade.
    </p>
  </div>
`

setupChart(document.querySelector<HTMLButtonElement>('#chart')!);
setupMap(document.querySelector<HTMLDivElement>('.scatter')!)
