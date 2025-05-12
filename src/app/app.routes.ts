import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DemandeurComponent } from './auth/demandeur/demandeur.component';
import { ProfileComponent } from './auth/demandeur/profile.component';
import { DraftsComponent } from './auth/demandeur/drafts.component';
import { ResponsableComponent } from './auth/responsable/responsable.component';
import { BcComponent } from './auth/BC/bc.component';
import { BcDraftsComponent } from './auth/BC/Bcdrafts/Bcdrafts.component';
import {  CreateproComponent } from './auth/createpro/pro.component';
import {  AddFournisseurComponent } from './auth/fournisseur/fournisseur.component';
import { LatestRequestsComponent } from './auth/request/request.component';
export const routes: Routes = [
  { 
    path: 'demandeur',
    component: DemandeurComponent,
  },
  { 
    path: 'profile', 
    component: ProfileComponent,
  },
  { 
    path: 'drafts', 
    component: DraftsComponent,
  },
  { 
    path: 'bcdrafts', 
    component: BcDraftsComponent,
  },
  {
    path: 'responsable',
    component: ResponsableComponent,
  },
  { path: 'create-bc', component: BcComponent 
  
  },
  { path: 'createpro', component: CreateproComponent 

  },

  { path: 'add-fournisseur', component: AddFournisseurComponent 

  },

  { path: 'latest-requests', component: LatestRequestsComponent 
},
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }

];