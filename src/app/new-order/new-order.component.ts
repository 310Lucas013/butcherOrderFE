import {Component, OnInit, ViewChild} from '@angular/core';
import {MatCalendar} from '@angular/material/datepicker';
import {Router} from '@angular/router';
import {ProductCategory} from '../shared/formData/ProductCategory';
import {Product} from '../shared/model/product';
import {OrderProduct} from '../shared/model/order-product';
import {ShoppingProduct} from '../shared/formData/shopping-product';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  currentPage: number;
  lastPage: number;

  @ViewChild('calendar') calendar: MatCalendar<Date>;

  selectedDate: Date;

  selectedProducts: ShoppingProduct[];

  productCategories: ProductCategory[];

  constructor(private router: Router) {
    this.selectedDate = new Date();
    this.currentPage = 0;
    this.lastPage = 1;
    this.productCategories = [];
    this.productCategories.push(new ProductCategory('src/assets/images/chicken.jpg', 'BBQ'));
    this.productCategories.push(new ProductCategory('src/assets/images/gourmet.jpg', 'GOURMET'));
    this.productCategories.push(new ProductCategory('src/assets/images/hooligan.jpg', 'GRILLPRODUCTEN'));
    this.selectedProducts = [];
  }

  ngOnInit(): void {
  }

  selectLocation(): void {

  }

  nextPage(): void {
    if (this.currentPage < this.lastPage) {
      this.currentPage += 1;
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage -= 1;
    }
  }

}
