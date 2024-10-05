import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierCoordinationComponent } from './supplier-coordination.component';

describe('SupplierCoordinationComponent', () => {
  let component: SupplierCoordinationComponent;
  let fixture: ComponentFixture<SupplierCoordinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierCoordinationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierCoordinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
