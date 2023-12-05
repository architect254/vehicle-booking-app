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
  columns = [{key:`firstname`, name: `First Name`, value: (row: any) => `${row.firstname}`,}]

  isLoading: boolean = false;
  UserRole: typeof UserRole = UserRole;

  constructor(private usersService: UsersService){

  }


  ngOnInit(): void {
    this.fetchNext({page:0,pageSize:0});
  }

  fetchNext(paginate: any){
    this.isLoading = true
    this.usersService.fetchUsers(paginate).subscribe((users: User[])=>{
      this.isLoading = false
      this.users = users
    });
  }
}
