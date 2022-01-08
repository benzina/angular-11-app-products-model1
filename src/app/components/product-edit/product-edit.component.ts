import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productId:number;
  productFormGroup?:FormGroup;
  submitted:boolean=false;

  constructor(private activatedRoue:ActivatedRoute,
              private productService:ProductsService,
              private formBuilder:FormBuilder) {
    this.productId=activatedRoue.snapshot.params.id;
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId)
      .subscribe(product=>{
        this.productFormGroup=this.formBuilder.group({
          id:[product.id,Validators.required],
          name:[product.name,Validators.required],
          price:[product.price,Validators.required],
          quantity:[product.quantity,Validators.required],
          selected:[product.selected,Validators.required],
          available:[product.available,Validators.required]
        })
      });

  }

  onUpdateProduct() {
    this.submitted=true;
    if (this.productFormGroup?.invalid) return;
    this.productService.updateProduct(this.productFormGroup?.value)
      .subscribe(data=>{
        alert("Success updating product");
      });
  }
}
