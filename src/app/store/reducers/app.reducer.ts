import { createReducer, on } from '@ngrx/store';
import * as vatActions from '../actions/vat-calc.action';
import { VatState } from './app.state';

export const intialState: VatState = {
  vatCalcuation:{}

};
export const vatReducer = createReducer(
  intialState,
  on(vatActions.getvatCalculations, (state, payload) => {
    return { ...state, vatCalcuation: payload?.payload };
  }),
 
);
