import { VatCalculationEntity } from "src/app/model";


export interface AppState {
   vatState:VatState
}

export interface VatState{
  vatCalcuation:VatCalculationEntity,
 
}
