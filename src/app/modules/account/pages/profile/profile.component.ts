import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, NzModalService, NzNotificationService, UploadFile} from 'ng-zorro-antd';
import {AccountService, IUser, User} from '../../../../core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PasswordService} from '../password/password.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: User;
  changePWForm: FormGroup;
  changeInfoForm: FormGroup;
  avatarUrl = 'http://themenate.com/applicator/dist/assets/images/avatars/thumb-13.jpg';
  pwdNotMatch = false;
  changePwdError = false;
  changePwdErrorMsg = 'An error has occurred! The password could not be changed.';
  changePwdSuccees = false;

  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private message: NzMessageService,
    private accountService: AccountService,
    private notification: NzNotificationService,
    private passwordService: PasswordService,
  ) {
  }

  ngOnInit(): void {
    this.changePWForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
    });

    this.changeInfoForm = this.fb.group({
      login: [null, [Validators.required]],
      email: [null, [Validators.required]],
      firstName: [],
      lastName: [],
      phone: [],
    });

    this.accountService.fetch().subscribe(
      (rs: HttpResponse<IUser>) => {
        this.currentUser = rs.body;
        this.updateChangeInfoForm(this.currentUser);
      },
      (err) => this.onError()
    );
  }

  saveInfo() {
    this.currentUser.firstName = this.changeInfoForm.get(['firstName'])!.value;
    this.currentUser.lastName = this.changeInfoForm.get(['lastName'])!.value;
    this.currentUser.phone = this.changeInfoForm.get(['phone'])!.value;
    this.subscribeToSaveResponse(this.accountService.save(this.currentUser));
  }

  updateChangeInfoForm(user: IUser): void {
    this.changeInfoForm.patchValue({
      id: user.id,
      login: user.login,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
    });
  }

  changePassword(): void {
    this.pwdNotMatch = false;
    const newPassword = this.changePWForm.get(['newPassword'])!.value;
    if (newPassword !== this.changePWForm.get(['confirmPassword'])!.value) {
      this.pwdNotMatch = true;
    } else {
      this.passwordService.save(newPassword, this.changePWForm.get(['currentPassword'])!.value).subscribe(
        () => {
          this.changePwdSuccees = true;
          this.changePwdError = false;
          this.changePWForm.reset();
        },
        (err: HttpErrorResponse) => {
          if (err && err.status === 400 && err.error && err.error.title.includes('Incorrect')) {
            this.changePwdErrorMsg = 'Old password incorrect!';
          }
          this.changePwdError = true;
        }
      );
    }
  }

  private getBase64(img: File, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: UploadFile }): void {
    this.getBase64(info.file.originFileObj, (img: string) => {
      this.avatarUrl = img;
    });
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUser>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onError()
    );
  }

  protected onSaveSuccess(): void {
    this.notification.create(
      'success',
      'Done',
      'Successfully saved!'
    );
  }

  onError() {
    this.notification.create(
      'error',
      'Error',
      'Error incurred. Please try again!'
    );
  }
}
