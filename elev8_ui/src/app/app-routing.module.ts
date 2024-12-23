import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductsComponent } from './admin/add-products/add-products.component';
import { CorouselComponent } from './corousel/corousel.component';

const routes: Routes = [{ path: '',component: CorouselComponent, pathMatch: 'full' },{ path: 'addprod', component:AddProductsComponent},{ path: '**', redirectTo: '/home' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
