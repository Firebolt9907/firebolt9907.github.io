import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("socials", "routes/socials.tsx"),
    route("recruiters", "routes/recruiters.tsx"),
] satisfies RouteConfig;