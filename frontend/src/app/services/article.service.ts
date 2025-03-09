import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {
  private apiURL = `${environment.API_KEY}/articles`;

  constructor(private http: HttpClient) { }

  getArticles() : Observable<any>{
    return this.http.get(this.apiURL);
  }

  addArticle(article: any) : Observable<any>{
    return this.http.post(this.apiURL,article);
  }

  updateArticle(id:string , article:any) : Observable<any>{
    return this.http.put(`${this.apiURL}/${id}`,article);
  }

  deleteArticle(id:string) : Observable<any>{
    return this.http.delete(`${this.apiURL}/${id}`);
  }
  
}
