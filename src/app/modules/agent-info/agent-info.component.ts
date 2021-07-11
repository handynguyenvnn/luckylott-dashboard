import { Component, OnInit } from '@angular/core';
import {AgentService} from '../agent/agent.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IAgent, IAgentPlayer, IAgentReport} from '../../shared/model';
import { ITEMS_PER_PAGE} from '../../shared/constants';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {IUser} from '../../core/user';
import {AccountService} from '../../core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
@Component({
  selector: 'app-agent-info',
  templateUrl: './agent-info.component.html',
  styleUrls: ['./agent-info.component.scss']
})
export class AgentInfoComponent implements OnInit {
  agentReport: IAgentReport | null = null;
  public players?: IAgentPlayer[];
  agentId: number;
  isReport = false;
  isSpinning = true;
  public totalItems = 0;
  public itemsPerPage = ITEMS_PER_PAGE;
  public page!: number;
  public predicate!: string;
  public ascending!: boolean;
  public ngbPaginationPage = 1;
  public search: any;
  filterForm: FormGroup;
  constructor(
    private agentService: AgentService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    private fb: FormBuilder,
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    this.filterForm = this.fb.group({
      fromDate: [null],
      toDate: [null],
      teleId: ['']
    });
    this.accountService.fetch().subscribe(
      (rs: HttpResponse<IUser>) => {
        const userId = rs.body.id;
        if (userId) {
          this.agentService.findByUser(userId).subscribe(
            (res: HttpResponse<IAgent>) => {
              this.agentId = res.body.id;
              this.agentService.findAgentInfo(this.agentId).subscribe(
                (response: HttpResponse<IAgentReport>) => {
                  this.agentReport = response.body;
                });
              // load players
              this.activatedRoute.data.subscribe((data: any) => {
                this.page = data.pagingParams.page;
                this.ascending = data.pagingParams.ascending;
                this.predicate = data.pagingParams.predicate;
                this.ngbPaginationPage = data.pagingParams.page;
                this.loadPage(this.isReport);
              });
            });
        }
      }
    );
  }

  public trackId(index: number, item: IAgentPlayer): number {
    return item.id;
  }

  public sort(): string[] {
    const result = [this.predicate + ',' + (!this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  public loadPage(report: boolean, page?: number): void {
    const pageToLoad: number = page || this.page;

    const queryParams: any = {
      page: pageToLoad - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };

    const from = this.filterForm.get(['fromDate'])!.value;
    const to = this.filterForm.get(['toDate'])!.value;
    const fromDate = from ? moment(from).format('YYYY/MM/DD') : '';
    const toDate = to ? moment(to).format('YYYY/MM/DD') : '';

    queryParams.from = fromDate;
    queryParams.to = toDate;
    queryParams.teleId = this.filterForm.get(['teleId'])!.value;
    if (report) {
      this.agentService
        .queryAgentPlayerReport(this.agentId, queryParams)
        .subscribe(
          (res: HttpResponse<IAgentPlayer[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
          () => this.onError(),
        );
    } else {
      this.agentService
        .queryAgentPlayer(this.agentId, queryParams)
        .subscribe(
          (res: HttpResponse<IAgentPlayer[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
          () => this.onError(),
        );
    }
  }

  public filterAgent(selectedMenu: boolean) {
    this.isReport = selectedMenu;
    this.loadPage(selectedMenu);
  }

  protected onSuccess(data: IAgentPlayer[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.players = data || [];
    this.isSpinning = false;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }

  doFilter() {
    this.loadPage(this.isReport);
  }
}
