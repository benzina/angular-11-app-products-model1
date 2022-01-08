import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../models/product.model";
import {Observable, of} from "rxjs";
import {catchError, map, startWith} from "rxjs/operators";
import {ActionEvent, AppDataState, DataStateEnum, ProductsActionsTypes} from "../../state/product.state";
import {Router} from "@angular/router";
import {EventDriverService} from "../../state/event.driver.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
   products$: Observable<AppDataState<Product[]>> |null=null;
   readonly DataStateEnum=DataStateEnum;

  constructor(private productService:ProductsService,
              private router:Router,
              private eventDrivenService:EventDriverService
  ) { }

  ngOnInit(): void {
    this.eventDrivenService.sourceEventSubjectObservable.subscribe((actionEvent:ActionEvent)=>{
      this.onActionEvent(actionEvent);
    });
  }

  onGetAllProducts() {
    this.products$= this.productService.getAllProducts().pipe(
      map(data=> {
        console.log("start");
        return ({dataState: DataStateEnum.LOADED, data: data})
      }),
        catchError(err=>of({dataState:DataStateEnum.ERROR,err})),
        startWith({dataState:DataStateEnum.LOADING })
      );
  }

  onGetSelectedProducts() {
    this.products$= this.productService.getSelectedProducts().pipe(
      map(data=> {
        console.log("start");
        return ({dataState: DataStateEnum.LOADED, data: data})
      }),
      catchError(err=>of({dataState:DataStateEnum.ERROR,err})),
      startWith({dataState:DataStateEnum.LOADING })
    );
  }

  onGetAvailableProducts() {
    this.products$= this.productService.getAvailableProducts().pipe(
      map(data=> {
        console.log("start");
        return ({dataState: DataStateEnum.LOADED, data: data})
      }),
      catchError(err=>of({dataState:DataStateEnum.ERROR,err})),
      startWith({dataState:DataStateEnum.LOADING })
    );
  }

  onSearch(dataForm: any) {
    this.products$= this.productService.searchProducts(dataForm.keyword).pipe(
      map(data=> {
        console.log("start");
        return ({dataState: DataStateEnum.LOADED, data: data})
      }),
      catchError(err=>of({dataState:DataStateEnum.ERROR,err})),
      startWith({dataState:DataStateEnum.LOADING })
    );
  }

  onSelect(product: Product) {
    this.productService.selectProduct(product)
      .subscribe(data=>{
        product.selected = data.selected;
      })
  }

  onDelete(p: Product) {
    let v=confirm("etes vous sure ?");
    if(v)
      this.productService.deleteProduct(p)
        .subscribe(data=>{
          this.onGetAllProducts();
        })
  }

  onNewProduct() {
    this.router.navigateByUrl("/newProduct");
  }

  onEdit(p: Product) {
     this.router.navigateByUrl("/editProduct/"+p.id);
  }

  onActionEvent($event: any) {
    switch ($event.type) {
      case ProductsActionsTypes.GET_ALL_PRODUCTS:this.onGetAllProducts();break;
      case ProductsActionsTypes.GET_SELECTED_PRODUCTS:this.onGetSelectedProducts();break;
      case ProductsActionsTypes.GET_AVAILABLE_PRODUCTS:this.onGetAvailableProducts();break;
      case ProductsActionsTypes.NEW_PRODUCT:this.onNewProduct();break;
      case ProductsActionsTypes.SEARCH_PRODUCTS:this.onSearch($event.payload);break;
      case ProductsActionsTypes.SELECT_PRODUCT:this.onSelect($event.payload);break;
      case ProductsActionsTypes.EDIT_PRODUCT:this.onEdit($event.payload);break;
      case ProductsActionsTypes.DELETE_PRODUCT:this.onDelete($event.payload);break;
    }
  }
}
