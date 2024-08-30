import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { SplitterModule } from 'primeng/splitter';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    CommonModule,
    MenubarModule,
    RippleModule,
    InputTextModule,
    AvatarModule,
    BadgeModule,
    ButtonModule,
    SplitterModule,
  ],
  templateUrl: './app.topbar.component.html',
  styleUrl: './app.topbar.component.scss',
})
export class AppTopbarComponent {

  @ViewChild('menuButton') menuButton!: ElementRef;

  @Input() user: any;

  constructor(public layoutService: LayoutService, public el: ElementRef) {}

  onMenuToggle() {
    this.layoutService.onMenuToggle();
  }
}
