import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActionEvent, ProductsActionsTypes} from "../../../state/product.state";
import {EventDriverService} from "../../../state/event.driver.service";

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {

//  @Output() productEventEmitter:EventEmitter<ActionEvent> = new EventEmitter();

  constructor(private eventDriverService:EventDriverService) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    //this.productEventEmitter.emit({type:ProductsActionsTypes.GET_ALL_PRODUCTS});
    this.eventDriverService.publishEvent({type:ProductsActionsTypes.GET_ALL_PRODUCTS});
  }

  onGetSelectedProducts() {
   // this.productEventEmitter.emit({type:ProductsActionsTypes.GET_SELECTED_PRODUCTS});
    this.eventDriverService.publishEvent({type:ProductsActionsTypes.GET_SELECTED_PRODUCTS});
  }

  onGetAvailableProducts() {
    //this.productEventEmitter.emit({type:ProductsActionsTypes.GET_AVAILABLE_PRODUCTS});
    this.eventDriverService.publishEvent({type:ProductsActionsTypes.GET_AVAILABLE_PRODUCTS});
  }

  onNewProduct() {
    //this.productEventEmitter.emit({type:ProductsActionsTypes.NEW_PRODUCT});
    this.eventDriverService.publishEvent({type:ProductsActionsTypes.NEW_PRODUCT});
  }

  onSearch(dataForm: any) {
    //this.productEventEmitter.emit({type:ProductsActionsTypes.SEARCH_PRODUCTS,payload:dataForm});
    this.eventDriverService.publishEvent({type:ProductsActionsTypes.SEARCH_PRODUCTS,payload:dataForm});
  }
}
