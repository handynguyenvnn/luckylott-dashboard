import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare const accounting: any;

const options = {
  symbol : '',
  decimal : '.',
  thousand: ',',
  precision : 0,
  format: '%s%v'
};

export default class HelperUtil {
  static unformatCurrency(value: string): number {
    const decimalDelimiter = '.';
    return accounting.unformat(value, decimalDelimiter);
  }

  static formatCurrency(rawValue: any) {
    return accounting.formatMoney(rawValue, options);
  }

  static roundPercentNum(rawNumber: number) {
    let roundedNumber = 0;
    if (0 < rawNumber && rawNumber < 1) {
      roundedNumber = 1;
    } else if (99 < rawNumber && rawNumber < 100) {
      roundedNumber = 99;
    } else {
      roundedNumber = accounting.toFixed(rawNumber);
    }
    return roundedNumber;
  }

  static calculateNewPrice(orgPrice: number, discount: number): number {
    const rawNewPrice = orgPrice * (100 - discount) / 100;
    return Number.parseInt(accounting.toFixed(rawNewPrice), 10);
  }

  static calculateDiscount(orgPrice: number, newPrice: number): any {
    const rawDiscount = (orgPrice - newPrice) / orgPrice * 100;
    return this.roundPercentNum(rawDiscount);
  }

  static calculateAmount(newPrice: number, percent: number, quantity?: number): number {
    let rawComAmount = newPrice * percent / 100;
    if (quantity) {
      rawComAmount = rawComAmount * quantity;
    }
    return Number.parseInt(accounting.toFixed(rawComAmount), 10);
  }

  static calculatePercent(newPrice: number, commissionAmount: number): any {
    const rawComPercent =  commissionAmount / newPrice * 100;
    return this.roundPercentNum(rawComPercent);
  }

  static setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(selectionStart, selectionEnd);
    } else if (input.createTextRange) {
      const range = input.createTextRange();
      range.collapse(true);
      range.moveEnd('character', selectionEnd);
      range.moveStart('character', selectionStart);
      range.select();
    }
  }

  static setCaretToPos(input, pos) {
    this.setSelectionRange(input, pos, pos);
  }

  static trim(s: string): any {
    if (s) {
      return s.replace(/(^\s*)|(\s*$)/gi, '').replace(/[ ]{2,}/gi, ' ').replace(/\n +/, '\n');
    } else {
      return s;
    }
  }

  static formatBytes(bytes, decimals?) {
    if (bytes === 0) { return '0 Bytes'; }
    // tslint:disable-next-line:one-variable-per-declaration
    const k = 1024,
      dm = decimals || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  static isShowValid(formGroup: FormGroup, groupName: string, showValid: boolean, errorName?: string,
                     isFormError?: boolean, showImmediately?: boolean) {
    let show = false;
    const group = formGroup.get(groupName);
    const preCondition = (group.touched || showValid || showImmediately);
    if (errorName) {
      show = isFormError ? formGroup.hasError(errorName) && preCondition : group.hasError(errorName) && preCondition;
    } else {
      show = group.invalid && preCondition;
    }
    return show;
  }

  static mustMatch(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  static isFieldValid(formGroup: FormGroup, formSubmitAttempt: boolean, field: string): boolean {
    return (
      (formGroup.get(field).invalid && formGroup.get(field).touched) ||
      (formGroup.get(field).untouched && formSubmitAttempt)
    );
  }

  static displayFieldCss(formGroup: FormGroup, formSubmitAttempt: boolean, field: string): any {
    return {
      'has-error': HelperUtil.isFieldValid(formGroup, formSubmitAttempt, field),
      'has-feedback': HelperUtil.isFieldValid(formGroup, formSubmitAttempt, field),
      'was-validated': HelperUtil.isFieldValid(formGroup, formSubmitAttempt, field)
    };
  }

  static buildAddressForm(fb: FormBuilder, address?: any): FormGroup {
    if (address) {
      return fb.group({
        id: [address.id],
        note: [address.note, [Validators.maxLength(250)]],
        address: [address.address, [Validators.maxLength(250)]],
        postCode: [address.postCode, [Validators.maxLength(20)]],
        mobile: [address.mobile, [Validators.maxLength(20)]],
        email: [address.email, [Validators.maxLength(50)]],
        countryId: [address.countryId],
        provinceId: [address.provinceId],
        districtId: [address.districtId],
        wardId: [address.wardId]
      });
    }

    return fb.group({
      id: [],
      note: [null, [Validators.maxLength(250)]],
      address: [null, [Validators.maxLength(250)]],
      postCode: [null, [Validators.maxLength(20)]],
      mobile: [null, [Validators.maxLength(20)]],
      email: [null, [Validators.maxLength(50)]],
      countryId: [],
      provinceId: [],
      districtId: [],
      wardId: []
    });
  }

  static trackItemById(index: number, item: any) {
    return item.id;
  }

  static allPossibleCases(arr: any) {
    if (arr.length === 1) {
      return arr[0];
    } else {
      const result = [];
      const allCasesOfRest = this.allPossibleCases(arr.slice(1));  // recur with the rest of array
      for (let i = 0; i < allCasesOfRest.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
          result.push(arr[0][j] + allCasesOfRest[i]);
        }
      }
      return result;
    }
  }

  static truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + '…' : source;
  }

  static insertAt(array, index, ...elementsArray) {
    array.splice(index, 0, ...elementsArray);
  }
}
