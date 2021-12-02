<template>
    <main>
        <v-item-group active-class="primary">
                <div class="text-h6 text-left font-weight-medium grey--text mb-10 text-capitalize">'{{bookTitle}}'</span></div>
                <div>
                    <v-row>
                        <v-col cols="12" md="4" class="pa-0">
                            <div class="d-flex items-center">
                                <v-text-field
                                    v-model="search"
                                    placeholder="Password"
                                    append-icon="mdi-magnify"
                                    dense
                                    outlined
                                    block
                                    height="40"
                                    :required="true"
                                    class="ma-0 p-0 mb-3"
                                />
                                <!--<v-select
                                    :items="items"
                                    dense
                                    solo
                                    height="40"
                                    width="40"
                                    append-icon="mdi-filter"
                                    ><v-icon>
                                        mdi-filter
                                    </v-icon></v-select -->
                                <v-btn
                                    class="ml-1"
                                    depressed
                                    height="40"
                                    width="40"
                                    :loading="loading"
                                    :disabled="loading"
                                    color="primary"
                                    @click="loader = 'loading'"
                                    >
                                    <v-icon>
                                        mdi-filter
                                    </v-icon>
                                </v-btn>
                            </div>
                        </v-col>
                        <div>
                        </div>
                        <v-col cols="12" md="8" class="pa-0">
                            <v-btn class="ml-auto d-flex" color="primary" depressed>Lend Book</v-btn>
                        </v-col>
                    </v-row>
                </div>
                <v-row>
                    <v-col  cols="12" class="pa-0">
                        <div class="text-subtitle-1 text-left font-weight-normal grey--text mb-2" v-if="!books">
                            No book request yet, please check back !
                        </div>
                        <template>
                            <v-simple-table>
                                <template v-slot:default>
                                <thead>
                                    <tr>
                                    <th class="text-left">
                                        <div class="text-subtitle-1 text-left font-weight-medium grey--text mb-2">Users</div>
                                    </th>
                                    <th class="text-center">
                                        Select
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                    v-for="item in books"
                                    :key="item.id"
                                    class="grey--text"
                                    >
                                        <td>
                                            {{ item.title }}
                                        </td>
                                        <td class="text-center d-flex justify-center">
                                            <v-checkbox
                                                v-model="checkbox"
                                                class="my-auto d-flex"
                                            ></v-checkbox>
                                        </td>
                                    </tr>
                                </tbody>
                                </template>
                            </v-simple-table>
                            </template>
                    </v-col>
                </v-row>
        </v-item-group>
    </main>
</template>
<script>
export default {
  components: {},
  layout: 'admin',
  data(){
      return {
          loading: false,
          search: null,
            bookTitle: 'Purpose driven life',
            checkbox: false,
            items: ['author', 'year'],
            books: [ 
                {title: 'Purpose driven life', availebleCopies: 10, id: '121313311'},
                {title: 'Purpose driven life', availebleCopies: 10, id: '121313331'},
                {title: 'Purpose driven life', availebleCopies: 10, id: '121313371'},
                {title: 'Purpose driven life', availebleCopies: 10, id: '121313361'},
            ]
      }
  }
}
</script>
<style scoped>
a{
    text-decoration: none !important;
}
.table-width{
    width: 100% !important;
    background: red !important;
}
</style>