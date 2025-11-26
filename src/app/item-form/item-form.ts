import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../shared/services/data';
import { Article } from '../shared/models/article.model';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './item-form.html',
  styleUrls: ['./item-form.css']
})
export class ItemForm {

  public articleForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]), // Короткий опис
    fullText: new FormControl('', [Validators.required, Validators.minLength(50)]) // <-- НОВЕ ПОЛЕ: Повний текст
  });

  constructor(
    private dataService: DataService,
    private router: Router
  ) {}

  get titleControl() { return this.articleForm.get('title'); }
  get descriptionControl() { return this.articleForm.get('description'); }
  get fullTextControl() { return this.articleForm.get('fullText'); } 

  public onSubmit(): void {
    if (this.articleForm.valid) {
      const formValue = this.articleForm.value;

      const newArticle: Article = {
        id: Math.floor(Math.random() * 10000),
        title: formValue.title ?? '',
        summary: formValue.description ?? '', 
        fullText: formValue.fullText ?? '',   
        imageUrl: 'https://placehold.co/300x150/4CAF50/FFF?text=New+Item',
        date: new Date(),
        category: 'Custom'
      };

      this.dataService.addArticle(newArticle);
      this.router.navigate(['/items']);
    } else {
      this.articleForm.markAllAsTouched();
    }
  }
}