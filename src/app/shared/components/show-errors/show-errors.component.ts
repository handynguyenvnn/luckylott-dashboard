import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-errors',
  templateUrl: './show-errors.component.html',
  styleUrls: ['./show-errors.component.scss']
})
export class ShowErrorsComponent {
  @Input() errorMsg: string;
  @Input() displayError: boolean;
}
