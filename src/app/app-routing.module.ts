import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/common-dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { EmployeedashboardComponent } from './components/employeedashboard/employeedashboard.component';
import { AgentdashboardComponent } from './components/agentdashboard/agentdashboard.component';
import { CustomerdashboardComponent } from './components/customerdashboard/customerdashboard.component';

const routes: Routes = [
  {path:'signup',component:SignupComponent},
  {path:'',component:LoginComponent},
  {path:'admin',component:AdmindashboardComponent},
  {path:'employee',component:EmployeedashboardComponent},
  {path:'agent',component:AgentdashboardComponent},
  {path:'customer',component:CustomerdashboardComponent
    // [{path:'header',component:HeaderComponent}]
  }
  // {path:'',component:DashboardComponent,children:[
  //   {path:'header',component:HeaderComponent}
  // ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
