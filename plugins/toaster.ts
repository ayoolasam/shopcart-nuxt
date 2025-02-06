import  { installToaster, ToasterOptions } from "maz-ui";

export default defineNuxtPlugin((nuxtApp) => {
  const toasterOptions: ToasterOptions = {
    position: "top-right",
    timeout: 3000,
    persistent: false,
  };

  nuxtApp.vueApp.use(installToaster, toasterOptions);
});