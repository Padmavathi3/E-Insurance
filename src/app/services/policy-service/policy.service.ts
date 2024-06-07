import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { BehaviorSubject } from 'rxjs';
import { PolicyObj } from 'src/assets/policyInterface';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  private policiesList:PolicyObj[]=[];

  private policyObj=new BehaviorSubject<PolicyObj[]>([]);
  AllPoliciesList= this.policyObj.asObservable();

  constructor(private http:HttpService) { }


  //--------------------------------------------------------
  getAllPolicies(policy: PolicyObj[]) {
    this.policyObj.next(policy);
  }


 //-----------------------------------------------------------
  //api calls
  addPolicyCall(body:object)
  {
    return this.http.policyCreationApi(body);
  }
  getAllPoliciesCall()
  {
    return this.http.getAllPoliciesApi();
  }
}
