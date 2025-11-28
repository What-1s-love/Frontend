import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemCardComponent } from './item-card'; 
import { Article } from '../shared/models/article.model';
import { By } from '@angular/platform-browser';

describe('ItemCardComponent', () => {
  let component: ItemCardComponent;
  let fixture: ComponentFixture<ItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the article title', () => {
    const mockArticle: Article = {
      id: 1,
      title: 'Super Angular News',
      summary: 'Short summary',
      imageUrl: 'img.jpg',
      date: new Date(),
      category: 'IT'
    };

    component.article = mockArticle;

    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('h3')).nativeElement;

    expect(titleElement.textContent).toContain('Super Angular News');
  });
});