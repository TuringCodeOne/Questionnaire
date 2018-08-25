import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QestionnaireComponent } from './qestionnaire.component';

describe('QestionnaireComponent', () => {
  let component: QestionnaireComponent;
  let fixture: ComponentFixture<QestionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QestionnaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
