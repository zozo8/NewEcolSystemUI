import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversalComponentsComponent } from './universal-components.component';

describe('UniversalComponentsComponent', () => {
  let component: UniversalComponentsComponent;
  let fixture: ComponentFixture<UniversalComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniversalComponentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversalComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
