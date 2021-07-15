import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductsService } from './products.service';
import { environment } from 'src/environments/environment';

describe('ProductsService', () => {
  let injector: TestBed;
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]
    });
    injector = getTestBed();
    service = TestBed.inject(ProductsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should return an Observable<Product[]>', () => {
    service.getProducts("2021-01-01").subscribe(products => {
      expect(products).toBeInstanceOf(Array);
      expect(products.length).toBeGreaterThan(0);
    })
    const req = httpMock.expectOne(`${environment.apiUrl}/posts/2021-01-01`);
    expect(req.request.method).toBe("GET");
  })

  it('Should return an Observable<Topic[]>', () => {
    service.getTopics().subscribe(topics => {
      expect(topics).toBeInstanceOf(Array);
      expect(topics.length).toBeGreaterThan(0);
    })
    const req = httpMock.expectOne(`${environment.apiUrl}/topics`);
    expect(req.request.method).toBe("GET");
  })
});
