import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedOrderComponent } from './received-order.component';

describe('ReceivedOrderComponent', () => {
  let component: ReceivedOrderComponent;
  let fixture: ComponentFixture<ReceivedOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivedOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
