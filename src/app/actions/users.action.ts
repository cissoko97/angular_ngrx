import { createActionGroup, props, emptyProps } from '@ngrx/store';


export const hydratation = createActionGroup({
  source: 'HYDRATE',
  events: {
    'init': emptyProps(),
    'failure': emptyProps()
  }
})
