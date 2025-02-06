// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"



export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
 

  runtimeConfig:{
    public: {
      apiBaseUrl:'http://localhost:7000'
      //  apiBaseUrl:'https://event-management-express.onrender.com'
  },

  },


  build: {
    transpile: ['maz-ui'],
  },
  vite: {
    plugins:[
      tailwindcss(),
    ],
    resolve: {
      alias: {
        './types': './node_modules/maz-ui/components/types.d.ts', // Explicitly resolve the path
      },
    },
  },

  modules:["nuxt-rating",'maz-ui/nuxt',
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
    'pinia-plugin-persistedstate/nuxt'
    ],


  

  mazUi: {
    injectComponents: true,
    injectCss: true,
    injectAos: {
      injectCss: true,
    },
    injectUseToast: true,
    injectUseThemeHandler: true,
    devtools: true,
  },



 

  devtools: { enabled: true },
  

  css:['~/assets/css/main.css',
    "remixicon/fonts/remixicon.css",
  ],


  
  imports: {
    dirs: ["stores"],
  },

  // vite:{
  //   plugins:[
  //     tailwindcss(),
  //   ]
  // }

})
