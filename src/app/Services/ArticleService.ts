import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Article} from '../models/Article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  API_URI = 'https://test-technique-memmi.herokuapp.com:3000/posts';

  constructor(private http: HttpClient) { }

  getArticles() {
    return this.http.get(`${this.API_URI}/post/getAll/`);
  }

  getArticle(id: string) {
    return this.http.get(`${this.API_URI}/post/${id}`);
  }

  deleteArticle(id: string) {
    return this.http.delete(`${this.API_URI}/post/${id}`);
  }

  saveArticle(article: Article) {
    return this.http.post(`${this.API_URI}/post/create`, article);
  }

  updateArticle(id: string|number, updatedArticle: Article): Observable<Article> {
    return this.http.put(`${this.API_URI}/posts/${id}`, updatedArticle);
  }

}