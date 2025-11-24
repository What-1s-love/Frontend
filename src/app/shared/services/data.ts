import { Injectable } from '@angular/core';
import { Article } from '../models/article.model';
import { BehaviorSubject, Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private allArticles: Article[] = [
    {
      id: 1,
      title: 'Вийшов Angular v20.2.1!',
      summary: 'Нова версія Angular CLI збігається з версією з Лабораторної 1 :)',
      imageUrl: 'https://placehold.co/300x150/963484/FFF?text=Angular',
      date: new Date('2025-11-10'), 
      category: 'Frameworks'
    },
    {
      id: 2,
      title: 'TypeScript 5.8: Що нового?',
      summary: 'Огляд ключових оновлень у новій версії мови.',
      imageUrl: 'https://placehold.co/300x150/3066BE/FFF?text=TypeScript',
      date: new Date('2025-09-09'),
      category: 'Languages'
    },
    {
      id: 3,
      title: 'Git: Основи роботи з гілками',
      summary: 'Як ефективно використовувати гілки для розробки.',
      imageUrl: 'https://placehold.co/300x150/F06543/FFF?text=Git',
      date: new Date('2025-09-08'),
      category: 'Tools'
    }
  ];

  private articlesSubject = new BehaviorSubject<Article[]>(this.allArticles);

  constructor() { }

  
  public getArticles(): Observable<Article[]> {
    return this.articlesSubject.asObservable();
  }


  public filterArticles(searchTerm: string): void {
   
    const filtered = this.allArticles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    
    this.articlesSubject.next(filtered);
  }
}