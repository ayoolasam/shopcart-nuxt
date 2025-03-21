import axios from "axios";
import { useUserStore } from "#imports";
import { ToasterHandler } from "maz-ui";
import { useRouter } from "vue-router";

export default defineNuxtPlugin((NuxtApp) => {
  const toasterHandler = new ToasterHandler(NuxtApp.vueApp);
  const router = useRouter();
  const config = useRuntimeConfig();

  const apiClient = axios.create({
    baseURL: config.public.apiBaseUrl,
  });
  //create an axios intsance with the base url from the runtime config

  const dataStore = useUserStore();

  //add an interceptor to add the token to the request header
  apiClient.interceptors.request.use((config) => {
    config.headers["Authorization"] = `Bearer ${dataStore.token}`;
  
    return config;
  });

  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      const parsedError = error.response?.data?.message || error.message;
      const status = error.response?.status;

      if (
        parsedError?.toLowerCase().includes("session expired") ||
        parsedError?.toLowerCase().includes("invalid signature") ||
        parsedError?.toLowerCase().includes("invalid api token") ||
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
      apiClient, // Provide the configured apiClient
    },
  };
});
