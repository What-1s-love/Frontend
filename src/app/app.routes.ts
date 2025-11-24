import { Routes } from '@angular/router';
import { ItemsListComponent } from './items-list/items-list';
import { ItemDetails } from './item-details/item-details';

export const routes: Routes = [

  { path: '', redirectTo: 'items', pathMatch: 'full' },
 
  { path: 'items', component: ItemsListComponent },
  
  { path: 'items/:id', component: ItemDetails }
];