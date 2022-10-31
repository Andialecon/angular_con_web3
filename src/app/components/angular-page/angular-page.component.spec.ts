import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPageComponent } from './angular-page.component';

describe('AngularPageComponent', () => {
  let component: AngularPageComponent;
  let fixture: ComponentFixture<AngularPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
