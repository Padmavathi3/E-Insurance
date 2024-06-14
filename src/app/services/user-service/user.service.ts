import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpService) { }

  adminRegistrationCall(body:object){
    return this.http.adminRegistrationApi(body)
  }
  agentRegistrationCall(body:object){
    return this.http.RegistrationApi(body,`/UserManagement/AgentRegistration`)
  }
  employeeRegistrationCall(body:object){
    return this.http.RegistrationApi(body,`/UserManagement/EmployeeRegistration`)
  }
  customerRegistrationCall(body:object){
    return this.http.RegistrationApi(body,`/UserManagement/CustomerRegistration`)
  }
  loginCall(email: string, password: string, role: string) {
    return this.http.loginApi(email, password, role);
  }
}
