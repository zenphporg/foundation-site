import { Config, route } from 'ziggy-js';
import { Ziggy } from '../ziggy.js';

type RouteNames = string;

export default function useRoutes(name: RouteNames, params?: Record<string, any>, absolute: boolean = true): string {
  return route(name as keyof typeof Ziggy.routes, params, absolute, Ziggy as Config);
}
