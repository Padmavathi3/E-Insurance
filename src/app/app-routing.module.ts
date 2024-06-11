import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PoliciesComponent } from './components/policies/policies.component';
import { DefaultCustomerPageComponent } from './components/default-customer-page/default-customer-page.component';
import { PolicyPurchaseFormComponent } from './components/policy-purchase-form/policy-purchase-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PolicyCreationComponent } from './components/policy-creation/policy-creation.component';
import { PremiumFormComponent } from './components/premium-form/premium-form.component';
import { CustomerPoliciesComponent } from './components/customer-policies/customer-policies.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup/:userRole', component: SignupComponent },
  { path: 'dashboard/:userRole', component: DashboardComponent, children: [
    { path: '', component: DefaultCustomerPageComponent },
    { path: 'policies', component: PoliciesComponent },
    { path: 'purchaseForm', component: PolicyPurchaseFormComponent },
    { path: 'addPolicy', component: PolicyCreationComponent },
    { path: 'premium', component: PremiumFormComponent },
    {path:'customerPolicies',component:CustomerPoliciesComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
