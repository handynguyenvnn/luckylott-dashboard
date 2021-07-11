import { CopyProperties } from 'src/app/shared/decorator/copy-properties.decorator';

@CopyProperties()
export class QueryParams  {
  public page?: number;
  public previousPage?: number;
  public ascending?: string;
  public predicate?: string;
  public totalItems?: number;
  public size?: number;
  public searchParams?: any;
  public sort?: any;
  constructor(params?: any) {
    this.page = 1;
    this.previousPage = 1;
    this.totalItems = 0;
    this.size = 10;
    this.ascending = '';
    this.predicate = '';
    this.searchParams  = {};
    this.sort  = [];
  }
}
