import { Routes } from '@angular/router';
import { ItemsListComponent } from './items-list/items-list';
import { ItemDetails } from './item-details/item-details';
import { ItemFormComponent } from './item-form/item-form'; 

export const routes: Routes = [
  { path: '', redirectTo: 'items', pathMatch: 'full' },
  { path: 'items', component: ItemsListComponent },
  
  { path: 'items/create', component: ItemFormComponent },
  
  { path: 'items/:id', component: ItemDetails }
];