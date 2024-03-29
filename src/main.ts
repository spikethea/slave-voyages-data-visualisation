import './style.css'
import { setupChart } from './chart.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    
    <h1>Slave Voyage Vizualisation</h1>
    <div class="card">
      <div id="chart"></div>
    </div>
    <p class="read-the-docs">
      A interactive data visualisation of the many voyages from europe to the americas in the transatlantic slave trade.
    </p>
  </div>
`

setupChart(document.querySelector<HTMLButtonElement>('#chart')!)
