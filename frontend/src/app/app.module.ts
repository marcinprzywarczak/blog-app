import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputNumberModule } from 'primeng/inputnumber';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './core/interceptors/http-request.interceptor';
import { CoreModule } from './core/core.module';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { httpAuthInterceptor } from './core/interceptors/auth.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InputNumberModule,
    HttpClientModule,
    CoreModule,
    ToastModule,
    FontAwesomeModule,
  ],
  providers: [httpInterceptorProviders, httpAuthInterceptor, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
