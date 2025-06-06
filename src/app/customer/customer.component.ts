import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customers: { id: number; name: string; email: string }[] = [];
  isEditMode = false;
  editCustomerId: number | null = null;

  constructor(private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  addOrUpdateCustomer() {
    if (this.customerForm.valid) {
      const customerData = this.customerForm.value;

      if (this.isEditMode && this.editCustomerId !== null) {
        // Update customer
        const index = this.customers.findIndex(
          (c) => c.id === this.editCustomerId
        );
        if (index !== -1) {
          this.customers[index] = { id: this.editCustomerId, ...customerData };
        }
        this.isEditMode = false;
        this.editCustomerId = null;
      } else {
        // Add new customer
        const newCustomer = { id: Date.now(), ...customerData };
        this.customers.push(newCustomer);
      }

      this.customerForm.reset();
    }
  }

  editCustomer(customer: { id: number; name: string; email: string }) {
    this.customerForm.patchValue({
      name: customer.name,
      email: customer.email,
    });
    this.isEditMode = true;
    this.editCustomerId = customer.id;
  }

  deleteCustomer(id: number) {
    this.customers = this.customers.filter((customer) => customer.id !== id);
  }

  resetForm() {
    this.customerForm.reset();
    this.isEditMode = false;
    this.editCustomerId = null;
  }
}
