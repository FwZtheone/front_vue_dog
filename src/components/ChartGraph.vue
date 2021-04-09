<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
    
  </div>
</template>


<script>
  import LineChart from './LineChart.js'

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: null
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: ["janvier","février","mars","avril","mai","juin","juillet","aout","septembre","octobre","novembre","décembre"],
          datasets: [
            {
              label: 'Mois',
              backgroundColor: '#3e8ef7',
         
              
              data: [1, 1000,2000,3000,20,45]
            }
          ]
        }
      }
    }
  }
</script>

<style scoped>
  .small {
    width: 30em;
    height: 30em;
   
    
  }
</style>