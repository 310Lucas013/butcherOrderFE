import {Component, OnInit, ViewChild} from '@angular/core';
import {MatCalendar} from '@angular/material/datepicker';
import {Router} from '@angular/router';
import {ProductCategory} from '../shared/formData/ProductCategory';
import {Product} from '../shared/model/product';
import {OrderProduct} from '../shared/model/order-product';
import {ShoppingProduct} from '../shared/formData/shopping-product';
import {CustomDateAdapter} from '../shared/pipe/custom-date-adapter';
import {DateAdapter} from '@angular/material/core';


@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css'],
  providers: [{provide: DateAdapter, useClass: CustomDateAdapter }]
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
    this.productCategories.push(new ProductCategory('../../assets/images/bbq.png', 'BBQ'));
    this.productCategories.push(new ProductCategory('../../assets/images/gourmet.png', 'GOURMET'));
    this.productCategories.push(new ProductCategory('../../assets/images/hooligan.png', 'GRILLPRODUCTEN'));
    this.selectedProducts = [];
  }

  ngOnInit(): void {
  }

  selectLocation(): void {

  }

  selectedCategory(index: number): void {
    console.log(index);
  }

  dateSelected(event: Date): void {
    console.log(event);
    this.selectedDate = event;
    console.log(this.selectedDate);
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
