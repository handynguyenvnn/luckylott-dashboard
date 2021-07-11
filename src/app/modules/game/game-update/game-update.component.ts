import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GameService} from '../game.service';
import {NzModalRef} from 'ng-zorro-antd';
import {EventManager} from '../../../../app/core';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {Game, IGame} from '../../../shared/model';
import {DATE_TIME_FORMAT_LONG, DATE_TIME_FORMAT_WITHOUT_TIMEZONE} from '../../../shared/constants';
import * as moment from 'moment';
import {BetType} from '../../../shared/model/enumerations/bet-type.model';
import {IPool} from '../../../shared/model/pool.model';
import {PoolService} from '../../pool/pool.service';
import {GameStatus} from '../../../shared/model/enumerations/game-status.model';

@Component({
  selector: 'app-game-update',
  templateUrl: './game-update.component.html',
  styleUrls: ['./game-update.component.scss'],
})
export class GameUpdateComponent implements OnInit {
  pools: IPool[] = [];
  game?: IGame;
  public btnLabel = 'Save';
  public isSaving = false;
  status: string;
  gameResults: FormArray;
  public gameForm: FormGroup;

  constructor(
    protected gameService: GameService,
    protected poolService: PoolService,
    private fb: FormBuilder,
    private modal: NzModalRef,
    private eventManager: EventManager,
  ) {}

  public ngOnInit(): void {
    this.gameForm = this.fb.group({
      id: [],
      gameCode: [null, [Validators.required]],
      drawDate: [null, [Validators.required]],
      closeDate: [null, [Validators.required]],
      gameStatus: [null, [Validators.required]],
      poolId: [null, Validators.required],
      gameResult: [],
      gameResults: this.fb.array([])
    });
    this.poolService.queryNoPaging().subscribe((res: HttpResponse<IPool[]>) => (this.pools = res.body || []));
    this.gameResults = this.gameForm.get('results') as FormArray;
    if (this.game) {
      this.btnLabel = 'Update';
      this.status = this.game.gameStatus;
      this.updateForm(this.game);
    }
  }

  public updateForm(game: IGame): void {
    this.gameForm.patchValue({
      id: game.id,
      gameCode: game.gameCode,
      poolId: game.poolId,
      drawDate: game.drawDate ? game.drawDate.format(DATE_TIME_FORMAT_LONG) : null,
      closeDate: game.closeDate ? game.closeDate.format(DATE_TIME_FORMAT_LONG) : null,
      gameResult: game.gameResult,
      gameStatus: game.gameStatus,
    });
    const gameResults = game.gameResults;

    const gameResultsArray: FormGroup[] = [];
    for (const gameResult of gameResults) {
      gameResultsArray.push(this.createGameResult(gameResult.betType, game));
    }
    this.gameForm.setControl('gameResults', this.fb.array([
      this.createGameResult(BetType.NUM_2, game),
      this.createGameResult(BetType.NUM_3, game),
      this.createGameResult(BetType.NUM_4, game)
    ]));

    if (gameResultsArray.length > 0) {
      this.gameForm.setControl('gameResults', this.fb.array(gameResultsArray));
    }
  }

  public save(): void {
    this.isSaving = true;
    const game = this.createGameForm();

    if (game.gameStatus !== GameStatus.CLOSED) {
      game.gameResults = [];
    }

    if (game.id) {
      this.subscribeToSaveResponse(this.gameService.update(game));
    } else {
      this.subscribeToSaveResponse(this.gameService.create(game));
    }
  }

  private createGameForm(): IGame {
    const drawDateMM = this.gameForm.get(['drawDate'])!.value ?
      moment(this.gameForm.get(['drawDate'])!.value, DATE_TIME_FORMAT_LONG) : undefined;
    const closeDateMM = this.gameForm.get(['closeDate'])!.value ?
      moment(this.gameForm.get(['closeDate'])!.value, DATE_TIME_FORMAT_LONG) : undefined;
    return {
      ...new Game(),
      id: this.gameForm.get(['id'])!.value,
      gameCode: this.gameForm.get(['gameCode'])!.value,
      poolId: this.gameForm.get(['poolId'])!.value,
      drawDate: this.gameForm.get(['drawDate'])!.value ?
        moment(this.gameForm.get(['drawDate'])!.value, DATE_TIME_FORMAT_LONG) : undefined,
      closeDate: this.gameForm.get(['closeDate'])!.value ?
        moment(this.gameForm.get(['closeDate'])!.value, DATE_TIME_FORMAT_LONG) : undefined,
      drawDateString: drawDateMM ? drawDateMM.format(DATE_TIME_FORMAT_WITHOUT_TIMEZONE) : '',
      closeDateString: closeDateMM ? closeDateMM.format(DATE_TIME_FORMAT_WITHOUT_TIMEZONE) : '',
      gameStatus: this.gameForm.get(['gameStatus'])!.value,
      gameResult: this.gameForm.get(['gameResult'])!.value,
      gameResults: this.tempGameResultForm.length > 0 ? this.gameForm.get(['gameResults'])!.value : [],
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGame>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError(),
    );
  }

  protected onSaveSuccess(): void {
    this.eventManager.broadcast({
      name: 'gameListModification',
      content: 'Changing an game',
    });
    this.isSaving = false;
    this.destroyModal();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  public destroyModal(): void {
    this.modal.destroy();
    this.modal.close();
  }

  createGameResult(prizeGame: BetType, game?: IGame): FormGroup {
    return this.fb.group({
      id: [],
      result: [],
      betType: [prizeGame, [Validators.required]],
      gameId: [game ? game.id : '']
    });
  }

  get tempGameResultForm() {
    return this.gameForm.get('gameResults') as FormArray;
  }

  cancel() {}
}
