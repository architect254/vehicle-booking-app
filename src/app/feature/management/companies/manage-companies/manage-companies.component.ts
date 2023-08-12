import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleService } from 'src/app/core/title.service';
import { DeleteConfirmModalComponent } from 'src/app/feature/delete-confirm-modal/delete-confirm-modal.component';
import { Company } from '../company.model';
import { CompaniesService } from '../companies.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-companies',
  templateUrl: './manage-companies.component.html',
  styleUrls: ['./manage-companies.component.scss'],
})
export class ManageCompaniesComponent implements OnInit {
  companies: Company[] = [];
  displayedColumns: string[] = [
    'name',
    'email',
    'phoneNumber',
    'POBox',
    'actions',
  ];
  dataSource: MatTableDataSource<Company>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: TitleService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private companiesService: CompaniesService
  ) {
    this.dataSource = new MatTableDataSource(this.companies);
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data) => (this.titleService.title = data[`title`])
    );
    this.fetchCompanies();
  }

  private fetchCompanies() {
    this.companiesService.getCompanies().subscribe({
      next: (companies: Company[]) => {
        this.companies = companies;
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteCompany({ name, id }: any): void {
    const dialogRef = this.dialog.open(DeleteConfirmModalComponent, {
      data: { name, id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.companiesService.deleteCompany(id).subscribe({
          next: (res: string) => {
            this.snackBar.open(res, undefined, { duration: 500 });
            this.fetchCompanies();
          },
        });
      }
    });
  }
  navigateToAddCompany() {
    this.router.navigate([`../add`], { relativeTo: this.route });
  }
  navigateToEditCompany(id: string) {
    this.router.navigate([`../`, id, `update`], { relativeTo: this.route });
  }
  navigateToViewCompany(id: string) {
    this.router.navigate([`../`, id, `view`], { relativeTo: this.route });
  }
}
