import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule, MatSort, SortDirection } from '@angular/material/sort';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Observable, catchError, map, merge, of, startWith, switchMap } from 'rxjs';
import { User } from 'src/app/misc/models/user.model';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
})
export class GridComponent implements OnChanges {
  @Input() columns: any[] = [];
  @Input() isLoadingResults!: boolean;
  @Input() data: any = [];

  @Output() fetchNext = new EventEmitter<any>()

  displayedColumns = this.columns.map((column)=>column.key)

  dataSource: MatTableDataSource<never> = new MatTableDataSource([]);
  resultsLength = 0;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {}
  ngOnChanges(): void {
    this.resultsLength = this.data.length;
    this.dataSource = new MatTableDataSource(this.data)
  }

  ngAfterViewInit() {
   
  }
}