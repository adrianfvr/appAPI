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
  constructor(
    private productService: ProductsService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.loadingProducts();
  }

  async loadingProducts() {
    const loading = await this.loadingController.create({
      message: 'Loading products...',
    });
    loading.present();
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      console.log(this.products);
      this.loaded = true;
      loading.dismiss();
    });
  }
}
