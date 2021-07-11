import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {AgentService} from './agent.service';
import {ITEMS_PER_PAGE} from '../../shared/constants';
import {EventManager} from '../../core/services';
import {NzModalService} from 'ng-zorro-antd';
import {AgentUpdateComponent} from './agent-update/agent-update.component';
import { Subscription } from 'rxjs';
import {Agent, IAgent} from '../../shared/model';
import {AgentUpdatePwdComponent} from './agent-update-pwd/agent-update-pwd.component';
import {Account, AccountService, IUser, User, UserService} from '../../core';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit, OnDestroy {
  currentAccount: Account | null = null;
  isSpinning = true;
  agents: IAgent[];
  public totalItems = 0;
  public itemsPerPage = ITEMS_PER_PAGE;
  public page!: number;
  public predicate!: string;
  public ascending!: boolean;
  public ngbPaginationPage = 1;

  public eventSubscriber?: Subscription;
  constructor(
    protected agentService: AgentService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: EventManager,
    private modalService: NzModalService,
    private userService: UserService,
    private accountService: AccountService,
  ) {}

  public ngOnInit(): void {
    this.accountService.identity().then((account) => {
      this.currentAccount = account;
    });
    this.activatedRoute.data.subscribe((data: any) => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage();
    });
    this.registerChangeInAgent();
  }

  registerChangeInAgent(): void {
    this.eventSubscriber = this.eventManager.subscribe('agentListModification', () => {
      this.loadPage();
    });
  }
  public trackId(index: number, item: IAgent): number {
    return item.id;
  }

  public sort(): string[] {
    const result = [this.predicate + ',' + (!this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  public loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.agentService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IAgent[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError(),
      );
  }

  protected onSuccess(data: IAgent[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.agents = data || [];
    this.isSpinning = false;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }

  public addAgentModal(agent?: IAgent): void {
    let title = 'Add Agent';
    if (agent) {
      title = 'Update Agent';
    }
    const modal = this.modalService.create({
      nzTitle: title,
      nzWidth: '650px',
      nzStyle: {top: '20px'},
      nzContent: AgentUpdateComponent,
      nzComponentParams: { agent },
    });
  }

  public agentChangePwdModal(login?: string): void {
    const title = 'Update Agent Password';
    const modal = this.modalService.create({
      nzTitle: title,
      nzWidth: '650px',
      nzStyle: {top: '20px'},
      nzContent: AgentUpdatePwdComponent,
      nzComponentParams: { login },
    });
  }

  public ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  setActive(agent: Agent, isActivated: boolean): void {
    this.userService.find(agent.userLogin).subscribe(
      (data: HttpResponse<IUser>) => {
        console.log(data.body);
        this.userService.update({ ...data.body, activated: isActivated }).subscribe(() => this.loadPage());
      }
    );
  }
}
