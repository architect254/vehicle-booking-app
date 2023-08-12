import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleService } from 'src/app/core/title.service';
import { DeleteConfirmModalComponent } from 'src/app/feature/delete-confirm-modal/delete-confirm-modal.component';

export interface VehicleData {
  id: string;
  plate: string;
  capacity: number;
  fromLocation: string;
  toLocation: string;
  travelDate: Date;
}

/** Constants used to fill up our data base. */
const LOCATIONS: string[] = [
  'Mombasa',
  'Mariakani',
  'Jomvu',
  'Samburu',
  'Mikindani',
  'Voi',
  'Dembwa',
  'Msau',
];
const PLATES: string[] = [
  'KCB 100X',
  'ABC 200V',
  'XYZ 123L',
  'GHT 712D',
  'LOP 900D',
  'KDJ 721T',
  'UIO 890N',
  'WER 879Y',
  'LOP 498B',
  'LMN 089P',
  'MKL 783E',
  'UYT 009S',
  'SDF 381F',
  'FVB 418R',
  'WAS 934V',
  'DFE 987H',
  'FGD 797M',
  'THC 231U',
  'ASE 743I',
];
@Component({
  selector: 'app-manage-vehicles',
  templateUrl: './manage-vehicles.component.html',
  styleUrls: ['./manage-vehicles.component.scss'],
})
export class ManageVehiclesComponent implements OnInit {
  displayedColumns: string[] = [
    'plate',
    'capacity',
    'fromLocation',
    'toLocation',
    'travelDate',
    'actions',
  ];
  dataSource: MatTableDataSource<VehicleData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: TitleService,
    private dialog: MatDialog
  ) {
    // Create 100 users
    const users = Array.from({ length: 100 }, (_, k) => createNewVehicle(+1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(): void {
    this.titleService.title = `View All Vehicles`;
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
  deleteVehicle({ plate, id }: any): void {
    const dialogRef = this.dialog.open(DeleteConfirmModalComponent, {
      data: { name: plate, id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  navigateToAddVehicle() {
    this.router.navigate([`../add`], { relativeTo: this.route });
  }
  navigateToEditVehicle(id: string) {
    this.router.navigate([`../`, id, `update`], { relativeTo: this.route });
  }
}

/** Builds and returns a new matatus. */
function createNewVehicle(id: number): VehicleData {
  const plate = PLATES[Math.round(Math.random() * (PLATES.length - 1))];
  return {
    id: Math.floor(Math.random() * 10).toString(),
    plate: plate,
    capacity: 17,
    fromLocation: LOCATIONS[Math.round(Math.random() * (LOCATIONS.length - 1))],
    toLocation: LOCATIONS[Math.round(Math.random() * (LOCATIONS.length - 1))],
    travelDate: new Date(),
  };
}
