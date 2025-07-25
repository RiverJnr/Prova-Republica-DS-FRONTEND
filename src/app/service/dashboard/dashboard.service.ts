import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../enviroments/enviroment";
import { DashboardDTO } from "../../model/dashboard.model";

@Injectable({ providedIn: 'root' })
export class DashboardService {
    private readonly api = `${environment.apiUrl}/dashboard`;

    constructor(private http: HttpClient) { }

    obterDashboard(inicio: string, fim: string): Observable<DashboardDTO> {
        return this.http.get<DashboardDTO>(`${this.api}?inicio=${inicio}&fim=${fim}`);
    }
}