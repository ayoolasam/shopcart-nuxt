import { useUserStore } from "#imports";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  // const protectedLayouts = ["student", "tutor"];
  // const roleDashboards = {
  //   student: "/student/dashboard",
  //   staff: "/tutor/dashboard",
  // };
  const publicRoutes = ["/", "/Login", "/Register", "/forgotPassword",];

  if (to.meta.auth === false) {
    return;
  }

  if (publicRoutes.includes(to.path) || to.path.startsWith("/products/")) {
    return;
  }

  const redirectToLogin = (to) => {
    if (to.path !== "/Login" && to.meta.layout) {
      const url = to.fullPath === "/" ? "/Login" : `/Login`;

      userStore.$reset();
      return navigateTo(url);
    }
  };

  if (!userStore.token) {
    return redirectToLogin(to);
  }

  const userRole = userStore.role;

  // if (protectedLayouts.includes(to.meta.layout)) {
  //   if (to.meta.layout === "tutor" && userRole !== "staff") {
  //     return navigateTo(roleDashboards[userRole]);
  //   }

  //   if (to.meta.layout === "student" && userRole !== "student") {
  //     return navigateTo(roleDashboards[userRole]);
  //   }
  // }
});
