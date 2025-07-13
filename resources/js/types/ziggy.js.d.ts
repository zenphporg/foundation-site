import { route as routeFn } from 'ziggy-js';

declare global {
  let route: typeof routeFn;
}

// Add declaration for the generated ziggy.js file
declare module '../ziggy.js' {
  export const Ziggy: any;
}
