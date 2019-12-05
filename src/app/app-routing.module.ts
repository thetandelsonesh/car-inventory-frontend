import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { ModelComponent } from './model/model.component';
import { InventoryComponent } from './inventory/inventory.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'manufacturer', component: ManufacturerComponent},
  {path: 'model', component: ModelComponent},
  {path: 'inventory', component: InventoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
