import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AlertComponent } from './alert.component';
import { AlertService } from '../alert.service';
import { Router, RouterModule } from '@angular/router';



describe('AlertComponent', () => {
  let fixture: ComponentFixture<AlertComponent>;
  let component: AlertComponent;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ],
      providers: [ AlertService],
      declarations: [AlertComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be createable', () => expect(component).toBeTruthy());

  it('dismiss should modify message property', () => {
    let event: Event;
    component.dismiss(event);
    expect(component.message).toBe(false);
  });

});
