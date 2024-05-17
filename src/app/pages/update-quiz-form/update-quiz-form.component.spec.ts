import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuizFormComponent } from './update-quiz-form.component';

describe('UpdateQuizFormComponent', () => {
  let component: UpdateQuizFormComponent;
  let fixture: ComponentFixture<UpdateQuizFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateQuizFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateQuizFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
