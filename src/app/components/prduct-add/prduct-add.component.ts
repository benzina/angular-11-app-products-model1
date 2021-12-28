import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-prduct-add',
  templateUrl: './prduct-add.component.html',
  styleUrls: ['./prduct-add.component.css']
})
export class PrductAddComponent implements OnInit {

  productFormGroup?:FormGroup;
  submitted:boolean=false;

  constructor(private formBuilder:FormBuilder, private productService:ProductsService) { }

  ngOnInit(): void {
    this.productFormGroup=this.formBuilder.group({
      name:["",Validators.required],
      price:[0,Validators.required],
      quantity:[0,Validators.required],
      selected:[true,Validators.required],
      available:[true,Validators.required],
    });
  }

  onSaveProduct() {
    this.submitted=true;
    if (this.productFormGroup?.invalid) return;

    this.productService.saveProduct(this.productFormGroup?.value)
      .subscribe(data=>{
        alert("success product save");
      });

  }
}
