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
          :data="data"
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
          aria-current-label="Current page"
        >
          <b-table-column
            field="id"
            label="ID"
            width="40"
            sortable
            numeric
            v-slot="props"
          >
            {{ props.row.id }}
          </b-table-column>

          <b-table-column
            field="user.first_name"
            label="Nom"
            sortable
            v-slot="props"
          >
            {{ props.row.lastName }}
          </b-table-column>

          <b-table-column
            field="user.last_name"
            label="Prénom"
            sortable
            v-slot="props"
          >
            {{ props.row.name }}
          </b-table-column>

          <b-table-column label="Email" sortable v-slot="props" centered> 
            {{ props.row.email }}
          </b-table-column>

          <b-table-column label="Rôle" sortable v-slot="props" centered>
            <span class="tag is-primary" v-if="props.row.rule">
              ADMIN
            </span>

            <span class="tag is-success" v-else>
              USER
            </span>
          </b-table-column>

          <b-table-column
            field="date"
            label="Création du compte"
            sortable
            centered
            v-slot="props"
          >
            <span class="tag is-success">
              {{ props.row.createdAt }}
            </span>
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
        </b-table>
      </div>
    </div>

    <div class=" is-parent tile ">
      <div class="tile">
        <div class=" is-parent tile  ">
          <div
            class=" is-tile is-child box card-add-user"
            @click="isCardModalActiveCreateUser = true"
          >
            <div
              class="container is-size-2 is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
            >
              <p>Ajouter un utilisateur</p>
              <img
                class="image is-128x128 "
                src="/assets/plus.png"
                alt="useradd"
              />
            </div>
          </div>
        </div>
      </div>

      
    </div>


    <!-- modifier l'user  -->
    <b-modal v-model="isCardModalActive">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head has-background-primary ">
          <p class="modal-card-title has-text-white">Modification</p>
          <button
            type="button"
            class="delete"
            @click="isCardModalActive = false"
          ></button>
        </header>
        <section class="modal-card-body">
          <b-field label="Nom">
            <b-input
              type="text"
              :value="nameUser"
              v-model="nameUser"
              placeholder="Ton nom"
              required
            >
            </b-input>
          </b-field>

          <b-field label="Prénom">
            <b-input
              type="text"
              :value="lastNameUser"
              v-model="lastNameUser"
              placeholder="Ton prénom"
              required
            >
            </b-input>
          </b-field>

          <b-field label="Email">
            <b-input
              type="email"
              :value="emailUser"
              v-model="emailUser"
              placeholder="Ton email"
              required
            >
            </b-input>
          </b-field>


             <b-field label="Mot de passe">
            <b-input
              type="text"
              :value="test"
              v-model="passwordUser"
              placeholder="Mot de passe"
              required
            >
            </b-input>
          </b-field>

          <b-field label="Rôle">
            <b-select required v-model="ruleUser">
              <option v-for="(item, index) in ruleUsers" :key="index">
                {{ item }}
              </option>
            </b-select>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <b-button label="Fermer" @click="isCardModalActive = false" type="is-danger" outlined />
          <b-button
            label="Confirmer"
            type="is-primary"
            outlined
            @click="validateManageUser()"
          />
        </footer>
      </div>
    </b-modal>

    <!-- pour ajouter un user  -->
    <b-modal v-model="isCardModalActiveCreateUser">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head has-background-primary ">
          <p class="modal-card-title has-text-white">Création d'utilisateur</p>
          <button
            type="button"
            class="delete"
            @click="isCardModalActiveCreateUser = false"
          ></button>
        </header>
        <section class="modal-card-body">
          <b-field label="Nom">
            <b-input
              type="text"
              :value="nameUser"
              v-model="nameUser"
              placeholder="Ton nom"
              required
            >
            </b-input>
          </b-field>

          <b-field label="Prénom">
            <b-input
              type="text"
              :value="lastNameUser"
              v-model="lastNameUser"
              placeholder="Ton prénom"
              required
            >
            </b-input>
          </b-field>

          <b-field label="Email">
            <b-input
              type="email"
              :value="emailUser"
              v-model="emailUser"
              placeholder="Ton émail"
              required
            >
            </b-input>
          </b-field>

          <b-field label="Mot de passe">
            <b-input
              type="password"
              :value="passwordUser"
              v-model="passwordUser"
              password-reveal
              placeholder="Ton mot de passe"
              required
            >
            </b-input>
          </b-field>

          <b-field label="Rôle">
            <b-select required v-model="ruleUser">
              <option v-for="(item, index) in ruleUsers" :key="index">
                {{ item }}
              </option>
            </b-select>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <b-button
            label="Fermer"
            outlined
            @click="isCardModalActiveCreateUser = false"
            type="is-danger"
          />
          <b-button label="Confirmer" type="is-primary" @click="addUser()" outlined />
        </footer>
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
      this.getAllUsers();
    });
  },

  data: function() {
    return {
      isCardModalActiveCreateUser: false,
      ruleUsers: ["admin", "user"],
      idUser: "",
      nameUser: "",
      lastNameUser: "",
      passwordUser: "",
      emailUser: "",
      ruleUser: "",
      isCardModalActive: false,
      data: this.getAllUsers,
      element: "bonjour",
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
    addUser: function() {
      const token = this.$store.getters.getToken;

      this.isCardModalActiveCreateUser = true;
      axios
        .post(
          "http://localhost:8000/user/register",
          {
            name: this.nameUser,
            lastname: this.lastNameUser,
            email: this.emailUser,
            password: this.passwordUser,
            rule: this.ruleUser,
          },
          { headers: { Authorization: "Bearer " + token } }
        )
        .then((rep) => {
          if (rep.data === "undefined must be unique") {
            this.$buefy.toast.open({
              duration: 1000,
              message: `Email déjà prise!`,
              position: "is-top",
              type: "is-danger",
            });
          } else {
            console.log(rep);
            this.$buefy.toast.open({
              duration: 1000,
              message: `Compte créé!`,
              position: "is-top",
              type: "is-success",
            });
            this.isCardModalActiveCreateUser = false;
            this.getAllUsers();
          }
        })
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

    manageUserById: function(id, name, lname, password, email, rule) {
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
          this.getAllUsers();
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
          this.getAllUsers();
        })
        .catch((err) => console.log(err));
    },
    getAllUsers: function() {
      const token = this.$store.getters.getToken;

      axios
        .get("http://localhost:8000/user/all", {
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
</style>
