import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {AuthServerProvider, StateStorageService} from '../../core';
import {EventManager, LoginService} from '../../core/services';
import {Authority} from '../../shared/constants/authority.constants';

@Component({
    templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit, AfterViewInit {
  public authenticationError: boolean;
  public account: Account;
  public isSaving: boolean;
  public isShowPassword = false;
  public loginForm = this.fb.group({
    userName: [ null, [ Validators.required ] ],
    password: [ null, [ Validators.required ] ],
    rememberMe: [true],
  });

  constructor(
    private eventManager: EventManager,
    private loginService: LoginService,
    private stateStorageService: StateStorageService,
    private elementRef: ElementRef,
    private router: Router,
    private fb: FormBuilder,
    private authServerProvider: AuthServerProvider,
  ) {
  }

  public ngOnInit() {
    this.isSaving = false;
    if (this.loginService.getToken()) {
      this.router.navigate(['/game']);
    }
  }

  public ngAfterViewInit() {
    setTimeout(() => this.elementRef.nativeElement.querySelector('#username').focus(), 0);
  }

  public cancel() {
    this.authenticationError = false;
    this.loginForm.patchValue({
      username: '',
      password: '',
    });
  }

  public login() {
    this.loginService
      .login({
        username: this.loginForm.get('userName').value,
        password: this.loginForm.get('password').value,
        rememberMe: this.loginForm.get('rememberMe').value,
      })
      .then((result) => {
        this.authenticationError = false;
        this.isSaving = true;
        if (this.router.url === '/register' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
          this.router.navigate(['']);
        }

        this.eventManager.broadcast({
          name: 'authenticationSuccess',
          content: 'Sending Authentication Success',
        });

        // previousState was set in the authExpiredInterceptor before being redirected to login modal.
        // since login is successful, go to stored previousState and clear previousState
        const redirect = this.stateStorageService.getUrl();
        if (redirect) {
          this.stateStorageService.storeUrl(null);
          this.router.navigateByUrl(redirect);
        } else {
          const auth = this.authServerProvider.getTokenValueByKey('auth');
          if (auth.includes(Authority.ADMIN) || auth.includes(Authority.CS)) {
            this.router.navigate(['/game']);
          } else {
            this.router.navigate(['/agent-info']);
          }
        }
      })
      .catch((err: any) => {
        this.authenticationError = true;
      });
  }

  public requestResetPassword() {
    this.router.navigate(['/reset', 'request']);
  }

  public showPassword() {
    this.isShowPassword = !this.isShowPassword;
  }
}
