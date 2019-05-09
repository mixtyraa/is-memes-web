<template>
  <v-autocomplete
    v-model="comboboxTypes"
    :items="items"
    label="Type"
    :search-input.sync="search"
    no-filter
    @keyup.enter="handleAddNewType"
    item-text="name"
    :loading="isLoading"
    :rules="[v => !!v || 'Type is required']"
  >
    <template v-slot:item="{item}">
        <v-list-tile-content v-text="item.name"></v-list-tile-content>
    </template>

    <template v-slot:no-data>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>
              No results matching "
              <strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
  </v-autocomplete>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';

export default Vue.component('TypesField', {
  data: () => ({
    comboboxTypes: null,
    items: [],
    search: '',
    isLoading: false,
  }),
  watch: {
    search(val) {
      this.lazyLoadTypes(val);
    },
  },
  created() {

  },
  mounted() {

  },
  methods: {
    getTypes() {
      axios.get(`${process.env.VUE_APP_SERVER_URL}/types`).then((data) => {
        console.log(data);
        const result = data.data;
        if (result.status === 'success') {
          this.items = result.data;
        }
      });
    },

    lazyLoadTypes(newVal) {
      this.isLoading = true;
      axios.get(`${process.env.VUE_APP_SERVER_URL}/types`, {
        params: {
          q: newVal,
        },
      }).then((data) => {
        this.isLoading = false;
        const result = data.data;
        if (result.status === 'success') {
          this.items = result.data;
        } else {
          this.items = [];
        }
      });
    },
    addType(name) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_SERVER_URL}/types`,
          JSON.stringify({
            name,
          })).then((data) => {
          const result = data.data;
          if (result.status === 'success') {
            resolve(result.data);
          } else {
            reject();
          }
        });
      });
    },
    handleAddNewType() {
      if ((this.items || []).length === 0) {
        this.isLoading = true;
        this.addType(this.search.trim()).then((data) => {
          this.items = data;
          this.isLoading = false;
          [this.comboboxTypes] = this.items;
        });
      }
    },
  },
});
</script>
