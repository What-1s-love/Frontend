import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router'; // Для читання URL
import { Article } from '../shared/models/article.model';
import { DataService } from '../shared/services/data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './item-details.html',
  styleUrls: ['./item-details.css']
})
export class ItemDetails implements OnInit {

  article?: Article;

  constructor(
    private route: ActivatedRoute, 
    private dataService: DataService 
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.article = this.dataService.getArticleById(id);
    }
  }
}