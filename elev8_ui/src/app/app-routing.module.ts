import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductsComponent } from './admin/add-products/add-products.component';
import { CorouselComponent } from './corousel/corousel.component';
import { ViewCigarsComponent } from './view-cigars/view-cigars.component';
import { ViewCigarComponent } from './view-cigars/view-cigar/view-cigar.component';
import { BodyComponent } from './body/body.component';

const routes: Routes = [
  { path: '', component: BodyComponent, pathMatch: 'full' }, // Default route
  { path: 'admin/addprod', component: AddProductsComponent },
  { path: 'cigar/:id', component: ViewCigarComponent }, // Dynamic route for cigar details
  { path: 'viewcigars', component: ViewCigarsComponent },
  { path: 'home', redirectTo: 'viewcigars', pathMatch: 'full' }, // Redirect 'home' to 'viewcigars'
  { path: '**', redirectTo: 'viewcigars' }, // Catch-all route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
