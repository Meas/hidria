import { State, Action, StateContext } from '@ngxs/store';
import { SetComparison, UnsetComparison, ClearComparison } from './app.actions';

export interface AppStateModel {
  user: {};
  comparison: {}[];
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    user: {},
    comparison: []
  }
})
export class AppState {
  @Action(SetComparison)
  setUser({ patchState, getState }: StateContext<AppStateModel>, { payload }: SetComparison) {
    console.log(payload);
    patchState({ comparison: payload.concat(getState().comparison) });
  }

  @Action(UnsetComparison)
  unsetUser({ patchState, getState }: StateContext<AppStateModel>, { payload }: UnsetComparison) {
    const comp = getState().comparison;
    comp.splice(comp.indexOf(comp[payload]), 1);
    patchState({ comparison: comp });
  }

  @Action(ClearComparison)
  clearUser({ patchState }: StateContext<AppStateModel>) {
    patchState({ comparison: [] });
  }
}
