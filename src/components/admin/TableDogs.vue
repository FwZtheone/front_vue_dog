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
              <option value="5">5 chiens par page</option>
              <option value="10">10 chiens par page</option>
              <option value="15">15 chiens par page</option>
              <option value="20">20 chiens par page</option>
            </b-select>
          </b-field>
        </div>
      </div>
    </div>

    <div class="is-parent tile">
      <div class="is-child tile">
        <!-- <b-field grouped group-multiline>
            <div class="control">
                <b-switch v-model="showDetailIcon">Show detail icon</b-switch>
            </div>
            <div class="control">
                <b-switch v-model="useTransition">Use transition (fade) when toggling details</b-switch>
            </div>
        </b-field> -->

        <b-table
          :data="data"
          ref="table"
          paginated
          :per-page="perPage"
          :opened-detailed="defaultOpenedDetails"
          detailed
          detail-key="id"
          :detail-transition="transitionName"
          @details-open="
            (row) => $buefy.toast.open(`Expanded ${row.user.first_name}`)
          "
          :show-detail-icon="showDetailIcon"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
        >
          <!-- "id": 1,
    "name": "tommy",
    "race": "cesar",
    "gender": "1",
    "birth": "2020-04-10",
    "vaccination": true,
    "sterile": true,
    "description": "un chien super cool",
    "picture": "default picture",
    "like": 0,
    "statut": false,
    "createdAt": "2021-02-16T12:24:26.000Z",
    "updatedAt": "2021-02-16T12:24:26.000Z -->
          <b-table-column
            field="id"
            label="ID"
            width="40"
            numeric
            v-slot="props"
          >
            {{ props.row.id }}
          </b-table-column>

          <b-table-column label="Nom" sortable v-slot="props">
            <template v-if="showDetailIcon">
              {{ props.row.name }}
            </template>
            <template v-else>
              <a @click="props.toggleDetails(props.row)">
                {{ props.row.race }}
              </a>
            </template>
          </b-table-column>

          <b-table-column label="Race" sortable v-slot="props" >
            {{ props.row.race }}
          </b-table-column>
          <b-table-column label="Vaccination" sortable v-slot="props" centered>
            {{ props.row.vaccination == true ? "oui" : "non" }}
          </b-table-column>

          <b-table-column label="Stérile" sortable v-slot="props" centered>
            {{ props.row.gender == true ? "oui" : "non" }}
          </b-table-column>

          <b-table-column
            field="date"
            label="Dâte de naissance"
            sortable
            centered
            v-slot="props"
          >
            <span class="tag is-success">
              {{ props.row.birth }}
            </span>
          </b-table-column>

          <b-table-column label="Sexe" v-slot="props" centered>
            <span  >
              <b-icon
                pack="fas"
																
                :icon="props.row.gender == 1 ? 'mars' : 'venus'"
              >
              </b-icon>
            </span>
 </b-table-column>
            <b-table-column field="like" label="Like" sortable v-slot="props" centered>
              {{ props.row.like }}
            </b-table-column>
         

   <b-table-column label="Supprimer" v-slot="props" centered>
            <span @click="deleteUser(props.row.id)">
              <b-icon pack="fas" icon="trash" class="tag is-danger btn-delete">
              </b-icon>
            </span>
          </b-table-column>

          <b-table-column label="Modifier" v-slot="props" centered>
            <span
              @click="
                manageUserById(
                  props.row.id,
                  props.row.name,
                  props.row.lastName,
                  props.row.password,
                  props.row.email,
                  props.row.rule
                )
              "
            >
              <b-icon
                pack="fas"
                icon="users-cog"
                class="tag is-info btn-delete"
              >
              </b-icon>
            </span>
          </b-table-column>




          <template #detail="props" class="has-background-primary"  >
            <article class="media ">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img
                    src="https://buefy.org/static/img/placeholder-128x128.png"
                  />
                </p>
              </figure>
              <div class="media-content ">
                <div class="content">
                  <p>
                    <strong>{{ props.row.name }} {{ props.row.race }}</strong>
                    <small>@{{ props.row.picture }}</small>
                    <small>31m</small>
                    <br />
                    {{ props.row.description }}
                  </p>
                </div>
              </div>
            </article>
          </template>
        </b-table>
      </div>
    </div>

    <div class=" is-parent tile ">
      <div class="tile">
        <div class=" is-parent tile  ">
          <div
            class=" is-tile is-child box card-add-user"
            @click="isCardModalActiveCreateDog = true"
          >
            <div
              class="container is-size-2 is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
            >
              <p>Ajouter un chien</p>
              <img
                class="image is-128x128 "
                src="/assets/blush-dog.png"
                alt="useradd"
              />
            </div>
          </div>
        </div>
      </div>
    </div>


                <!-- MODAL  -->
    <b-modal v-model="isCardModalActiveCreateDog"  >
      <div class="modal-card" style="width: auto; height: auto;">
        <header class="modal-card-head has-background-primary">
          <p class="modal-card-title has-text-white">Ajouter un chien</p>
          <button
            type="button"
            class="delete"
            @click="isCardModalActiveCreateDog = false"
          ></button>
        </header>
        <section class="modal-card-body">

          
          <form enctype="multipart/form-data" @submit="checkForm" method="post">
            <b-field label="Nom" >
              <b-input type="text" placeholder="Le nom" required v-model="dog.name"> </b-input>
            </b-field>

            <b-field label="Race">
              <b-input type="text" placeholder="La race" required v-model="dog.race">  </b-input>
            </b-field>
         

            <b-field label="Sexe" >
              <b-select required placeholder="choisir un sexe" v-model="dog.gender">
                <option value="male">Mâle</option>
                <option value="femelle">Femelle</option>
              </b-select>
            </b-field>

            <b-field label="Stérile" >
              <b-select required placeholder="choisir une valeur" v-model="dog.sterile">
                <option value="oui">oui</option>
                <option value="non">non</option>
              </b-select>
            </b-field>

            <b-field label="Vaccination" >
              <b-select required placeholder="choisir une valeur" v-model="dog.vaccination">
                <option value="oui">oui</option>
                <option value="non">non</option>
              </b-select>
            </b-field>

                <b-field label="Description">
            <b-input maxlength="200" type="textarea" v-model="dog.description"></b-input>
        </b-field>
          <b-field>
            <b-datepicker
              ref="datepicker"
              expanded
              placeholder="Selectionne une dâte de naissance"
              v-model="dog.birth"
            >
            </b-datepicker>
            <b-button
              @click="$refs.datepicker.toggle()"
              icon-left="calendar-today"
              type="is-primary"
            />
          </b-field>

          <b-field label="Ajouter une photo">
            <b-field class="file is-primary" :class="{ 'has-name': !!file }">
              <b-upload v-model="dog.picture" class="file-label" rounded name="picture" native="true">
                <span class="file-cta">
                  <b-icon icon="upload"></b-icon>
                  <span class="file-label">{{
                    dog.picture.name || "Clique pour ajouter"
                  }}</span>
                </span>
              </b-upload>
            </b-field>
          </b-field>

<footer class="modal-card-foot">
          <b-button
          type="is-danger"
          outlined
            label="Fermer"
            @click="isCardModalActiveCreateDog = false"
          />
          <b-button label="Confirmer" type="is-primary" native-type="submit"   outlined/>
        </footer>
          </form>
          
        </section>
        
        
        
      </div>
      
    </b-modal>
    
  </div>
</template>

<script>
import HeaderAdminBoard from "../HeaderAdminBoard";
import axios from "axios";

export default {
  components: { HeaderAdminBoard },
  mounted: function() {
    this.$nextTick(function() {
      this.getAllDogs();
    });
  },

  data: function() {
    return {
      
      file: {},
      dog : {
        name:'',
        race :'',
        gender:'',
        sterile:'',
        vaccination:'',
        description:'',
        picture:{},

      },


      defaultOpenedDetails: [1],
      showDetailIcon: true,
      useTransition: false,
      isCardModalActiveCreateDog: false,
      isCardModalActive: false,
      data: this.getAllDogs,
      element: "bonjour",
      isPaginated: true,
      isPaginationSimple: false,
      isPaginationRounded: false,
      paginationPosition: "bottom",
      error: [],
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      currentPage: 1,
      perPage: 5,
    };
  },

  methods: {
    checkForm : function(e){
      e.preventDefault();
      this.error  = [];
      this.file = this.dog.picture;
      this.addDog();
    },
    addDog: function() {
      const token = this.$store.getters.getToken;

      this.isCardModalActiveCreateUser = true;
      if(this.dog.vaccination == "oui"){
        this.dog.vaccination = 1
      }else{
        this.dog.vaccination = 0
      }

       if(this.dog.sterile == "oui"){
        this.dog.sterile = 1
      }else{
        this.dog.sterile = 0
      }

      
       if(this.dog.gender == "Mâle"){
        this.dog.gender = 1
      }else{
        this.dog.gender = 0
      }
      axios
        .post(
          "http://localhost:8000/dog/add",
          {
            name: this.dog.name,
            race: this.dog.race,
            gender: this.dog.gender,
            birth: this.dog.birth,
            vaccination: this.dog.vaccination,
            sterile: this.dog.sterile,
            description: this.dog.description,
            picture: this.file
          },
          { headers: { Authorization: "Bearer " + token } }
        )
        .then((rep) => {
            console.log(rep);
            this.isCardModalActiveCreateUser = false;
            this.getAllDogs();
          }
        )
        .catch((err) => {
          console.log(err);
          console.log("ERREURRRRRRRRRRRR");
        });
    },

    popupSuccess: function() {
      this.$buefy.toast.open({
        duration: 1000,
        message: `Changement réussies!`,
        position: "is-top",
        type: "is-success",
      });
    },
    errorEmail: function() {
      this.$buefy.toast.open({
        duration: 1000,
        message: `Un des champs est manquant(s)`,
        position: "is-top",
        type: "is-danger",
      });
    },

    manageDogById: function(id, name, lname, password, email, rule) {
      this.isCardModalActive = true;
      this.idUser = id;
      (this.nameUser = name),
        (this.lastNameUser = lname),
        (this.passwordUser = password),
        (this.emailUser = email),
        (this.ruleUser = rule);
    },
    validateManageUser: async function() {
      const token = this.$store.getters.getToken;
      if (this.ruleUser === "admin") {
        this.ruleUser = true;
      } else {
        this.ruleUser = false;
      }

      await axios
        .post(
          "http://localhost:8000/user/update/admin",
          {
            id_user: this.idUser,
            name: this.nameUser,
            lastname: this.lastNameUser,
            email: this.emailUser,
            password: this.passwordUser,
            rule: this.ruleUser,
          },
          { headers: { Authorization: "Bearer " + token } }
        )
        .then((rep) => {
          console.log(rep);
          this.getAllDogs();
          this.popupSuccess();
          this.isCardModalActive = false;
          console.log(this.ruleUser);
        })
        .catch((err) => console.log(err));
    },
    deleteUser: function(id) {
      const token = this.$store.getters.getToken;
      axios
        .post(
          "http://localhost:8000/user/remove",
          {
            id,
          },
          { headers: { Authorization: "Bearer " + token } }
        )
        .then((rep) => {
          console.log(rep);
          this.getAllDogs();
        })
        .catch((err) => console.log(err));
    },
    getAllDogs: function() {
      const token = this.$store.getters.getToken;

      axios
        .get("http://localhost:8000/dog/all", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((rep) => {
          this.data = rep.data;
          console.log(this.data);
        })
        .catch((err) => console.log(err.response));
    },
  },
};
</script>

<style scoped>
.btn-delete {
  padding: 1rem;
  font-size: 1rem;
}
.btn-delete:hover {
  cursor: pointer;
  opacity: 0.5;
}
.card-add-user {
  transition: 0.5s ease-out;
}
.card-add-user:hover {
  transform: translateY(-10px);
  cursor: pointer;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}



</style>
