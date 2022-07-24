import { VatCalculationEntity, VatResultsEntity } from "../model";

export function getCalculation(vat:VatCalculationEntity){
    const percentage = vat.percentage? (vat?.percentage/100):0.20;
    let vatResult!:VatResultsEntity;
    const amount = +(vat?.amount!);
    switch(vat?.type?.toLowerCase()){
      case 'net':
        const gross = (amount + (amount * percentage));
        vatResult = {
         net:roundOf(amount),
         gross:roundOf(gross),
         vat:roundOf(gross -  amount),
         percentage: percentage
       }
       break;
       case 'gross':
         const netvalue = amount/(1+percentage);
        vatResult = {
         net:roundOf(netvalue),
         gross:roundOf(amount),
         vat:roundOf(amount - netvalue),
         percentage: percentage };
       break;
       case 'vat':
         const netAmount =(amount/percentage);
         vatResult = {
           net:roundOf(netAmount),
           gross:roundOf(netAmount + amount),
           vat:roundOf(amount),
           percentage: percentage };
       break;
       default:
       break;
      
    }
    return vatResult;
}

export function roundOf(val:number){
  return Math.round(val);
}