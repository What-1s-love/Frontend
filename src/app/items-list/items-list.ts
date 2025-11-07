import { Component } from '@angular/core';
import { Article } from '../shared/models/article.model';
import { CommonModule } from '@angular/common'; 
import { ItemCardComponent } from '../item-card/item-card'; 

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, ItemCardComponent], // <--- ОСЬ ВИПРАВЛЕННЯ
  templateUrl: './items-list.html',
  styleUrls: ['./items-list.css']
})
export class ItemsListComponent {

  // 2. СТВОРЕННЯ МАСИВУ
  articles: Article[] = [
    {
      id: 1,
      title: 'Вийшов Angular v20.2.1!',
      summary: 'Нова версія Angular CLI збігається з версією з Лабораторної 1 :)',
      imageUrl: 'https://placehold.co/300x150/963484/FFF?text=Angular', // Тимчасове зображення
      date: new Date('2025-09-10'),
      category: 'Frameworks',
      isNew: true
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

  constructor() { }

}