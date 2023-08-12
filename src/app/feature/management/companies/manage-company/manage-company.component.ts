import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TitleService } from 'src/app/core/title.service';
import { CompaniesService } from '../companies.service';
import { Company } from '../company.model';

@Component({
  selector: 'app-manage-company',
  templateUrl: './manage-company.component.html',
  styleUrls: ['./manage-company.component.scss'],
})
export class ManageCompanyComponent implements OnInit {
  action!: string | undefined;
  companyId!: string;
  companyForm: FormGroup = this.fb.group({
    name: [``, Validators.required],
    email: [``, [Validators.required, Validators.email]],
    phoneNumber: [``, Validators.required],
    POBox: [``, Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public route: ActivatedRoute,
    private titleService: TitleService,
    private snackBar: MatSnackBar,
    private companiesService: CompaniesService
  ) {}

  ngOnInit(): void {
    this.action = this.router.url.split(`/`).pop();
    this.route.data.subscribe(
      (data) => (this.titleService.title = data[`title`])
    );
    if (this.action == `update`) {
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.companyId = params.get(`id`) ?? ``;
      });
      this.companiesService.getCompany(this.companyId).subscribe({
        next: (company: Company) => {
          this.companyForm.patchValue(company);
        },
      });
    }
  }

  upsertCompany() {
    if (this.action == `add`) {
      this.companiesService
        .addCompany(this.companyForm.value as Company)
        .subscribe((res: string) => {
          this.snackBar.open(res, undefined, { duration: 500 });
          this.navigateToCompanyList();
        });
    } else if (this.action == `update`) {
      this.companiesService
        .updateCompany(this.companyId, this.companyForm.value as Company)
        .subscribe((res: string) => {
          this.snackBar.open(res, undefined, { duration: 500 });
          this.navigateToCompanyList();
        });
    }
  }

  navigateToCompanyList() {
    this.router.navigate([`/manage/companies`], {
      relativeTo: this.route,
    });
  }
}
