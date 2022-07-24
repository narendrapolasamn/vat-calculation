import { VatCalculationEntity, VatResultsEntity } from "../model";

export function getCalculation(vat:VatCalculationEntity){
    const percentage = vat.percentage? (vat?.percentage/100):0.20;
    let vatResult!:VatResultsEntity;
    const amount = +(vat?.amount!);
    switch(vat?.type?.toLowerCase()){
      case 'net':
        const gross = (amount + (amount * percentage));
        vatResult = {
         net:amount,
         gross:gross,
         vat:(gross -  amount),
         percentage: percentage
       }
       break;
       case 'gross':
         const netvalue = (amount - (amount * percentage));
        vatResult = {
         net:netvalue,
         gross:amount,
         vat:(amount - netvalue),
         percentage: percentage };
       break;
       case 'vat':
         const netAmount =(amount/percentage);
         vatResult = {
           net:netAmount,
           gross:netAmount +amount,
           vat:vat.amount,
           percentage: percentage };
       break;
       default:
       break;
      
    }
    return vatResult;
}