export type THomeRoutes = {
  links: string;
  icons: string;
  name: string;
};

export const homeRoutes: THomeRoutes[] = [
  {
    links: "/",
    icons: "uil uil-estate",
    name: "News Feed",
  },
  {
    links: "/gallery",
    icons: "uil uil-image-v",
    name: "Gallery",
  },
  {
    links: "/aboutUs",
    icons: "uil uil-user-arrows",
    name: "About Us",
  },
  {
    links: "/contactUs",
    icons: "uil uil-envelope",
    name: "Contact Us",
  },
  {
    links: "/profile",
    icons: "uil uil-user",
    name: "Profile",
  },
  {
    links: "/login",
    icons: "uil uil-sign-in-alt",
    name: "Login",
  },
  {
    links: "/registration",
    icons: "uil uil-registered",
    name: "Registration",
  },
];
