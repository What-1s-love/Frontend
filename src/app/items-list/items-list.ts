import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs'; 
import { ItemCardComponent } from '../item-card/item-card';
import { Article } from '../shared/models/article.model';
import { DataService } from '../shared/services/data';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, ItemCardComponent, FormsModule, RouterLink],
  templateUrl: './items-list.html',
  styleUrls: ['./items-list.css']
})
export class ItemsListComponent implements OnInit {

  public searchText: string = '';
  public articles$!: Observable<Article[]>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Отримуємо потік даних від сервісу
    this.articles$ = this.dataService.getArticles();
  }

  public onSearchChange(): void {
  this.dataService.filterArticles(this.searchText);
  }
}