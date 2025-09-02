import {
	index,
	layout,
	type RouteConfig,
	route,
} from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("login", "routes/login.tsx"),
	route("lab-api-context", "routes/lab-api-context.tsx"),
	route("lab-zustand", "routes/lab-zustand.tsx"),
	route("lab-open-ai", "routes/lab-open-ai.tsx"),
	layout("routes/code-splitting-lab/layout.tsx", [
		route("page-a", "routes/code-splitting-lab/page-a/page.tsx"),
		route("page-b", "routes/code-splitting-lab/page-b/page.tsx"),
		route("page-c", "routes/code-splitting-lab/page-c/page.tsx"),
	]),
] satisfies RouteConfig;
