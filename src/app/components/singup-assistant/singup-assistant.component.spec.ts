import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingupAssistantComponent } from './singup-assistant.component';

describe('SingupAssistantComponent', () => {
  let component: SingupAssistantComponent;
  let fixture: ComponentFixture<SingupAssistantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingupAssistantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingupAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
