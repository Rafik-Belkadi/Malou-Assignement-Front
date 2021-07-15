import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../product-item/product.interface';
import * as moment from 'moment'
import Pie from '../pie/pie.interface';
import { forkJoin, Observable } from 'rxjs';
import { Topic } from '../pie/topic.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products!: Product[];
  loading: boolean = false;
  maxDate: Date = new Date();
  dateSelected: Date = new Date();
  pieChartData!: Pie;
  error: boolean = false;

  constructor(private readonly productService: ProductsService) { }

  ngOnInit(): void {
    this.loading = true;
    this.error = false
    // Running all the API Calls simultaneously 
    forkJoin([this.getProducts(), this.getPieChartData()]).subscribe(vals => {
      this.products = vals[0]
      this.pieChartData = {
        data: vals[1].map(e => e.posts_count),
        labels: vals[1].map(e => e.name)
      }
      this.loading = false
    }, error => {
      this.loading = false;
      this.error = true;
      console.log(error)
    })
  }

  getProducts(): Observable<Product[]> {
    return this.productService.getProducts(moment(this.dateSelected).format('YYYY-MM-DD'))
  }

  onDateChanged(event: any): void {
    this.dateSelected = event.value
    this.error = false
    this.loading = true;
    this.productService.getProducts(moment(this.dateSelected).format('YYYY-MM-DD')).subscribe(products => {
      this.products = products;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.error = true;
      console.log(error)
    })
  }

  getPieChartData(): Observable<Topic[]> {
    return this.productService.getTopics()
  }
}
