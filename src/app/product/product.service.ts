import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private apiUrl = "http://localhost:3000"; // Replace with your API URL
  private token: string | null = localStorage.getItem("token");

  constructor(private http: HttpClient) {}

  // Create a new product
  createProduct(product: { name: string; price: number }): Observable<any> {
    if (!this.token) {
      throw new Error("No authentication token found");
    }
    // Set the authorization header with the token
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };
    // Include headers in the request
    this.http.options(this.apiUrl, { headers });
    // Post the product data to the API
    return this.http.post(this.apiUrl, product);
  }

  // Get all products
  getProducts(): Observable<any[]> {
    if (!this.token) {
      throw new Error("No authentication token found");
    }
    // Set the authorization header with the token
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };
    // Include headers in the request
    this.http.options(this.apiUrl, { headers });
    // Post the product data to the API
    return this.http.get<any[]>(this.apiUrl + "/api/product/list");
  }

  // Update a product
  updateProduct(
    id: number,
    product: { name: string; price: number }
  ): Observable<any> {
    if (!this.token) {
      throw new Error("No authentication token found");
    }
    // Set the authorization header with the token
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };
    // Include headers in the request
    this.http.options(this.apiUrl, { headers });
    // Post the product data to the API
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }

  // Delete a product
  deleteProduct(id: number): Observable<any> {
    if (!this.token) {
      throw new Error("No authentication token found");
    }
    // Set the authorization header with the token
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };
    // Include headers in the request
    this.http.options(this.apiUrl, { headers });
    // Post the product data to the API
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
