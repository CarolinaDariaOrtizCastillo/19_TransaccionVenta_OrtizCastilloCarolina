import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaProductos } from './tabla-productos';

describe('TablaProductos', () => {
  let component: TablaProductos;
  let fixture: ComponentFixture<TablaProductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaProductos],
    }).compileComponents();

    fixture = TestBed.createComponent(TablaProductos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
