<template>
  <div>
    <div
      class="text-h6 text-left font-weight-medium grey--text mb-10 text-capitalize"
    >
      <span>Add New Book</span>
    </div>
    <v-row>
      <v-col cols="12" md="4" class="pa-0">
        <div>
          <v-text-field
            v-model="title"
            placeholder="Book Title"
            required
            label="Book Title"
            dense
            outlined
            block
            class="ma-0 p-0 mb-3"
          />
        </div>
        <div cols="12" md="6" class="ma-0 pa-0">
          <v-text-field
            v-model="isbnNumber"
            placeholder="ISBN number"
            label="ISBN number"
            required
            dense
            outlined
            block
            class="ma-0 p-0 mb-3"
          />
        </div>
        <div cols="12" md="6" class="ma-0 pa-0">
          <v-text-field
            v-model="price"
            placeholder="Price"
            label="Price"
            required
            dense
            outlined
            block
            class="ma-0 p-0 mb-3"
          />
        </div>
        <div cols="12" md="6" class="ma-0 pa-0">
          <v-text-field
            v-model="noOfCopies"
            placeholder="Number of copies"
            label="Available copies"
            required
            dense
            outlined
            block
            class="ma-0 p-0 mb-3"
          />
        </div>
        <div cols="12" md="6" class="ma-0 pa-0">
          <v-text-field
            v-model="description"
            placeholder="Description"
            label="Description"
            required
            dense
            outlined
            block
            class="ma-0 p-0 mb-3"
          />
        </div>
      </v-col>
      <v-col cols="12" md="4" class="pa-0">
        <div>
          <v-text-field
            v-model="authorName"
            placeholder="Author name"
            label="Author name"
            required
            dense
            outlined
            block
            class="ma-0 p-0 mb-3"
          />
        </div>
      </v-col>
      <v-col col="12" class="pa-0">
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="datePublished"
              label="Publish Date"
              prepend-icon=""
              prepend-inner-icon="mdi-calendar"
              readonly
              block
              outlined
              v-bind="attrs"
              v-on="on"
              class="ma-0 p-0 mb-3"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="datePublished"
            @input="menu2 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col col="12" class="pa-0">
        <div cols="12" md="6" class="ma-0 pa-0">
          <v-file-input
            v-model="bookCover"
            placeholder="Upload book cover"
            label="Upload book cover"
            required
            dense
            outlined
            prepend-icon=""
            accept="image/png, image/jpeg, image/jpg"
            prepend-inner-icon="mdi-camera"
            hide-details
            block
            :required="true"
            class="ma-0 p-0 mb-3"
          />
        </div>
      </v-col>

      <v-col cols="12" md="4" class="pa-0">
        <v-btn
          @click="addNewBook"
          color="primary"
          block
          class="px-12 bg-primary"
          >Add Book</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  layout: "admin",
  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,

      title: null,
      isbnNumber: null,
      price: null,
      noOfCopies: null,
      description: null,
      authorName: null,
      datePublished: null,
      bookCover: null,
    };
  },
  methods: {
    ...mapActions({
      createNewBook: "administration/createNewBook",
    }),
    async addNewBook() {
      const data = {
        bookTitle: this.title,
      };
      console.log(data);

      try {
        let blob = this.bookCover;
        let formData = new FormData();

        formData.append("bookTitle", this.title);
        formData.append("authorName", this.authorName);
        formData.append("isbnNumber", this.isbnNumber);
        formData.append("noOfCopies", this.noOfCopies);
        formData.append("publishDate", this.date);
        formData.append("description", this.description);

        formData.append("pricePerBook", this.price);
        formData.append("bookCover", blob);
        console.log(formData);
        await this.createNewBook(formData);
        // console.log(formData)
        this.$router.push("/admins/all-books/");
        await this.$notify({
          group: "auth",
          text: `${this.title} successfully added`,
          duration: 1500,
        });
      } catch (err) {}
    },
  },
};
</script>
