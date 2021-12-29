import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../../models/product.model";
import {ActionEvent, ProductsActionsTypes} from "../../../../state/product.state";

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css']
})
export class ProductsItemComponent implements OnInit {
  @Input() product?:Product;
  @Output() eventEmitter:EventEmitter<ActionEvent> =new EventEmitter<ActionEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(product: Product) {
    this.eventEmitter.emit({type:ProductsActionsTypes.SELECT_PRODUCT,payload:product});
  }

  onDelete(product: Product) {
    this.eventEmitter.emit({type:ProductsActionsTypes.DELETE_PRODUCT,payload:product});
  }

  onEdit(product: Product) {
    this.eventEmitter.emit({type:ProductsActionsTypes.EDIT_PRODUCT,payload:product})
  }
}
