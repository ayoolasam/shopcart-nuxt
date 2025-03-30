
import axios from "axios";
import { useUserStore } from "#imports";
import { ToasterHandler } from "maz-ui";
import { useRouter } from "vue-router";

export default defineNuxtPlugin((NuxtApp) => {
  const toasterHandler = new ToasterHandler(NuxtApp.vueApp);
  const router = useRouter();
  const config = useRuntimeConfig();

  
  axios.defaults.baseURL = config.public.apiBaseUrl;
  // axios.defaults.withCredentials = true;
  const dataStore = useUserStore();
  axios.interceptors.request.use((config) => {
    config.headers["Authorization"] = `Bearer ${dataStore.token}`;
    console.log("Request Interceptor:", config); // Add logging to verify

    return config;
  });

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const parsedError = error.response?.data?.message || error.message;
      const status = error.response?.status;
      if (
        parsedError?.toLowerCase().includes("session expired") ||
        parsedError?.toLowerCase().includes("invalid signature") ||
        parsedError?.toLowerCase().includes("Invalid api token") ||
        status === 401
      ) {
        toasterHandler.error(parsedError, { position: "top-right" });
        if (!window.location.pathname.includes("/Login")) {
          dataStore.$reset();
          router.push(`/Login?fallBackUrl=${window.location.pathname}`);
        }
      }
      return Promise.reject(error);
    }
  );
  return {
    provide: {
      axios: axios,
    },
  };
});
