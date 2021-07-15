import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from '../components/product-item/product.interface';
import { Topic } from '../components/pie/topic.interface';

const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json', 'Authorization': 'bearer ' + environment.apiToken })
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private readonly http: HttpClient) { }

  getProducts(date: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/posts/${date}`, httpOptions)
  }

  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${environment.apiUrl}/topics`, httpOptions)
  }
}
