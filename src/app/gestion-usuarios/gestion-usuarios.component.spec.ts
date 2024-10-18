import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionUsuariosComponent } from './gestion-usuarios.component';
import { CurrencyPipe } from '@angular/common'; // Asegúrate de importar CurrencyPipe

describe('GestionUsuariosComponent', () => {
  let component: GestionUsuariosComponent;
  let fixture: ComponentFixture<GestionUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionUsuariosComponent, CurrencyPipe ] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

