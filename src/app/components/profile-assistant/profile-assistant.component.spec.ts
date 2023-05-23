import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAssistantComponent } from './profile-assistant.component';

describe('ProfileAssistantComponent', () => {
  let component: ProfileAssistantComponent;
  let fixture: ComponentFixture<ProfileAssistantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAssistantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
