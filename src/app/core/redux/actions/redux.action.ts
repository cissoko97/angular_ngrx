import { createActionGroup, props, emptyProps } from '@ngrx/store';

/**
 * Redux action for hydration
 */
export const hydratation = createActionGroup({
  source: 'HYDRATE',
  events: {
    'init': emptyProps(),
    'failure': emptyProps()
  }
})
