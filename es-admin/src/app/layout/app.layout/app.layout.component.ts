import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { AppFooterComponent } from '../app.footer/app.footer.component';
import { AppSidebarComponent } from '../app.sidebar/app.sidebar.component';
import { AppTopbarComponent } from '../app.topbar/app.topbar.component';
import { RouterModule } from '@angular/router';
import { LayoutService } from '../layout.service';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthService } from '@auth0/auth0-angular';
import { selectIsLoggedIn, selectUserDetails } from '../../state/user';

@Component({
  selector: 'app-app.layout',
  standalone: true,
  imports: [
    AppFooterComponent,
    AppSidebarComponent,
    AppTopbarComponent,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './app.layout.component.html',
  styleUrl: './app.layout.component.scss',
})
export class AppLayoutComponent implements OnDestroy, AfterViewInit, OnInit {
  menuOutsideClickListener: any;

  overlayMenuOpenSubcription: Subscription | any;

  @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;

  @ViewChild(AppTopbarComponent) appTopbar!: AppTopbarComponent;

  user$: Observable<any> | any;
  authenticated$: Observable<boolean> | any;
  profileDetails: any;

  constructor(
    private layoutService: LayoutService,
    public renderer: Renderer2,
    private store: Store<any>,
    public auth: AuthService
  ) {
    this.authenticated$ = this.store.select(selectIsLoggedIn);
    this.user$ = this.store.select(selectUserDetails);
    this.user$.subscribe((user: any) => {
      if (user) {
        this.profileDetails = user
      }
    })
    // this.auth.user$.subscribe((profile) => {
    //   this.profileDetails = profile;
    // });
    // console.log(this.user$.email);
  }

  ngOnInit() {
      // this.user$.subscribe((user: any) => {
      //   if (user) {
      //     console.log(user.name);
      //     console.log(user.email);
      //   }
      // })
  }

  ngAfterViewInit() {
    // this.overlayMenuOpenSubcription = this.layoutService.overlayOpen$.subscribe(
    //   () => {
    //     if (!this.menuOutsideClickListener) {
    //       this.menuOutsideClickListener = this.renderer.listen(
    //         'document',
    //         'click',
    //         (event) => {
    //           console.log('clickkkkk');
    //           const isOutsideClicked = !(
    //             this.appSidebar.el.nativeElement.isSameNode(event.target) ||
    //             this.appSidebar.el.nativeElement.contains(event.target)
    //           );
    //           if (isOutsideClicked) {
    //             console.log('click outside');
    //             this.hideMenu();
    //           }
    //         }
    //       );
    //     }
    //     if (this.layoutService.state.staticMenuMobileActive) {
    //       this.blockBodyScroll();
    //     }
    //   }
    // );
  }

  // @HostListener('document:click', ['$event'])
  // clickOutside(event: PointerEvent) {
  //   const sidebarElement = this.appSidebar.el.nativeElement;
  //   const clickedInside: boolean = sidebarElement.contains(event.target);
  //   if (!clickedInside) {
  //     console.log('click outside');
  //     this.hideMenu();
  //   }
  // }

  hideMenu() {
    this.layoutService.state.menuHoverActive = false;
    this.layoutService.state.staticMenuMobileActive = false;
    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
      this.menuOutsideClickListener = null;
    }
    this.unblockBodyScroll();
  }

  blockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.add('blocked-scroll');
    } else {
      document.body.className += 'blocked-scroll';
    }
  }

  unblockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll');
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(
          '(^|\\b' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)',
          'gi'
        ),
        ' '
      );
    }
  }

  get containerClass() {
    return {
      'layout-static': !this.layoutService.state.staticMenuDesktopInactive,
      'layout-static-inactive':
        this.layoutService.state.staticMenuDesktopInactive,
      'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
    };
  }

  ngOnDestroy() {
    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
    }
  }
}
