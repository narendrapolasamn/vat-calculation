import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import {Observable} from "rxjs";
import { VatCalculationEntity, VatResultsEntity } from "../model";
import { getvatCalculations } from "../store/actions";
import { BaseFacade } from "../store/facade";
import { getVatCalculation } from "../store/reducers";




@Injectable({
    providedIn: 'root'
})
export class VatFacade extends BaseFacade {
    constructor(protected override readonly state$: Store<any>) {
        super(state$);
    }
    
    readonly vatCalc$:Observable<VatResultsEntity> = this.takeAll(getVatCalculation);

    readonly getVatCalc = (vat:VatCalculationEntity) => {
        this.dispatch(getvatCalculations({payload:vat}));
    }

    
}