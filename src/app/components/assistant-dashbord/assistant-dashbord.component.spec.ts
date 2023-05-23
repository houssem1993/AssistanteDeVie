import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantDashbordComponent } from './assistant-dashbord.component';

describe('AssistantDashbordComponent', () => {
  let component: AssistantDashbordComponent;
  let fixture: ComponentFixture<AssistantDashbordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistantDashbordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistantDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
