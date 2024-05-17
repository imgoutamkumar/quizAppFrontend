import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingComponent2Component } from './testing-component2.component';

describe('TestingComponent2Component', () => {
  let component: TestingComponent2Component;
  let fixture: ComponentFixture<TestingComponent2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingComponent2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestingComponent2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
