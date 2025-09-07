import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/recruiters.tsx"),
    route("socials", "routes/socials.tsx"),
    route("home", "routes/home.tsx"),
] satisfies RouteConfig;