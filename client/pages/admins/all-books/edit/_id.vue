<template>
    <main>
        <div class="text-h6 text-left font-weight-medium grey--text mb-10 text-capitalize">Edit '{{bookTitle}}'</span></div>
        <v-row>
            <v-col cols="12" md="4" class="pa-0">
                <div>
                    <v-text-field
                        v-model="book.title"
                        placeholder="Book Title"
                        required
                        label="Book Title"
                        dense
                        outlined
                        block
                        :required="true"
                        class="ma-0 p-0 mb-3"
                    />
                </div>
                <div cols="12" md="6" class="ma-0 pa-0">
                    <v-text-field
                        v-model="book.isbnNumber"
                        placeholder="ISBN number"
                        label="ISBN number"
                        required
                        dense
                        outlined
                        block
                        :required="true"
                        class="ma-0 p-0 mb-3"
                    />
                </div>
                <div cols="12" md="6" class="ma-0 pa-0">
                    <v-text-field
                        v-model="book.price"
                        placeholder="Price"
                        label="Price"
                        required
                        dense
                        outlined
                        block
                        :required="true"
                        class="ma-0 p-0 mb-3"
                    />
                </div>
                <div cols="12" md="6" class="ma-0 pa-0">
                    <v-text-field
                        v-model="book.availableCopies"
                        placeholder="Available copies"
                        label="Available copies"
                        required
                        dense
                        outlined
                        block
                        :required="true"
                        class="ma-0 p-0 mb-3"
                    />
                </div>
                <div cols="12" md="6" class="ma-0 pa-0">
                    <v-text-field
                        v-model="book.description"
                        placeholder="Description"
                        label="Description"
                        required
                        dense
                        outlined
                        block
                        :required="true"
                        class="ma-0 p-0 mb-3"
                    />
                </div>
            </v-col>
            <v-col cols="12" md="4" class="pa-0">
                <div>
                    <v-text-field
                        v-model="book.authorName"
                        placeholder="Author name"
                        label="Author name"
                        required
                        dense
                        outlined
                        block
                        :required="true"
                        class="ma-0 p-0 mb-3"
                    />
                </div>
                <div cols="12" md="6" class="ma-0 pa-0">
                    <v-text-field
                        v-model="book.datePublished"
                        placeholder="Date published"
                        label="Date published"
                        required
                        dense
                        outlined
                        block
                        :required="true"
                        class="ma-0 p-0 mb-3"
                    />
                </div>
                <div cols="12" md="6" class="ma-0 pa-0">
                    <v-text-field
                        v-model="book.bookCover"
                        placeholder="Upload book cover"
                        label="Upload book cover"
                        required
                        dense
                        outlined
                        block
                        :required="true"
                        class="ma-0 p-0 mb-3"
                    />
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="4" class="pa-0">
                <v-btn  color="primary" block class="px-12 bg-primary ">Edit Book</v-btn>
            </v-col>
        </v-row>
    </main>
</template>
<script>
export default {
    layout: 'admin',
    data(){
        return {
            bookTitle:"Purpose driven life",
            book: {
                title: null,
                isbnNumber: null,
                price: null,
                availableCopies: null,
                description: null,
                authorName: null,
                datePublished: null,
                bookCover: null
            }
        }
    }
}
</script>