<template>
  <div class="container">
      <b-card-group deck>
        <b-card bg-variant="warning" text-variant="white" header="Total Kasus Terkonfirmasi" class="text-center">
          <div v-if="loading"> 
              <b-spinner label="Spinning"></b-spinner>
          </div>
          <b-card-text v-else>{{covidResponse.jumlahKasus}}</b-card-text>
        </b-card>

        <b-card bg-variant="info" text-variant="white" header="Dalam Perawatan" class="text-center">
          <div v-if="loading"> 
              <b-spinner label="Spinning"></b-spinner>
          </div>
          <b-card-text v-else>{{covidResponse.perawatan}}</b-card-text>
        </b-card>

        <b-card bg-variant="danger" text-variant="white" header="Meninggal" class="text-center">
          <div v-if="loading"> 
              <b-spinner label="Spinning"></b-spinner>
          </div>
          <b-card-text v-else>{{covidResponse.meninggal}}</b-card-text>
        </b-card>

        <b-card bg-variant="success" text-variant="white" header="Sembuh" class="text-center">
          <div v-if="loading"> 
              <b-spinner label="Spinning"></b-spinner>
          </div>
          <b-card-text v-else>{{covidResponse.sembuh}}</b-card-text>
          <p>{{covidByProvince}}</p>
        </b-card>
      </b-card-group>
      <br>
      <canvas id="covid-chart"></canvas>
      <b-table striped hover responsive :items="items" :fields="fields"></b-table>
  </div>
</template>

<script>
import Chart from 'chart.js';
import {mapState} from "vuex";
export default {
  name: 'Home-Page',
  data () {
    return {
      fields: [
          {
            key: 'provinsi',
          },
          {
            key: 'kasus_positif',
            sortable: false
          },
          {
            key: 'kasus_sembuh',
            sortable: true
          },
          {
            key: 'kasus_meninggal',
            sortable: true
          },
          {
            key: 'pembaruan'
          }
        ],
        items: []
    }
  },
  created() {
    this.fetchCovid()
    this.fetchCovidByProvince()
  },
  computed: {
    covidResponse(){
      return this.$store.getters.getCovidResponse 
    },
    loading(){
      return this.$store.getters.loading
    },
    covidByProvince(){
      var value = this.$store.getters.getCovidByProvince.data
      var label = []
      var sembuh = []
      var meninggal = []
      var positif = []
      if(value != undefined){
        for(var i = 0; i < value.length - 1 ; i++){
          var data = {
            "provinsi":value[i].provinsi,
            "kasus_positif":value[i].kasusPosi,
            "kasus_sembuh":value[i].kasusSemb,
            "kasus_meninggal":value[i].kasusMeni
          }
          label.push(value[i].provinsi)
          sembuh.push(value[i].kasusSemb)
          meninggal.push(value[i].kasusMeni)
          positif.push(value[i].kasusPosi)

          this.items.push(data)
        }
        this.createChart(label, sembuh, meninggal, positif)
      }
    }
  },
  methods: {
    fetchCovid: function() {
      this.$store.dispatch("loadData")
    },
    fetchCovidByProvince: function () {
      this.$store.dispatch("loadDataByProvince")
    },
    createChart: function (label, sembuh, meninggal, positif) {
      const ctx = document.getElementById('covid-chart');
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
              labels: label,
              datasets: [
                { // one line graph
                  label: 'Sembuh',
                  data: sembuh,
                  backgroundColor: [
                    'rgba(39, 167, 68,.5)',
                  ],
                  borderColor: [
                    '#36495d',
                    '#36495d',
                    '#36495d',
                    '#36495d',
                    '#36495d',
                    '#36495d',
                    '#36495d',
                    '#36495d',
                  ],
                  borderWidth: 3
                },
                { // one line graph
                  label: 'Meninggal',
                  data: meninggal,
                  backgroundColor: [
                    'rgba(255, 77,0,.5)',
                  ],
                  borderColor: [
                    '#36495d',
                    '#36495d',
                    '#36495d',
                    '#36495d',
                    '#36495d',
                    '#36495d',
                    '#36495d',
                    '#36495d',
                  ],
                  borderWidth: 3
                },
                { // one line graph
                  label: 'Positif',
                  data: positif,
                  backgroundColor: [
                    'rgba(22, 162, 184,.5)',
                  ],
                  borderColor: [
                    '#36495d',
                    '#36495d',
                    '#36495d',
                    '#36495d',
                    '#36495d',
                    '#36495d',
                    '#36495d',
                    '#36495d',
                  ],
                  borderWidth: 3
                }
          ]
        },
          options: {
            responsive: true,
            lineTension: 1,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  padding: 25,
                }
              }]
            }
          },
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
