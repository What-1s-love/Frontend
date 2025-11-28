import { TestBed } from '@angular/core/testing';
import { DataService } from './data';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Article } from '../models/article.model';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        // Новий синтаксис для тестів HTTP в Angular 15+
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Перевіряємо, що немає незакритих запитів
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve articles from the API via GET', () => {
    const dummyArticles: Article[] = [
      { id: 1, title: 'Test 1', summary: 'S1', imageUrl: '', date: new Date(), category: 'Tech' },
      { id: 2, title: 'Test 2', summary: 'S2', imageUrl: '', date: new Date(), category: 'Bio' }
    ];

    // Підписуємося на метод
    service.getArticles().subscribe(articles => {
      // Перевіряємо, чи дані прийшли (спочатку приходить пустий масив з BehaviorSubject, потім дані)
      if (articles.length > 0) {
        expect(articles.length).toBe(2);
        expect(articles).toEqual(dummyArticles);
      }
    });

    // Очікуємо, що був зроблений запит на цю URL
    // (Зверни увагу: сервіс додає base url через інтерцептор, але в юніт-тесті інтерцептора може не бути, 
    // тому тут ми очікуємо "чистий" запит або той, що формує сервіс. 
    // Оскільки ми тестуємо DataService ізольовано, він викликає http.get('articles'))
    const req = httpMock.expectOne('articles'); 
    
    expect(req.request.method).toBe('GET');
    
    // "Зливаємо" тестові дані у відповідь
    req.flush(dummyArticles);
  });
});