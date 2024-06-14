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
import { CustomerPaymentsComponent } from './components/customer-payments/customer-payments.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { AllCustomerPoliciesComponent } from './components/all-customer-policies/all-customer-policies.component';
import { AgentSoldPoliciesComponent } from './components/agent-sold-policies/agent-sold-policies.component';
import { CommissionFormComponent } from './components/commission-form/commission-form.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup/:userRole', component: SignupComponent },
  { path: 'dashboard/:userRole', component: DashboardComponent, children: [
    { path: '', component: DefaultCustomerPageComponent },
    { path: 'policies', component: PoliciesComponent },
    { path: 'purchaseForm', component: PolicyPurchaseFormComponent },
    { path: 'addPolicy', component: PolicyCreationComponent },
    { path: 'premium', component: PremiumFormComponent },
    {path:'customerPolicies',component:CustomerPoliciesComponent},
    {path:'customerPayments',component:CustomerPaymentsComponent},
    { path: 'receipt', component: ReceiptComponent },  // Updated route with parameter
    {path:'allCustomerPolicies',component:AllCustomerPoliciesComponent},
    {path:'soldPolicies',component:AgentSoldPoliciesComponent},
    {path:'commision',component:CommissionFormComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
