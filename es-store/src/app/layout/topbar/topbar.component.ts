import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MegaMenuModule } from 'primeng/megamenu';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { CartService } from '../../service/cart.service';
import { Product } from '../../model/product.model';
import { BadgeModule } from 'primeng/badge';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'es-topbar',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    MegaMenuModule,
    SidebarModule,
    BadgeModule,
    AsyncPipe,
    RouterModule,
    MenuModule
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent implements OnInit {
  menuItems: MegaMenuItem[] = [
    {
      label: 'Headphone',
      icon: 'pi pi-headphones',
      items: [
        [
          {
            items: [
              {
                label: 'Sony',
                command: () => {
                  console.log('clickeddd');
                },
              },
              { label: 'Edifier' },
              { label: 'Apple' },
              { label: 'Razer' },
              { label: 'All' },
            ],
          },
        ],
      ],
    },
    {
      label: 'Wearable',
      icon: 'pi pi-clock',
      items: [
        [
          {
            items: [
              { label: 'Samsung' },
              { label: 'Apple' },
              { label: 'Casio' },
              { label: 'Huawei' },
              { label: 'All' },
            ],
          },
        ],
      ],
    },
    {
      label: 'Laptop',
      icon: 'pi pi-desktop',
      items: [
        [
          {
            items: [
              { label: 'HP' },
              { label: 'Dell' },
              { label: 'Lenovo' },
              { label: 'Apple' },
              { label: 'All' },
            ],
          },
        ],
      ],
    },
    {
      label: 'Smarthome',
      icon: 'pi pi-home',
      items: [
        [
          {
            items: [
              { label: 'Xiaomi' },
              { label: 'Amazon' },
              { label: 'Huawei' },
              { label: 'All' },
            ],
          },
        ],
      ],
    },
    {
      label: 'Tablet',
      icon: 'pi pi-tablet',
      items: [
        [
          {
            items: [
              { label: 'Samsung' },
              { label: 'Apple' },
              { label: 'Huawei' },
              { label: 'Lenovo' },
              { label: 'Vivo' },
              { label: 'All' },
            ],
          },
        ],
      ],
    },
    {
      label: 'Mobile',
      icon: 'pi pi-mobile',
      items: [
        [
          {
            items: [
              { label: 'Samsung' },
              { label: 'Apple' },
              { label: 'Vivo' },
              { label: 'Oppo' },
              { label: 'Huawei' },
              { label: 'Xiaomi' },
              { label: 'Asus' },
              { label: 'Alcatel' },
              { label: 'All' },
            ],
          },
        ],
      ],
    },
    {
      label: 'Monitor',
      icon: 'pi pi-desktop',
      items: [
        [
          {
            items: [
              { label: 'Acer' },
              { label: 'ViewSonic' },
              { label: 'HP' },
              { label: 'Samsung' },
              { label: 'Dell' },
              { label: 'PRISM' },
              { label: 'Xiaomi' },
              { label: 'MSI' },
              { label: 'All' },
            ],
          },
        ],
      ],
    },
  ];

  cartSideBar: boolean = false;

  cartProducts$: Observable<Product[]>;
  numberOfItem: number = 0;
  cartTotalPrice: number = 0;

  userMenuItems: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => {
        this.router.navigate(['/profile'])
      }
    },
    {
      label: 'Purchase',
      icon: 'pi pi-shopping-cart',
      command: () => {
        this.router.navigate(['/purchase'])
      }
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      command: () => {
        this.router.navigate(['/settings'])
      }
    }
  ]

  

  constructor(private cartService: CartService, private router: Router) {
    this.cartProducts$ = this.cartService.getCart();
    this.cartProducts$.subscribe((x) => {
      this.numberOfItem = x.length;
      this.cartTotalPrice = this.cartService.getCartTotal();
    });
  }

  clearCart() {
    this.cartService.clearCart();
  }

  checkOut() {
    this.router.navigate(['/purchase']);
    this.cartSideBar = false;
  }

  ngOnInit() {
    this.menuItems;
  }
}
