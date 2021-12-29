import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {ActionEvent, AppDataState, DataStateEnum, ProductsActionsTypes} from "../../../state/product.state";
import {Product} from "../../../models/product.model";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @Input() products$: Observable<AppDataState<Product[]>> |null=null;
  @Output() productEventEmitter:EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
  readonly DataStateEnum=DataStateEnum;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(p: Product) {
    this.productEventEmitter.emit({type:ProductsActionsTypes.SELECT_PRODUCT,payload:p});
  }

  onDelete(p: Product) {
    this.productEventEmitter.emit({type:ProductsActionsTypes.DELETE_PRODUCT,payload:p});
  }

  onEdit(p: Product) {
    this.productEventEmitter.emit({type:ProductsActionsTypes.EDIT_PRODUCT,payload:p});
  }
  onActionEvent($event: ActionEvent) {
    this.productEventEmitter.emit($event);
  }
}
