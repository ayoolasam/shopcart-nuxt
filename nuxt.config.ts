// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"



export default defineNuxtConfig({



  app: {
    head: {
      charset: "utf-8",
      htmlAttrs: {
        lang: "en",
      },
      viewport: "width=device-width, initial-scale=1",
      title: "Shop Cart",
      // link: [
      //   {
      //     rel: "stylesheet",
      //     href: "/fonts/sfprodisplay.css",
      //   },
      // ],
    },
  },

  compatibilityDate: '2024-11-01',

  imports: {
    dirs: ["stores"],
  }, 

  runtimeConfig:{
    public: {
      apiBaseUrl:'http://localhost:7000'
      //  apiBaseUrl:'https://shopcart-backend-bnou.onrender.com'
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


  


  // vite:{
  //   plugins:[
  //     tailwindcss(),
  //   ]
  // }

})
