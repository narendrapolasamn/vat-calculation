import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import { VatResultsEntity } from '../../model';
import { VatFacade } from '../../services';

@Component({
  selector: 'app-vat-calculation',
  templateUrl: './vat-calculation.component.html',
  styleUrls: ['./vat-calculation.component.scss'],
})
export class VatCalculationComponent implements OnInit {

  vatCalcForm!:FormGroup;
  vatCalc$:Observable<VatResultsEntity> = this.vatFacade.vatCalc$;
  constructor(private vatFacade:VatFacade, private formBuilder: FormBuilder){

  }
  ngOnInit() {
     this.vatCalcForm = this.formBuilder.group({
      percentage: ['',[Validators.required]],
      type: ['',[Validators.required]],
      amount:['',[Validators.required,Validators.pattern(/^(?!0+$)[0-9]+(?:\.[0-9]+)?$/)]] //^[0-9,.*#+]+$
    });
  }
  getCalculations(){
     this.vatFacade.getVatCalc(this.vatCalcForm.value);
  }
  
}

// function easyRoundOf(value,decima){
//   if(isNaN(value))
//   {return 0;}
//   else{
//   decima=Math.pow(10,parseConv(decima));
//   var rndvalus = Math.round(parseConv(value) * decima) / decima;
//   if(isNaN(rndvalus)){return 0;}
//   else{return rndvalus;}
//   }
//   }
//   function parseConv(val)
// {return parseFloat(val);}
/// Net = G - (G*tax) vat = G-N
/// Gross = Net + (net*tax)
/// Net = vat/tax 