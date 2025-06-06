import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:3000/api'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Create a new customer
  createCustomer(customer: { name: string; email: string }): Observable<any> {
    return this.http.post(this.apiUrl, customer);
  }

  // Get all customers
  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Update a customer
  updateCustomer(id: number, customer: { name: string; email: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, customer);
  }

  // Delete a customer
  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}