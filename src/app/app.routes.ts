import { Routes } from '@angular/router';
import { ItemsListComponent } from './items-list/items-list';
import { ItemDetails } from './item-details/item-details';
import { ItemForm } from './item-form/item-form';

export const routes: Routes = [

  { path: '', redirectTo: 'items', pathMatch: 'full' },
 
  { path: 'items', component: ItemsListComponent },
  { path: 'items/create', component: ItemForm },
  { path: 'items/:id', component: ItemDetails }
];