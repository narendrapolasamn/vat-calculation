import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

@Component({
  selector: 'app-vat-calculation',
  template:''
})
class MockVatCalculationComponent{

}
describe('AppComponent', () => {
  let component:AppComponent;
  let fixture:ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        MockVatCalculationComponent
      ],
    }).compileComponents();
  });
 beforeEach(()=>{
  fixture = TestBed.createComponent(AppComponent);
  component = fixture.componentInstance;
 })
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate title', () => {
    expect(component.title).toEqual('Vat Calculation');
  });

});
