import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpurchaseComponent } from './viewpurchase.component';

describe('ViewpurchaseComponent', () => {
  let component: ViewpurchaseComponent;
  let fixture: ComponentFixture<ViewpurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewpurchaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewpurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
