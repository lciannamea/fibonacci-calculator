import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CommonService } from "../../services/CommonService";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  @ViewChild('position') position!: ElementRef;

  private timeIntervalSeconds: number = 5;

  public lastResult!: number;

  public lastPosition!: number;

  constructor(private http: HttpClient, private service: CommonService) {}

  ngOnInit()
  {
    this.updateLastValues();
    setInterval(()=> { this.updateLastValues(); }, this.timeIntervalSeconds * 1000);
  }

  updateLastValues() {
    this.http.get('http://localhost:8000/lastResult').subscribe((data:any) => {
      this.lastResult = data;
    });

    this.http.get('http://localhost:8000/lastPosition').subscribe((data:any) => {
      this.lastPosition = data;
    });
  }

  public calculate() {
    const input = this.position.nativeElement.value;
    if (input !== undefined && input !== '' && !isNaN(+input) && Number.isInteger(+input)) {
      this.http.get('http://localhost:8000/fibonacci/' + input).subscribe((data:any) => {
        this.lastPosition = input;
        this.lastResult = data;
        console.log(`New calculation with position ${input}: ${data}`);
        this.service.sendUpdate('New calculation executed, history must be updated!');
      });
    }
    else {
      alert("Provided number is not an integer!");
    }
  }
}
