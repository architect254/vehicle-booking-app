import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Company } from './company.model';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  endpoint: string = `companies`;
  url: string = environment.apiUrl + `/${this.endpoint}`;
  constructor(private http: HttpClient) {}

  addCompany(company: Company) {
    return this.http.post(this.url, company, { responseType: 'text' as const });
  }

  getCompany(id: string): Observable<Company> {
    return this.http.get<Company>(`${this.url}/${id}`);
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.url);
  }

  updateCompany(id: string, company: Company) {
    return this.http.put(`${this.url}/${id}`, company, {
      responseType: 'text' as const,
    });
  }

  deleteCompany(id: string) {
    return this.http.delete(`${this.url}/${id}`, {
      responseType: 'text' as const,
    });
  }
}
