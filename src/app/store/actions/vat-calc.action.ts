import { createAction, props } from '@ngrx/store';
import { VatCalculationEntity } from 'src/app/model';
;


export const getvatCalculations= createAction(
  '[git hub] get vat calculation action',
   props<{ payload: VatCalculationEntity }>()
);

