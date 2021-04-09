<template>
  <div class=" tile is-parent   is-vertical " style="background-color:#f1f4f5;">
    <div class="is-parent tile is-12" style="min-height:auto; max-height:300px">
      <div class="is-parent tile">
        <HeaderAdminBoard></HeaderAdminBoard>
      </div>
    </div>

    <div class="tile is-parent is-10">
      <div class="tile is-parent">
        <div class="is-child tile">
          <b-field grouped group-multiline>
            <b-select v-model="perPage" :disabled="!isPaginated">
              <option value="5">5 personnes par page</option>
              <option value="10">10 personnes par page</option>
              <option value="15">15 personnes par page</option>
              <option value="20">20 personnes par page</option>
            </b-select>
          </b-field>
        </div>
      </div>
    </div>

    <div class="is-parent tile">
      <div class="is-child tile">
     <b-table
            :data="isEmpty ?  [] : data "
            :paginated="isPaginated"
            :per-page="perPage"
            :current-page.sync="currentPage"
            :pagination-simple="isPaginationSimple"
            :pagination-position="paginationPosition"
            :default-sort-direction="defaultSortDirection"
            :pagination-rounded="isPaginationRounded"
            :sort-icon="sortIcon"
            :sort-icon-size="sortIconSize"
            default-sort="user.first_name"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page">

            <b-table-column field="id" label="ID" width="40" sortable numeric v-slot="props">
                {{ props.row.id }}
            </b-table-column>

            <b-table-column field="user.first_name" label="Nom" sortable v-slot="props">
                {{ props.row.lastName }}
            </b-table-column>

            <b-table-column field="user.last_name" label="Prénom" sortable v-slot="props">
                {{ props.row.name }}
            </b-table-column>

               <b-table-column  label="Email" sortable v-slot="props">
                {{ props.row.email }}
            </b-table-column>

            <b-table-column  label="Rôle" sortable v-slot="props">
                <span class="tag is-primary" v-if="props.row.rule">
                    ADMIN
                </span>

                <span class="tag is-success" v-else>
                    USER
                </span>

            </b-table-column>

            <b-table-column field="date" label="Création du compte" sortable centered v-slot="props">
                <span class="tag is-success">
                    {{ props.row.createdAt}}
                </span>
            </b-table-column>

            <b-table-column label="Gender" v-slot="props">
                <span>
                    <b-icon pack="fas"
                        :icon="props.row.gender === 'Male' ? 'mars' : 'venus'">
                    </b-icon>
                    {{ props.row.gender }}
                   
                </span>
            </b-table-column>

        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderAdminBoard from "../HeaderAdminBoard";
import axios from "axios";

export default {
  components: { HeaderAdminBoard },
  mounted: function() {
    this.$nextTick(function() {
      this.getAllUsers();
    });
  },
  data: function() {
    return {
      data: "",
      element : "bonjour",
      isPaginated: true,
      isPaginationSimple: false,
      isPaginationRounded: false,
      paginationPosition: "bottom",

      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      currentPage: 1,
      perPage: 5,
    };
  },




  methods: {
    getAllUsers: function() {
      const token =  this.$store.getters.getToken;
     

      axios
        .get("http://localhost:8000/user/all" ,  {headers : {Authorization : 'Bearer ' + token}})
        .then((rep) => {
          
            this.data = rep.data;
            console.log(this.data);
          
        })
        .catch((err) => console.log(err.response));

    },
  },
};
</script>

<style></style>
