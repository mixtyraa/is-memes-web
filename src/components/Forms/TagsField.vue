<template>
  <v-autocomplete
    v-model="comboboxTags"
    :items="items"
    label="Tags"
    :search-input.sync="search"
    no-filter
    @keyup.enter="handleAddNewTag"
    item-text="name"
    :loading="isLoading"
    :rules="[v => (v || []).length > 0 || 'Tags is required']"
    multiple
    hide-selected
    :hide-no-data="(search || '').replace(/\s/g, '').length === 0"
    return-object
  >
    <template v-slot:item="{item}">
        <v-list-tile-content v-text="item.name" @click="search=''"></v-list-tile-content>
    </template>
    <template v-slot:append-item >
        <v-list-tile v-if="items.length > 0">
          <v-list-tile-content>
            <v-list-tile-title>
              <span style="font-style: italic">
                > Or press <kbd>enter</kbd> to create a new one
              </span>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
    </template>

    <template v-slot:selection="{ item, parent, selected }">
      <v-chip
        v-if="item === Object(item)"
        :color="`${item.color} lighten-3`"
        :selected="selected"
        label
        small
      >
        <span class="pr-2">
          {{ item.name }}
        </span>
        <v-icon
          small
          @click="parent.selectItem(item)"
        >close</v-icon>
      </v-chip>
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

export default Vue.component('TagsField', {
  data: () => ({
    comboboxTags: [],
    items: [],
    search: '',
    isLoading: false,
  }),
  watch: {
    search(val) {
      this.lazyLoadTags(val);
    },
    comboboxTags(val) {
      this.items = val;
    },
  },
  created() {

  },
  mounted() {

  },
  methods: {
    getTags() {
      axios.get(`${process.env.VUE_APP_SERVER_URL}/Tags`).then((data) => {
        console.log(data);
        const result = data.data;
        if (result.status === 'success') {
          this.items = result.data;
        }
      });
    },

    lazyLoadTags(newVal) {
      const selected = [...this.comboboxTags];
      if ((newVal || '').replace(/\s/g, '').length === 0) {
        // this.items = selected;
        return;
      }

      this.isLoading = true;
      axios.get(`${process.env.VUE_APP_SERVER_URL}/Tags`, {
        params: {
          q: newVal,
        },
      }).then((data) => {
        this.isLoading = false;
        const result = data.data;
        if (result.status === 'success') {
          this.items = [...result.data, ...selected];
        } else {
          this.items = [...selected];
        }
      });
    },
    addTag(name) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_SERVER_URL}/Tags`,
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

    handleAddNewTag() {
      this.isLoading = true;
      this.addTag(this.search.trim()).then((data) => {
        const selected = [...this.comboboxTags];
        console.log(selected);
        this.items = [...data, ...selected];
        this.isLoading = false;
        this.comboboxTags.push(data[0]);
        this.search = '';
      });
    },
  },
});
</script>
