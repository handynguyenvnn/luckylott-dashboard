import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-count',
  templateUrl: './item-count.component.html',
  styleUrls: ['./item-count.component.scss']
})
export class ItemCountComponent {
  /**
   *  current page number.
   */
  @Input() page: number;

  /**
   *  Total number of items.
   */
  @Input() total: number;

  /**
   *  Number of items per page.
   */
  @Input() itemsPerPage: number;

}
