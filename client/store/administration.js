import Vue from "vue";
export const state = () => ({
  allUsers: [],
  loading: false,
  allBooks: [],
  bookRequests: [],
  sameBooks: [],
  pendingRequests: [],
  allApprovedRequests: []
});

export const getters = {
    allUsers: state => state.allUsers,
    loading: state => state.loading,
    bookRequests: state => state.bookRequests,
    sameBooks: state => state.sameBooks,
    pendingRequests: state => state.pendingRequests,
    allApprovedRequests: state => state.allApprovedRequests
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
  },

  SET_PENDING_REQUESTS(state, pendingRequests) {
    state.pendingRequests = pendingRequests
  },

  SET_ALL_APPROVED_REQUESTS(state, allApprovedRequests){
    state.allApprovedRequests = allApprovedRequests
  }
};

export const actions = {
  async createNewBook({ commit }, bookData) {
    commit("SET_LOADING", true);
    await this.$axios.$post("/api/v1/book/create", bookData);
    commit("SET_LOADING", false);
  },

  

  async approveRequests({ commit }, bookData) {
    commit("SET_LOADING", true);
    await this.$axios.$patch("/api/v1/admin-approval/approve-book-borrowing/" + bookData);
    commit("SET_LOADING", false);
  },

  async updateRequests({ commit }, bookData) {
    commit("SET_LOADING", true);
    await this.$axios.$patch("/api/v1/admin-approval/update-return-books/"+ bookData);
    commit("SET_LOADING", false);
  },

 async getAllUsers({ commit },) {
    commit("SET_LOADING", true);
    const {getUser}   = await this.$axios.$get("/api/v1/get-all-user")
    commit('SET_ALL_USERS', getUser)
    commit("SET_LOADING", false)
  },

  async getAllBookRequests({ commit },) {
    commit("SET_LOADING", true);
    const { data, bookDetails }  = await this.$axios.$get("/api/v1/admin-approval/borrow/all-requests")
    commit('SET_BOOK_REQUESTS', data, bookDetails)
    commit("SET_LOADING", false)
  },


  async getAllBookRequestsWithSameId({ commit }, bookId) {
    commit("SET_LOADING", true);
    const { data, bookDetails }  = await this.$axios.$get("/borrow/same-book-request/"+ bookId)
    commit('SET_SAME_BOOKS', data, bookDetails)
    commit("SET_LOADING", false)
  },

  async getAllPendingRequests({ commit },) {
    commit("SET_LOADING", true);
    const { data }  = await this.$axios.$get("/api/v1/admin-approval/get-all-pending-requests")
    commit('SET_PENDING_REQUESTS', data)
    commit("SET_LOADING", false)
  },

  async getAllApprovedRequests({ commit },) {
    commit("SET_LOADING", true);
    const { data }  = await this.$axios.$get("/admin/get-all-approved-requests")
    commit('SET_ALL_APPROVED_REQUESTS', data)
    commit("SET_LOADING", false)
  },

}