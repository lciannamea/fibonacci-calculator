import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatPaginator } from "@angular/material/paginator";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { CommonService } from "../../services/CommonService";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements AfterViewInit {

  private subscription: Subscription;
  private timeIntervalSeconds: number = 5;

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild('history') history!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public displayedColumns: string[] = [
    'datetime',
    'position',
    'result'
  ];

  constructor(private http: HttpClient, private service: CommonService) {
    this.subscription = this.service.getUpdate().subscribe
    (message => {
      this.updateHistory();
    });
  }

  ngAfterViewInit()
  {
    this.updateHistory();
    setInterval(()=> { this.updateHistory(); }, this.timeIntervalSeconds * 1000);
  }

  updateHistory() {
    this.http.get('http://localhost:8000/history').subscribe((data:any) => {
      this.dataSource.data = data;
      this.dataSource.data.reverse();
      this.dataSource.paginator = this.paginator;
      this.history.dataSource = this.dataSource;
    });
  }

}
