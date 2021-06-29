import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpAuthInterceptor } from './services/http-auth.interceptor';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { AppComponent } from './views/app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';
import { HttpLoaderInterceptor } from './services/http-loader.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    LoaderComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpLoaderInterceptor, multi: true
    }
  ],
  exports: [
    AppComponent
  ]
})
export class CoreModule { }
