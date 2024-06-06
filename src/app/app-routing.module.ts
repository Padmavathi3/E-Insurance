import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { PoliciesComponent } from './components/policies/policies.component';
import { DefaultCustomerPageComponent } from './components/default-customer-page/default-customer-page.component';
import { PolicyPurchaseFormComponent } from './components/policy-purchase-form/policy-purchase-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: '', component: LoginComponent },
  {path:'dashboard/:userRole',component:DashboardComponent,children:[
     { path: '', component: DefaultCustomerPageComponent },
     {path:'policies',component:PoliciesComponent},
     {path: 'purchaseForm', component: PolicyPurchaseFormComponent }
]},
  // { path: 'adminDashboard/:userRole', component: AdmindashboardComponent },
  // { path: 'employeeDashboard/:userRole', component: EmployeedashboardComponent },
  // { path: 'agentDashboard/:userRole', component: AgentdashboardComponent },
  // {
  //   path: 'customerDashboard/:userRole', component: CustomerdashboardComponent, children: [
  //     { path: '', component: DefaultCustomerPageComponent },
  //     { 
  //       path: 'policies', component: PoliciesComponent
  //     },
  //     { path: 'purchaseForm', component: PolicyPurchaseFormComponent }
  //   ]
  // }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
