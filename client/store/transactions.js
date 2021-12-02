import Vue from "vue";
export const state = () => ({
  loading: false,
  borrowedBooks: [],
  allBooks: [],
  singleBook: {}
});

export const getters = {
    loading: state => state.loading,
    borrowedBooks: state => state.borrowedBooks,
    allBooks: state => state.allBooks,
    singleBook: state => state.singleBook,
};

export const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading;
  },

  SET_BORROWED_BOOKS(state, borrowedBooks) {
    state.borrowedBooks = borrowedBooks;
  },

  SET_ALL_BOOKS(state, allBooks) {
    state.allBooks = allBooks;
  },

  SET_BOOK(state, singleBook) {
    state.singleBook = singleBook;
  },
};

export const actions = {
    async getMyBorrowedBooks({ commit }) {
        commit("SET_LOADING", true);
        const { data } = await this.$axios.$get("/api/v1/books-borrowing/get-borrowed-books");
        commit('SET_BORROWED_BOOKS', data)
        commit("SET_LOADING", false);
    },



    async getAllBooks({ commit }, registerData) {
        commit("SET_LOADING", true);
        const { data } = await this.$axios.$get("/api/v1/book/get-books");
        console.log(data)
        commit('SET_ALL_BOOKS', data);
        commit("SET_LOADING", false);
    },

    async getSingleBook({ commit }, bookId) {
        commit("SET_LOADING", true);
        const { book } = await this.$axios.$get("/api/v1/book/get-books/" + bookId);
        commit('SET_BOOK', book);
        commit("SET_LOADING", false);
    },

    async borrowBook({ commit }, applicationData) {
        commit("SET_LOADING", true);
        await this.$axios.$post("/api/v1/books-borrowing/add-borrowed-book", applicationData);
        commit("SET_LOADING", false);
    },
};

