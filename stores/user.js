import axios from "axios";
import { useToast } from "maz-ui";

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

    async fetchUserDetails() {
      const { $apiClient } = useNuxtApp();
      const toast = useToast();
      try {
        const response = await $apiClient.get("/api/v1/user", {
          withCredentials: true,
        });

        if (response) {
          this.userData = response.data.data.user;
          this.userRole = response.data.data.user.role;
        }
      } catch (e) {
        if (e.message.includes("Network")) {
          toast.error("Please check your internet connection");
        } else {
          toast.error(e.response.data.message);
        }
      }
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
