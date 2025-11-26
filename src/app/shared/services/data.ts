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
      category: 'Frameworks',
      fullText: 'Angular v20.2.1 приносить значні покращення продуктивності та оновлені інструменти розробки. Команда зосередилась на покращенні гідратації та зменшенні розміру бандлів. Тепер розробляти великі корпоративні додатки стало ще легше завдяки новим сигналам та покращеному Change Detection.'
    },
    {
      id: 2,
      title: 'TypeScript 5.8: Що нового?',
      summary: 'Огляд ключових оновлень у новій версії мови.',
      imageUrl: 'https://placehold.co/300x150/3066BE/FFF?text=TypeScript',
      date: new Date('2025-09-09'),
      category: 'Languages',
      fullText: 'TypeScript 5.8 вводить нові можливості для роботи з декораторами та покращує виведення типів. Розробники отримають більше контролю над типізацією в складних сценаріях. Також було оптимізовано швидкість компіляції великих проєктів.'
    },
    {
      id: 3,
      title: 'Git: Основи роботи з гілками',
      summary: 'Як ефективно використовувати гілки для розробки.',
      imageUrl: 'https://placehold.co/300x150/F06543/FFF?text=Git',
      date: new Date('2025-09-08'),
      category: 'Tools',
      fullText: 'Робота з гілками (branching) — це основа Git flow. У цій статті ми розглянемо, як створювати гілки, перемикатися між ними та вирішувати конфлікти злиття (merge conflicts). Ви дізнаєтесь про команди git checkout, git merge та git rebase.'
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

  public getArticleById(id: number): Article | undefined {
    return this.allArticles.find(article => article.id === id);
  }

  public addArticle(newArticle: Article): void {
    this.allArticles.push(newArticle);
    
    this.articlesSubject.next(this.allArticles);
  }
}