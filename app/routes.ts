import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('lab-api-context', 'routes/lab-api-context.tsx'),
  route('lab-zustand', 'routes/lab-zustand.tsx'),
] satisfies RouteConfig;
