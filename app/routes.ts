import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/judge.tsx"),
  route("results", "pages/results.tsx"),
] satisfies RouteConfig;
