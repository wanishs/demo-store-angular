import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  products: { id: number; name: string; price: number }[] = [];
  isEditMode = false;
  editProductId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }

  // Fetch all products
  getProducts() {
    this.productService.getProducts().subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  // Add or update a product
  addOrUpdateProduct() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;

      if (this.isEditMode && this.editProductId !== null) {
        // Update product
        this.productService
          .updateProduct(this.editProductId, productData)
          .subscribe(
            (response) => {
              this.getProducts(); // Refresh the product list
              this.resetForm();
            },
            (error) => {
              console.error('Error updating product:', error);
            }
          );
      } else {
        // Add new product
        this.productService.createProduct(productData).subscribe(
          (response) => {
            this.getProducts(); // Refresh the product list
            this.resetForm();
          },
          (error) => {
            console.error('Error adding product:', error);
          }
        );
      }
    }
  }

  // Edit a product
  editProduct(product: { id: number; name: string; price: number }) {
    this.productForm.patchValue({
      name: product.name,
      price: product.price,
    });
    this.isEditMode = true;
    this.editProductId = product.id;
  }

  // Delete a product
  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      (response) => {
        this.getProducts(); // Refresh the product list
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }

  // Reset the form
  resetForm() {
    this.productForm.reset();
    this.isEditMode = false;
    this.editProductId = null;
  }
}