import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  loaded: boolean = false;
  products: any[] = [];
  filteredProducts: any[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  categories: string[] = [];
  constructor(
    private productService: ProductsService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.loadingProducts();
    this.getCategories();
  }

  async loadingProducts() {
    const loading = await this.loadingController.create({
      message: 'Loading products...',
    });
    loading.present();
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
      console.log(this.products);
      this.loaded = true;
      loading.dismiss();
    });
  }

  getCategories() {
    this.productService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  filterProducts() {
    this.filteredProducts = this.products.filter((product) => {
      return (
        (this.selectedCategory === '' ||
          product.category === this.selectedCategory) &&
        (this.searchTerm === '' ||
          product.title.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    });
  }
}
