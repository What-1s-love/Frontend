import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemCardComponent } from '../item-card/item-card';
import { DataService } from '../shared/services/data';
import { Observable } from 'rxjs';
import { Article } from '../shared/models/article.model';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, ItemCardComponent, FormsModule],
  templateUrl: './items-list.html',
  styleUrls: ['./items-list.css']
})
export class ItemsListComponent implements OnInit { 

  public searchText: string = '';
  
  public articles$: Observable<Article[]> | undefined;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
  
    this.articles$ = this.dataService.getArticles();
  }

  public onSearchChange(): void {
    this.dataService.filterArticles(this.searchText);
  }

  public handleArticleSelect(article: Article): void {
    console.log('Обрано:', article.title);
  }
}