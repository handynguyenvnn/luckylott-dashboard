import { Component, OnInit } from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';
import {PlayerService} from '../player.service';
import {HttpResponse} from '@angular/common/http';
import {IPlayer, IPlayerReport} from '../../../shared/model';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit {
  public playerDetail: IPlayerReport | null = null;
  player: IPlayer | null = null;
  constructor(
    private playerService: PlayerService,
    private modal: NzModalRef,
  ) { }

  ngOnInit() {
    this.playerService.findPlayerDetail(this.player.teleId).subscribe(
      (response: HttpResponse<IPlayerReport>) => {
        this.playerDetail = response.body;
      });
  }

  public destroyModal(): void {
    this.modal.destroy();
  }
}
