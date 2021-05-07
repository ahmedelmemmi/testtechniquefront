import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ArticlesComponent } from './articles/articles.component';
import { AddArticleComponent } from './articles/add-article/add-article.component';
import { ListArticlesComponent } from './articles/list-articles/list-articles.component';
import { ProfilComponent } from './profil/profil.component';
import { AccueilComponent } from './accueil/accueil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticlesService } from './Services/ArticleService';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { JwtInterceptor } from './jwt/jwt.interceptor';
import { ErrorInterceptor } from './jwt/error.interceptor';
import {NoCacheHeadersInterceptor} from './jwt/HttpInterceptor.interceptor';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ArticlesComponent,
    AddArticleComponent,
    ListArticlesComponent,
    ProfilComponent,
    AccueilComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return '';
        }
      }
    }),
  ],
  providers: [
    ArticlesService,
    JwtHelperService,
    {provide:HTTP_INTERCEPTORS , useClass : JwtInterceptor, multi:true},
    {provide:HTTP_INTERCEPTORS , useClass : ErrorInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: NoCacheHeadersInterceptor,multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
