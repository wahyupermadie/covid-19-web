<template>
<div class="container">
  <div>
    <div>
      <b-card-group deck>
        <b-card bg-variant="warning" text-variant="white" header="Dalam Perawatan" class="text-center">
          <b-card-text>{{covidResponse.perawatan}}</b-card-text>
        </b-card>

        <b-card bg-variant="danger" text-variant="white" header="Meninggal" class="text-center">
          <b-card-text>{{covidResponse.meninggal}}</b-card-text>
        </b-card>

        <b-card bg-variant="success" text-variant="white" header="Sembuh" class="text-center">
          <b-card-text>{{covidResponse.sembuh}}</b-card-text>
        </b-card>
      </b-card-group>
    </div>
  </div>
</div>
</template>

<script>
import {mapState} from "vuex";
export default {
  name: 'Home Page',
  data () {
    return {
      
    }
  },
  mounted() {
    this.fetchCovid()
  },
  computed: mapState(['covidResponse']),
  methods: {
    fetchCovid: function() {
      this.$store.dispatch("loadData")
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
