import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TitleService } from 'src/app/core/title.service';
import { CompaniesService } from '../../companies/companies.service';
import { Company } from '../../companies/company.model';
import { User, UserRole } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss'],
})
export class ManageUserComponent implements OnInit {
  action!: string | undefined;
  userId!: string;
  userRoles = UserRole;
  companies: Company[] = [];

  userForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public route: ActivatedRoute,
    private titleService: TitleService,
    private usersService: UsersService,
    private companiesService: CompaniesService,
    private matSnackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      name: [``, Validators.required],
      email: [``, [Validators.required, Validators.email]],
      companyId: [``, Validators.required],
      role: [``, Validators.required],
    });
  }

  ngOnInit(): void {
    this.action = this.router.url.split(`/`).pop();
    this.route.data.subscribe(
      (data) => (this.titleService.title = data[`title`])
    );
    if (this.action == `update`) {
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.userId = params.get(`id`) ?? ``;
      });
      this.usersService.getUser(this.userId).subscribe({
        next: (user: User) => {
          this.userForm.patchValue(user);
        },
      });
    }
    this.companiesService
      .getCompanies()
      .subscribe((companies: Company[]) => (this.companies = companies));
  }

  upsertUser() {
    console.log(this.userForm.get(`companyId`)?.value);

    if (this.action == `add`) {
      this.usersService.addUser(this.userForm.value).subscribe({
        next: (res: string) => {
          this.matSnackBar.open(res, undefined, { duration: 500 });
          this.navigateToUserList();
        },
      });
    } else if (this.action == `update`) {
      this.usersService.updateUser(this.userId, this.userForm.value).subscribe({
        next: (res: string) => {
          this.matSnackBar.open(res, undefined, { duration: 500 });
          this.navigateToUserList();
        },
      });
    }
  }

  navigateToUserList() {
    this.router.navigate([`/manage/users`]);
  }
}
