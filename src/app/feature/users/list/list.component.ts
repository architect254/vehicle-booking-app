import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/misc/models/user.model';
import { UserRole } from 'src/app/misc/models/user-role.enum';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  users: User[] = [];
  columns = [{key:`firstname`, header: `First Name`, cell: (row: any) => `${row.firstname}`,},
  {key:`lastname`, header: `Last Name`, cell: (row: any) => `${row.lastname}`,},{key:`role`, header: `Role`, cell: (row: any) => `${row.role}`,},{key:`phone_number`, header: `Phone Number`, cell: (row: any) => `${row.phone_number}`,}
]

  isLoading: boolean = false;
  UserRole: typeof UserRole = UserRole;

  constructor(private usersService: UsersService){

  }


  ngOnInit(): void {
    this.fetchNext({page:1, pageSize: 10})
  }

  fetchNext(paginate: any){
    this.isLoading = true
    this.usersService.fetchUsers(paginate).subscribe((users: User[])=>{
      this.isLoading = false
      this.users = users
    });
  }
}
