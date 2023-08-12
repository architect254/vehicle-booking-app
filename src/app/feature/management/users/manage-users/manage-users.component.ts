import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleService } from 'src/app/core/title.service';
import { DeleteConfirmModalComponent } from 'src/app/feature/delete-confirm-modal/delete-confirm-modal.component';
import { User } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = [
    'name',
    'email',
    'vehicleOwner',
    `role`,
    `createdBy`,
    `updatedBy`,
    `updatedAt`,
    'actions',
  ];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: TitleService,
    private dialog: MatDialog,
    private usersService: UsersService,
    private matSnackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.titleService.title = data[`title`];
      console.log(data);
    });
    this.fetchUsers();
  }

  private fetchUsers() {
    this.usersService.getUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
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
  deleteUser({ name, id }: any): void {
    const dialogRef = this.dialog.open(DeleteConfirmModalComponent, {
      data: { name, id },
      width: `400px`,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.usersService.deleteUser(id).subscribe({
          next: (res: string) => {
            this.matSnackBar.open(res);
            this.fetchUsers();
          },
        });
      }
    });
  }
  navigateToAddUser() {
    this.router.navigate([`../add`], { relativeTo: this.route });
  }
  navigateToEditUser(id: string) {
    this.router.navigate([`../`, id, `update`], { relativeTo: this.route });
  }
}
