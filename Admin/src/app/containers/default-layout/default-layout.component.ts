import { UserNavs } from './../../UserNav';
import { AdminNavs } from './../../AdminNav';
import {Component} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = AdminNavs;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
