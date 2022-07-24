import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from "@ngrx/store";

import { vatReducer } from "./app.reducer";
import { AppState, VatState } from "./app.state";
import * as Helper from '../../helper'


export const reducers: ActionReducerMap<AppState> = {
  vatState: vatReducer,
};

export const getVatState =
  createFeatureSelector<VatState>("vatState");

export const getVatCalculation = createSelector(
    getVatState,
    (state: VatState) => {
        return Helper.getCalculation(state.vatCalcuation)
    }
  );


