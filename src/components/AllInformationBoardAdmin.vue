<template>
  <div class=" tile is-parent   is-vertical " style="background-color:#f1f4f5;">
    <div class="is-parent tile" style="min-height:auto; max-height:300px">
      <div class="is-parent tile">
        <HeaderAdminBoard></HeaderAdminBoard>
      </div>
    </div>

    <div class="tile is-parent ">
      <div class="tile is-parent">
        <CardInformation v-bind:nombre="70">
          <p class="heading">utlisateurs inscrit(e)s</p></CardInformation
        >
      </div>

      <div class="tile is-parent">
        <CardInformation v-bind:nombre="15">
          <p class="heading">nombre de chien</p>
        </CardInformation>
      </div>

      <div class="tile is-parent">
        <CardInformation v-bind:nombre="15">
          <p class="heading">nombre d'activitées</p>
        </CardInformation>
      </div>
    </div>

    <div class="tile is-parent is-7">
      <div class="is-parent tile">
        <div class="tile is-child box container-chart">
          <ChartGraph></ChartGraph>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardInformation from "./CardInformation";
import ChartGraph from "./ChartGraph";
import HeaderAdminBoard from "./HeaderAdminBoard";
export default {
  components: { CardInformation, ChartGraph, HeaderAdminBoard },
};
</script>

<style></style>
