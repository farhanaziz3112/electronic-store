import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { Router, RouterModule } from '@angular/router';
import { LayoutService } from '../layout.service';
import { AppMenuitemComponent } from './app.menuitem.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor, MenuModule, RouterModule, NgIf, CommonModule, AppMenuitemComponent],
  templateUrl: './app.sidebar.component.html',
  styleUrl: './app.sidebar.component.scss',
})
export class AppSidebarComponent implements OnInit {
  model: any[] = [];

  constructor(private layoutService: LayoutService, public el: ElementRef) {}

  @HostListener('document: click', ['$event'])
  clicked(event: PointerEvent) {
    // const clickedInside: boolean = this.el.nativeElement.contains(event.target);
    // if (this.layoutService.state.staticMenuMobileActive) {
    //   if (!clickedInside) {
    //     console.log('click outside');
    //     this.hideMenu()
    //   }
    // }
    if (this.shouldHandleClick(event)) {
      this.handleDocumentClick(event)
    }
  }

  private shouldHandleClick(event: PointerEvent) {
    const clickedInside: boolean = this.el.nativeElement.contains(event.target);
    return this.layoutService.state.staticMenuMobileActive && !clickedInside;
  }

  private handleDocumentClick(event: PointerEvent) {
    const clickedInside: boolean = this.el.nativeElement.contains(event.target);
    if (this.layoutService.state.staticMenuMobileActive && !clickedInside) {
      this.hideMenu();
    }
  }

  hideMenu() {
    this.layoutService.state.menuHoverActive = false;
    this.layoutService.state.staticMenuMobileActive = false;
  }

  ngOnInit() {
    this.model = [
      {
        label: 'Products',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-home',
            routerLink: ['/dashboard']
          },
          {
            label: 'Products',
            icon: 'pi pi-shopping-bag',
            routerLink: ['/products']
          },
          {
            label: 'Sales',
            icon: 'pi pi-dollar',
            routerLink: ['/sales']
          },
        ],
      },
      {
        label: 'Others',
        items: [
          {
            label: 'Settings',
            icon: 'pi pi-cog',
            routerLink: ['/settings']
          },
          {
            label: 'Profile',
            icon: 'pi pi-user',
            routerLink: ['/profile']
          },
        ],
      },
    ];
  }
}
