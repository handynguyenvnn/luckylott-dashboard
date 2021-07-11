import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { EventManager } from 'src/app/core';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { PoolService } from 'src/app/modules/pool/pool.service';
import { IPool, Pool } from 'src/app/shared/model/pool.model';
import { EditComponent } from 'src/app/shared/abstract/edit.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pool-update',
  templateUrl: './pool-update.component.html',
  styleUrls: ['./pool-update.component.scss']
})
export class PoolUpdateComponent extends EditComponent implements OnInit {
    isSaving: boolean;
    pool?: IPool;
    tokens: any[]  = [];
    editForm = this.fb.group({
      id: [],
      betAmount:  [0, [Validators.required]],
      initDeposit:  [0, [Validators.required]],
      balance: [null, [Validators.required]],
      name:  ['', [Validators.required]],
      poolType:  ['', [Validators.required]],
      tokenId:  [undefined, [Validators.required]],
    });

    constructor(
      private poolService: PoolService,
      private fb: FormBuilder,
      public modal: NzModalRef,
      public eventManager: EventManager,
      public route: ActivatedRoute
    ) {
      super(eventManager, route, modal);
     }

    ngOnInit(): void {
      this.editForm.patchValue({
        betAmount:  this.pool.betAmount,
        initDeposit:  this.pool.initDeposit,
        balance: this.pool.balance,
        name:  this.pool.name,
        poolType:  this.pool.poolType,
        tokenId: this.pool.tokenId,
      });
      this.getTokens();
    }
    getTokens() {
      this.poolService.getTokens()
      .subscribe((res: any) => {
        this.tokens = res.body || [];
      });
    }
    save(): void {
      this.isSaving = true;
      const pool = this.createForm();
      const service  = this.pool.id ? 'update' : 'create';
      this.poolService[service](pool)
      .subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    }

    private createForm(): IPool {
      return {
        ...new Pool(),
        id: this.pool.id,
        betAmount: this.editForm.get(['betAmount'])!.value,
        initDeposit: this.editForm.get(['initDeposit'])!.value,
        name: this.editForm.get(['name'])!.value,
        balance: this.editForm.get(['balance'])!.value,
        poolType: this.editForm.get(['poolType'])!.value,
        tokenId: this.editForm.get(['tokenId'])!.value,

      };
    }
    onSaveSuccess(): void {
      super.onSaveSuccess();
      this.eventManager.broadcast({
        name: 'poolListModification',
        content: `${this.pool.id ? 'Update' : 'Add'} pool`,
      });
    }
  }
