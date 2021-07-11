import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {IGame} from '../../shared/model';
import {map} from 'rxjs/operators';
import {createRequestOption} from '../../shared/util';
import * as moment from 'moment';

type EntityResponseType = HttpResponse<IGame>;
type EntityArrayResponseType = HttpResponse<IGame[]>;

@Injectable({ providedIn: 'root' })
export class GameService {
  public resourceUrl = environment.SERVER_API_URL + 'api/games';

  constructor(protected http: HttpClient) {}

  create(game: IGame): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(game);
    return this.http
      .post<IGame>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(game: IGame): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(game);
    return this.http
      .put<IGame>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IGame>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findInfo(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IGame>(`${this.resourceUrl}/${id}/info`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IGame[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(game: IGame): IGame {
    const copy: IGame = Object.assign({}, game, {
      drawDate: game.drawDate && game.drawDate.isValid() ? game.drawDate.toJSON() : undefined,
      closeDate: game.closeDate && game.closeDate.isValid() ? game.closeDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.drawDate = res.body.drawDate ? moment(res.body.drawDate) : undefined;
      res.body.closeDate = res.body.closeDate ? moment(res.body.closeDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((game: IGame) => {
        game.drawDate = game.drawDate ? moment(game.drawDate) : undefined;
        game.closeDate = game.closeDate ? moment(game.closeDate) : undefined;
      });
    }
    return res;
  }

  public checkGameOpen(): Observable<HttpResponse<any>> {
    return this.http
      .get<IGame>(`${this.resourceUrl}/have-open`, { observe: 'response' });
  }
}
