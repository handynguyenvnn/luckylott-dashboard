import {Component, OnInit} from '@angular/core';
import {ThemeConstantService} from '../../services/theme-constant.service';
import {AccountService, IUser} from '../../../core';
import {Router} from '@angular/router';
import {LoginService} from '../../../core/services';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
  searchVisible = false;
  quickViewVisible = false;
  isFolded: boolean;
  isExpand: boolean;
  currentUser: IUser;
  constructor(
    private themeService: ThemeConstantService,
    private loginService: LoginService,
    private accountService: AccountService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
    this.themeService.isExpandChanges.subscribe(isExpand => this.isExpand = isExpand);
    this.accountService.fetch().subscribe(
      (rs: HttpResponse<IUser>) => {
        this.currentUser = rs.body;
      }
    );
  }

  toggleFold() {
    this.isFolded = !this.isFolded;
    this.themeService.toggleFold(this.isFolded);
  }

  toggleExpand() {
    this.isFolded = false;
    this.isExpand = !this.isExpand;
    this.themeService.toggleExpand(this.isExpand);
    this.themeService.toggleFold(this.isFolded);
  }

  searchToggle(): void {
    this.searchVisible = !this.searchVisible;
  }

  quickViewToggle(): void {
    this.quickViewVisible = !this.quickViewVisible;
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/authentication/login']);
  }
}
