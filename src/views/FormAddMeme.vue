<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-actions>
            <v-flex xs12>
              <form fluid>
                <h2>Register memes</h2>
                <v-text-field
                  label="Title"
                  :rules="[v => !!v || 'Title is required']"
                ></v-text-field>

                <TypesField />

                <v-text-field
                  label="Url img"
                  :rules="[v => !!v || 'Url is required',
                  v =>
                /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
                  .test(v)
                  || 'Url must be valid']"
                ></v-text-field>

                <TagsField />

                <v-btn>submit</v-btn>
                <v-btn>clear</v-btn>
              </form>
            </v-flex>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang='js'>
import Vue from 'vue';
import TypesField from '../components/Forms/TypesField.vue';
import TagsField from '../components/Forms/TagsField.vue';

export default Vue.component('FormAddMeme', {
  components: {
    TypesField,
    TagsField,
  },
  data() {
    return {
      comboboxTypesitems:
        ['type1', 'type2'],
      search_inp: '',
    };
  },
  watch: {
    comboboxTypesitems(val) {
      console.log(val);
    },
  },
});
// import { Component, Vue, Watch, Prop } from "vue-property-decorator";
// import VCombobox from "vuetify/es5/components/VCombobox";

// @Component({
//   components: {}
// })
// export default class FormAddMeme extends Vue {
//   private listType = [
//     { id: 1, name: "type1" },
//     { id: 2, name: "type2" },
//     { id: 3, name: "type3" },
//     { id: 4, name: "type4" },
//     { id: 5, name: "type5" }
//   ];

//   private testList = ["test1", "test2", "test3", "test4", "test5"];
//   private editingListType: any = null;
//   private indexListType = -1;

//   @Prop()
//   private m_typeSelect = {
//     items: [
//       { id: 1, name: "type1" },
//       { id: 2, name: "type2" },
//       { id: 3, name: "type3" },
//       { id: 4, name: "type4" },
//       { id: 5, name: "type5" }
//     ]
//   };

//   private m_titleErrors = "";

//   private search: string = "";

//   public data() {
//     return {
//       // listType: this.listType,
//       listTags: [
//         { id: 1, name: "tags1" },
//         { id: 2, name: "tags2" },
//         { id: 3, name: "tags3" },
//         { id: 4, name: "tags4" },
//         { id: 5, name: "tags5" }
//       ]
//     };
//   }

//   public addnew(...t: any[]) {
//     // alert("rest");
//     console.log(this.m_typeSelect);
//     console.log(t);
//   }

//   @Watch("listType")
//   onChildChanged(val: string, oldVal: string) {
//     console.log("watch listType");
//     console.log(val);
//   }

//   public edit(index: number, item: { id: number; name: string }) {
//     if (!this.editingListType) {
//       this.editingListType = item;
//       this.indexListType = index;
//     } else {
//       this.editingListType = null;
//       this.indexListType = -1;
//     }
//   }
// }
// </script>
