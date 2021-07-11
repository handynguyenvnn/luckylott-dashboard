import {Component, OnInit} from '@angular/core';
import {IPlayer, IPlayerCredit, PlayerCredit} from '../../../shared/model';
import {FormBuilder, Validators} from '@angular/forms';
import {NzModalRef} from 'ng-zorro-antd';
import {EventManager} from '../../../core/services';
import {PlayerCreditService} from '../player-credit.service';
import {HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-player-add-credit',
  templateUrl: './player-add-credit.component.html',
  styleUrls: ['./player-add-credit.component.scss']
})
export class PlayerAddCreditComponent implements OnInit {
  isSaving: boolean;
  player?: IPlayer;
  addCreditForm = this.fb.group({
    id: [],
    amount: [null, [Validators.required]],
    fromType: [null, [Validators.required]],
    playerId: [],
  });

  constructor(
    private playerCreditService: PlayerCreditService,
    private fb: FormBuilder,
    private modal: NzModalRef,
    private eventManager: EventManager,
  ) { }

  ngOnInit(): void {}

  save(): void {
    this.isSaving = true;
    const playerCredit = this.createCreditForm();
    this.subscribeToSaveResponse(this.playerCreditService.create(playerCredit));
  }

  private createCreditForm(): IPlayerCredit {
    return {
      ...new PlayerCredit(),
      id: this.addCreditForm.get(['id'])!.value,
      amount: this.addCreditForm.get(['amount'])!.value,
      fromType: this.addCreditForm.get(['fromType'])!.value,
      playerId: this.player.id,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlayerCredit>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.eventManager.broadcast({
      name: 'playerListModification',
      content: 'Add credit to player',
    });
    this.modal.destroy();
    this.isSaving = false;
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  public destroyModal(): void {
    this.modal.destroy();
  }
}
