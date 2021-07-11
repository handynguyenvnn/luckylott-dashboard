import { Component, OnInit } from '@angular/core';
import { IPlayer, Player} from '../../../shared/model';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import { PlayerCreditService } from '../player-credit.service';
import { EditComponent } from 'src/app/shared/abstract/edit.component';
import { FormBuilder, Validators } from '@angular/forms';
import { EventManager } from 'src/app/core';
import { NzModalRef } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-update-player',
  templateUrl: './update-player.component.html',
  styleUrls: ['./update-player.component.scss']
})
export class UpdatePlayerComponent extends EditComponent implements OnInit {
  isSaving: boolean;
  player?: any;
  editForm = this.fb.group({
    id: [],
    teleId: ['', [Validators.required]],
    teleName: ['', [Validators.required]],
    refCode: ['', [Validators.required]],
    username: ['', [Validators.required]],
  });

  constructor(
    private playerService: PlayerService,
    private fb: FormBuilder,
    public modal: NzModalRef,
    public eventManager: EventManager,
    public route: ActivatedRoute
  ) {
    super(eventManager, route, modal)
   }

  ngOnInit(): void {
    this.editForm.patchValue({
      teleId: this.player.teleId,
      teleName: this.player.teleName,
      refCode: this.player.refCode,
      username: this.player.username,
    })
  }

  save(): void {
    this.isSaving = true;
    const player = this.createForm();
    const service  = this.player.id ? 'update' : 'create';
    this.playerService[service](player)
    .subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  private createForm(): IPlayer {
    return {
      ...new Player(),
      id: this.player.id,
      teleId: this.editForm.get(['teleId'])!.value,
      teleName: this.editForm.get(['teleName'])!.value,
      refCode: this.editForm.get(['refCode'])!.value,
      username: this.editForm.get(['username'])!.value,
    };
  }
  onSaveSuccess(): void {
    super.onSaveSuccess();
    this.eventManager.broadcast({
      name: 'playerListModification',
      content: `${this.player.id ? 'Update' : 'Add'} player`,
    });
  }
}
