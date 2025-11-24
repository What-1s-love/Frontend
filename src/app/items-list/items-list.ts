import { Component, OnInit, OnDestroy } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemCardComponent } from '../item-card/item-card';
import { Article } from '../shared/models/article.model';
import { DataService } from '../shared/services/data';
import { Subscription } from 'rxjs'; 

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, ItemCardComponent, FormsModule],
  templateUrl: './items-list.html',
  styleUrls: ['./items-list.css']
})
export class ItemsListComponent implements OnInit, OnDestroy { 

  public searchText: string = '';
  public articles: Article[] = []; 
  private subscription: Subscription = new Subscription(); 

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    
    this.subscription = this.dataService.getArticles().subscribe(data => {
      this.articles = data;
    });
  }

 
  public onSearchChange(): void {
    
    this.dataService.filterArticles(this.searchText);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public handleArticleSelect(article: Article): void {
    console.log('Обрано статтю:', article.title);
  }
}