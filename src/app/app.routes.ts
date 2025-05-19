import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DemandeurComponent } from './auth/demandeur/demandeur.component';
import { ProfileComponent } from './auth/demandeur/profile.component';
import { DraftsComponent } from './auth/demandeur/drafts.component';
import { ResponsableComponent } from './auth/responsable/responsable.component';
import { BcComponent } from './auth/BC/bc.component';
import { BcDraftsComponent } from './auth/BC/Bcdrafts/Bcdrafts.component';
import { CreateproComponent } from './auth/createpro/pro.component';
import { AddFournisseurComponent } from './auth/fournisseur/fournisseur.component';
import { LatestRequestsComponent } from './auth/request/request.component';
import { PurchasesComponent } from './auth/demandeur/purchase/purchase.component';
import { ProjectListComponent } from './auth/createpro/projectlist.component';
import { BcListComponent } from './auth/BC/bclist/bclist.component';
import { FournisseurListComponent } from './auth/fournisseur/fournisseurlist.component';
import { DemandeProjetComponent } from './auth/demande-projet/demande-projet.component';
import { DemandeProjetDraftsComponent } from './auth/demande-projet/demande-projet-drafts.component';
import { DemandeProjetListComponent } from './auth/demande-projet/demande-projet-list.component';
import { ResponsableProfileComponent } from './auth/responsable/responsable-profile.component';
import { DirecteurComponent } from './auth/directeur/directeur.component';
import { DirectorPurchaseRequestsComponent } from './auth/directeur/director-purchase-requests.component';
import { DirectorProjectRequestsComponent } from './auth/directeur/director-project-requests.component';
import { DirectorProjectsComponent } from './auth/directeur/director-projects.component';
import { DirectorSuppliersComponent } from './auth/directeur/director-suppliers.component';
import { DirectorProfileComponent } from './auth/directeur/director-profile.component';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  { 
    path: 'directeur',
    component: DirecteurComponent
  },
  {
    path: 'directeur/purchase-requests',
    component: DirectorPurchaseRequestsComponent
  },
  {
    path: 'directeur/project-requests',
    component: DirectorProjectRequestsComponent
  },
  {
    path: 'directeur/projects',
    component: DirectorProjectsComponent
  },
  {
    path: 'directeur/suppliers',
    component: DirectorSuppliersComponent
  },
  {
    path: 'directeur/profile',
    component: DirectorProfileComponent
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'register', 
    component: RegisterComponent 
  },
  { 
    path: 'responsable-profile', 
    component: ResponsableProfileComponent 
  },
  { 
    path: 'demandeur',
    component: DemandeurComponent
  },
  { 
    path: 'projectlist', 
    component: ProjectListComponent 
  },
  { 
    path: 'profile', 
    component: ProfileComponent
  },
  { 
    path: 'drafts', 
    component: DraftsComponent
  },
  { 
    path: 'bcdrafts', 
    component: BcDraftsComponent
  },
  {
    path: 'responsable',
    component: ResponsableComponent
  },
  { 
    path: 'create-bc', 
    component: BcComponent 
  },
  { 
    path: 'createpro', 
    component: CreateproComponent 
  },
  { 
    path: 'add-fournisseur', 
    component: AddFournisseurComponent 
  },
  { 
    path: 'latest-requests', 
    component: LatestRequestsComponent 
  },
  { 
    path: 'purchases', 
    component: PurchasesComponent 
  },
  { 
    path: 'bclist', 
    component: BcListComponent 
  },
  { 
    path: 'fournisseurlist', 
    component: FournisseurListComponent 
  },
  { 
    path: 'create-demande-projet', 
    component: DemandeProjetComponent 
  },
  { 
    path: 'demande-projet-drafts', 
    component: DemandeProjetDraftsComponent 
  },
  { 
    path: 'demande-projet-list', 
    component: DemandeProjetListComponent 
  },
  { 
    path: '', 
    redirectTo: '/directeur', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: '/directeur' 
  }
];