import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: "",
    userData: {},

    email: "",

    role: "",
  }),
  actions: {
    resetStore() {
      this.token = "";

      this.userData = {};
      this.email = "";

      this.role = "";
    },
    updateToken(val) {
      this.token = val;
    },

    updateUserData(val) {
      this.userData = val;
    },

    updateEmail(val) {
      this.email = val;
    },

    updateRole(val) {
      this.role = val;
    },

    fetchProfile() {},
  },
  persist: true,
});
