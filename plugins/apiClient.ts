import axios from "axios"
   

export default defineNuxtPlugin((NuxtApp)=>{

  const config = useRuntimeConfig()
  
  const apiClient = axios.create({
    baseURL:config.public.apiBaseUrl
  })



return{
  provide: {
    apiClient
  }
}

}) 