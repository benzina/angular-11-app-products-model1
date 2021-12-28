import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient:HttpClient) { }

  getAllProducts():Observable<Product[]>{
    let host=environment.host;
    return this.httpClient.get<Product[]>(host+"/products");
  }


  getSelectedProducts():Observable<Product[]>{
    let host=environment.host;
    return this.httpClient.get<Product[]>(host+"/products?selected=true");
  }

  getAvailableProducts():Observable<Product[]>{
    let host=environment.host;
    return this.httpClient.get<Product[]>(host+"/products?available=true");
  }

  searchProducts(keyword:string):Observable<Product[]>{
    let host=environment.host;
    return this.httpClient.get<Product[]>(host+"/products?name_like="+keyword);
  }

  selectProduct(product:Product):Observable<Product>{
    let host=environment.host;
    product.selected=!product.selected;
    return this.httpClient.put<Product>(host+"/products/"+product.id,product);
  }
  deleteProduct(product:Product):Observable<void>{
    let host=environment.host;
    return this.httpClient.delete<void>(host+"/products/"+product.id);
  }

  saveProduct(product:Product):Observable<Product>{
    let host = environment.host;
    return this.httpClient.post<Product>(host+"/products",product);
  }

  getProduct(id:number):Observable<Product>{
    let host=environment.host;
    return this.httpClient.get<Product>(host+"/products/"+id);
  }

  updateProduct(product:Product):Observable<Product>{
    let host=environment.host;
    return this.httpClient.put<Product>(host+"/products/"+product.id,product);
  }



}
