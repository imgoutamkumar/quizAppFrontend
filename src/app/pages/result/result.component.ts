import { Component, OnInit } from '@angular/core';
import { ResultService } from '../../services/result.service';
import { ActivatedRoute } from '@angular/router';
import { error } from 'node:console';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent implements OnInit {
  constructor(
    private resultService: ResultService,
    private activatedRoute: ActivatedRoute
  ) {}

  result: any;
  showResult() {
    this.activatedRoute.paramMap.subscribe({
      next: (value: any) => {
        console.log('result id from url: ', value.get('resultId'));
        this.resultService
          .getResultByResultId(value.get('resultId'))
          .subscribe({
            next: (val: any) => {
              console.log(val);
              this.result = val;
            },
            error: (val: any) => {
              console.log(value);
            },
          });
      },
      error: (value: any) => {
        console.log(value);
      },
    });
  }

  ngOnInit(): void {
    this.showResult();
  }
}
