import Vue from "vue";
export const state = () => ({
  allUsers: [],
  loading: false,
  allBooks: [],
  bookRequests: [],
  sameBooks: []
});

export const getters = {
    allUsers: state => state.allUsers,
    loading: state => state.loading,
    bookRequests: state => state.bookRequests,
    sameBooks: state => state.sameBooks
};

export const mutations = {
  SET_ALL_USERS(state, allUsers) {
    state.allUsers = allUsers;
  },

  SET_LOADING(state, loading) {
    state.loading = loading;
  },
 SET_BOOK_REQUESTS(state, bookRequests) {
    state.bookRequests = bookRequests;
  },

  SET_SAME_BOOKS(state, sameBooks) {
    state.v = sameBooks
  }
};

export const actions = {
  async createNewBook({ commit }, bookData) {
    commit("SET_LOADING", true);
    console.log(bookData)
    await this.$axios.$post("/api/v1/book/create", bookData);
    commit("SET_LOADING", false);
  },

  

  async approveRequets({ commit }, bookData) {
    commit("SET_LOADING", true);
    await this.$axios.$post("/borrow/approve", bookData);
  },

 async getAllUsers({ commit },) {
    commit("SET_LOADING", true);
    const {getUser}   = await this.$axios.$get("/api/v1/get-all-user")
    commit('SET_ALL_USERS', getUser)
    commit("SET_LOADING", false)
  },

  async getAllBookRequests({ commit },) {
    commit("SET_LOADING", true);
    const { data, bookDetails }  = await this.$axios.$get("/borrow/all-requests")
    commit('SET_BOOK_REQUESTS', data, bookDetails)
    commit("SET_LOADING", false)
  },


  async getAllBookRequestsWithSameId({ commit }, bookId) {
    commit("SET_LOADING", true);
    const { data, bookDetails }  = await this.$axios.$get("/borrow/same-book-request/"+ bookId)
    commit('SET_SAME_BOOKS', data, bookDetails)
    commit("SET_LOADING", false)
  },
}