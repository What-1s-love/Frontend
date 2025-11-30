import { Injectable, inject } from '@angular/core';
import { Article } from '../models/article.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);
  private articlesSubject = new BehaviorSubject<Article[]>([]);

  constructor() {
    this.loadArticles();
  }

  private loadArticles(): void {
    this.http.get<Article[]>('blablabla').pipe(
      tap(articles => this.articlesSubject.next(articles)),
      catchError(error => {
        return of([]); 
      })
    ).subscribe();
  }

  public getArticles(): Observable<Article[]> {
    return this.articlesSubject.asObservable();
  }

  public filterArticles(searchTerm: string): void {
    if (!searchTerm) {
      this.loadArticles();
      return;
    }
    const filtered = this.articlesSubject.value.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.articlesSubject.next(filtered);
  }

  public getArticleById(id: number | string): Article | undefined {
    return this.articlesSubject.value.find(article => article.id == id);
  }

  public addArticle(rawArticle: Omit<Article, 'id' | 'date'>): void {
    const newArticle = {
      ...rawArticle,
      date: new Date() 
    };

    this.http.post<Article>('articles', newArticle).pipe(
      tap(() => this.loadArticles()),
      catchError(error => {
        return of(null);
      })
    ).subscribe();
  }
}