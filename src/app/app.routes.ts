import { Routes } from '@angular/router';
import { ItemsListComponent } from './items-list/items-list';
import { ItemDetails } from './item-details/item-details';
import { ItemFormComponent } from './item-form/item-form'; 
import { LoginComponent } from './login/login';
import { authGuard } from './shared/guards/auth-guard';
import { RegisterComponent } from './register/register';


export const routes: Routes = [
  { path: '', redirectTo: 'items', pathMatch: 'full' },
  { path: 'items', component: ItemsListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'items/create', component: ItemFormComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'items/:id', component: ItemDetails }
];