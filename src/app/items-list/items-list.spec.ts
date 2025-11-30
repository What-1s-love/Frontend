import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsListComponent } from './items-list';
import { DataService } from '../shared/services/data';
import { of } from 'rxjs';
import { Article } from '../shared/models/article.model';
import { ItemCardComponent } from '../item-card/item-card'; 
import { provideHttpClient } from '@angular/common/http';

describe('ItemsListComponent', () => {
  let component: ItemsListComponent;
  let fixture: ComponentFixture<ItemsListComponent>;
  let mockDataService: any;

  // Тестові дані
  const MOCK_ARTICLES: Article[] = [
    { id: 1, title: 'Art 1', summary: 'Sum 1', imageUrl: '', date: new Date(), category: 'A' },
    { id: 2, title: 'Art 2', summary: 'Sum 2', imageUrl: '', date: new Date(), category: 'B' }
  ];

  beforeEach(async () => {
    mockDataService = jasmine.createSpyObj(['getArticles', 'filterArticles']);
    mockDataService.getArticles.and.returnValue(of(MOCK_ARTICLES));

    await TestBed.configureTestingModule({
      imports: [ItemsListComponent, ItemCardComponent],
      providers: [
        { provide: DataService, useValue: mockDataService }, 
        provideHttpClient()
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 2 article cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('app-item-card');
    expect(cards.length).toBe(2);
  });
});