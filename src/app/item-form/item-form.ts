import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../shared/services/data';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './item-form.html',
  styleUrls: ['./item-form.css']
})
export class ItemFormComponent {

  public articleForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    fullText: new FormControl('', [Validators.required, Validators.minLength(50)]),
    imageUrl: new FormControl('', [Validators.required]),
    category: new FormControl('Custom', [Validators.required])
  });

  constructor(
    private dataService: DataService,
    private router: Router
  ) {}

  get titleControl() { return this.articleForm.get('title'); }
  get descriptionControl() { return this.articleForm.get('description'); }
  get fullTextControl() { return this.articleForm.get('fullText'); }
  get imageControl() { return this.articleForm.get('imageUrl'); }
  get categoryControl() { return this.articleForm.get('category'); }

  public onSubmit(): void {
    if (this.articleForm.valid) {
      const formValue = this.articleForm.value;

     
      const articleData = {
        title: formValue.title ?? '',
        summary: formValue.description ?? '', 
        fullText: formValue.fullText ?? '',
        imageUrl: formValue.imageUrl ?? '',
        category: formValue.category ?? 'Custom'
      };

      this.dataService.addArticle(articleData);

      this.router.navigate(['/items']);
    } else {
      this.articleForm.markAllAsTouched();
    }
  }
}