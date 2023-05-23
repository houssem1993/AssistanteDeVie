import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneAssistantComponent } from './one-assistant.component';

describe('OneAssistantComponent', () => {
  let component: OneAssistantComponent;
  let fixture: ComponentFixture<OneAssistantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneAssistantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
