import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  private baseUrl:string="https://localhost:7264/api"

  private authHeader = new HttpHeaders({
   
    Authorization: `Bearer ${localStorage.getItem('AuthToken')}`
  })

  constructor(private http:HttpClient) { }

  adminRegistrationApi(body:object):Observable<any>{
    return this.http.post(`${this.baseUrl}/UserManagement/AdminRegistration`,body)
  }
  agentRegistrationApi(body:object):Observable<any>{
    return this.http.post(`${this.baseUrl}/UserManagement/AgentRegistration`,body,{ headers: this.authHeader })
  }
  employeeRegistrationApi(body:object):Observable<any>{
    return this.http.post(`${this.baseUrl}/UserManagement/EmployeeRegistration`,body,{headers:this.authHeader})
  }
  customerRegistrationApi(body:object):Observable<any>{
    return this.http.post(`${this.baseUrl}/UserManagement/CustomerRegistration`,body,{headers:this.authHeader})
  }
  loginApi(email: string, password: string, role: string): Observable<any> {
    const url = `${this.baseUrl}/UserManagement/Login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&role=${encodeURIComponent(role)}`;
    return this.http.post(url, null);
  }
  //-----------------------------------------------------------
  policyCreationApi(body:object):Observable<any>
  {
    return this.http.post(`${this.baseUrl}/PolicyCreation/policy`,body)
  }
  getAllPoliciesApi():Observable<any>
  {
    return this.http.get(`${this.baseUrl}/PolicyCreation`)
  }
  //-------------------------------------------------------------
  customerDetailsApi(body:object):Observable<any>{
    return this.http.post(`${this.baseUrl}/PolicyPurchase/purchase`,body)
  }
  premiumCalculationApi(body:object):Observable<any>
  {
    return this.http.post(`${this.baseUrl}/PaymentProcess/calculate-premium`,body)
  }
  policyPurchaseApi():Observable<any>
  {
    return this.http.post(`${this.baseUrl}/PaymentProcess/finalize`,{})
  }
  getCustomerPoliciesApi():Observable<any>
  {
    return this.http.get(`${this.baseUrl}/PolicyPurchase`,{headers:this.authHeader})
  }
}
