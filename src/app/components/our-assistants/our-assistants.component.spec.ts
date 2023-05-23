import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurAssistantsComponent } from './our-assistants.component';

describe('OurAssistantsComponent', () => {
  let component: OurAssistantsComponent;
  let fixture: ComponentFixture<OurAssistantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurAssistantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurAssistantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
