import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { CorouselComponent } from './corousel/corousel.component';
import { SingleCigarComponent } from './single-cigar/single-cigar.component';
import { DashboardCigarsComponent } from './dashboard-cigars/dashboard-cigars.component';
import { AdminComponent } from './admin/admin.component';
import { AddProductsComponent } from './admin/add-products/add-products.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    CorouselComponent,
    SingleCigarComponent,
    DashboardCigarsComponent,
    AdminComponent,
    AddProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
