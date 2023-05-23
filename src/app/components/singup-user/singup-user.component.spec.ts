import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingupUserComponent } from './singup-user.component';

describe('SingupUserComponent', () => {
  let component: SingupUserComponent;
  let fixture: ComponentFixture<SingupUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingupUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingupUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
