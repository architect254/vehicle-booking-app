import {HttpClient} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit, Input, EventEmitter, Output, OnChanges} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule, SortDirection} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DatePipe} from '@angular/common';
import { environment } from 'src/environments/environment';
import { UserRole } from 'src/app/misc/models/user-role.enum';
import { Router } from '@angular/router';

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-grid',
  styleUrls: ['grid.component.scss'],
  templateUrl: 'grid.component.html',
})
export class GridComponent implements OnChanges {
  @Input() columns: any[] = [];
  @Input() data: any[] = [];
  @Input() dataType: string = ``;
  @Input() isLoadingResults = true;

  @Output() fetchNext = new EventEmitter<any>();

  displayedColumns: string[] = []
  readonly UserRole: typeof UserRole = UserRole;

  resultsLength = 0;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _httpClient: HttpClient, private router:Router) {}

  ngOnChanges(){
    this.displayedColumns = this.columns.map(column => column.key);
    this.resultsLength = this.data.length;
  }

  selectRecord(row:any){
    window.open(this.router.createUrlTree([`users`,row.id]).toString(), "_blank", "resizable=no, toolbar=no, scrollbars=no, menubar=no, status=no, directories=no, location=no, width=1000, height=600, left=" + 100 + " top=100 " )
  }
 
}
