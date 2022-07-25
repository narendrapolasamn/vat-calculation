import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  of, Subject } from 'rxjs';
import {take} from 'rxjs/operators';
import { VatResultsEntity } from 'src/app/model';
import { getCalculation } from '../../helper/vat-calculation.helper';
import { MaterialModule } from '../../material.module';
import { VatFacade } from '../../services';
import { VatCalculationComponent } from './vat-calculation.component';

describe('VatCalculationComponent', () => {
  let component:VatCalculationComponent;
  let fixture:ComponentFixture<VatCalculationComponent>;
  let vatCal = new Subject<VatResultsEntity>();
  let vatFacade:VatFacade;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      declarations: [
        VatCalculationComponent
      ],
      providers:[FormBuilder,
        {
          provide:VatFacade,
          useValue:{
            getVatCalc:jest.fn(),
            vatCalc$:vatCal.asObservable()
          }
        }
      ]
    }).compileComponents();
  });
 beforeEach(()=>{
  fixture = TestBed.createComponent(VatCalculationComponent);
  component = fixture.componentInstance;
  vatFacade = TestBed.inject(VatFacade);
  fixture.detectChanges();
 })
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check form is in valid',()=>{
     expect(component.vatCalcForm.invalid).toBe(true);
  });
  it('should valid button text and click event',()=>{
      const getCalculations = jest.spyOn(component,'getCalculations');
      const button = fixture.debugElement.query(By.css('#calculate'));
      button.triggerEventHandler('click',null);
      fixture.detectChanges();
     
      expect(button.nativeElement.textContent).toEqual('Calculate');
      expect(getCalculations).toHaveBeenCalled();
  });
  
  it('should check calculation',async()=>{
    const getVatCalc = jest.spyOn(vatFacade,'getVatCalc');
    component.vatCalcForm.patchValue({
        percentage:20,
        type:'vat',
        amount:6
      });
    component.getCalculations();
    const vatCalculations = getCalculation(component.vatCalcForm.value);
    vatCal.next(vatCalculations);
    fixture.detectChanges();
    await fixture.whenStable();
    const gross = fixture.debugElement.query(By.css('.gross'));
    const net = fixture.debugElement.query(By.css('.net'));
    const vat = fixture.debugElement.query(By.css('.vat'));
    const percentage = fixture.debugElement.query(By.css('.percentage'));
    vatFacade.vatCalc$.pipe(take(1)).subscribe(d=>{
      expect(gross.nativeElement.innerText).toEqual(d.gross);
      expect(net.nativeElement.innerHTML).toEqual(d.net);
      expect(vat.nativeElement.innerHTML).toEqual(d.vat);
      expect(percentage.nativeElement.innerHTML).toEqual(d.percentage);
    });
      expect(getVatCalc).toHaveBeenCalled();
    });
});
