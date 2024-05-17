import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnPublishedQuizComponent } from './un-published-quiz.component';

describe('UnPublishedQuizComponent', () => {
  let component: UnPublishedQuizComponent;
  let fixture: ComponentFixture<UnPublishedQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnPublishedQuizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnPublishedQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
