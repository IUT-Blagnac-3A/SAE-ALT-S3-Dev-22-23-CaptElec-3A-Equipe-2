import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogpageComponent } from './logpage.component';

describe('LogpageComponent', () => {
  let component: LogpageComponent;
  let fixture: ComponentFixture<LogpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
