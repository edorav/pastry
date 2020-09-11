import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Paginated } from './paginated';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export abstract class NgHttpClientService<T extends {id: number}> {

  private absolutePath = environment.absolutePath;

  constructor(
    public http: HttpClient
  ) {
  }

  protected getHeaders(): HttpHeaders {
    return new HttpHeaders({
      // 'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + (localStorage.getItem('api_token') ? localStorage.getItem('api_token') : null)
    });
  }

  public abstract getEndPoint(): string;


  public getEndPointUri(): string {
    return this.absolutePath + this.getEndPoint() + '/';
  }

  /** GET heroes from the server */
  public get(): Observable<T[]> {
    const url = `${this.absolutePath}${this.getEndPoint()}`;

    return this.http.get<T[]>(url, { headers: this.getHeaders() });
  }

  /** GET heroes from the server */
  public getPaginated(params, role?: string): Observable<any> {
    const url = `${this.absolutePath}${this.getEndPoint()}`;

    return this.http.get<Paginated>(url, { headers: this.getHeaders(), params: this.getPaginationParams(params) });
  }

  protected getPaginationParams(params): HttpParams {
    let httpParams = new HttpParams()
    .set('sortBy', params.sortBy)
    .set('sortOrder', params.sortOrder)
    .set('size', params.size ? params.size : 10000)
    .set('page', params.page ? params.page : 1)
    .set('searchField', params.searchField ? params.searchField : '')
    .set('searchTerm', params.searchTerm ? params.searchTerm : '')
    .set('searchRelation', params.relation ? params.relation : 'like');

    if (params.userId) {
      httpParams = httpParams.append('userId', params.userId);
    }
    if (params.onlyAvailable) {
      httpParams = httpParams.append('onlyAvailable', params.onlyAvailable);
    }

    return httpParams;
  }


  /** GET hero by id. Will 404 if id not found */
  findOneById(id: number, role?: string): Observable<T> {
    const url = `${this.absolutePath}${this.getEndPoint()}/${id}`;
    return this.http.get<T>(url, { headers: this.getHeaders() });
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  save(collection: T): Observable<T> {
    if (collection.id) {
      return this.http.put<T>(`${this.absolutePath}${this.getEndPoint()}/${collection.id}`, collection, { headers: this.getHeaders() });
    } else {
      return this.http.post<T>(this.absolutePath + this.getEndPoint(), collection, { headers: this.getHeaders() });
    }
  }

  /** DELETE: delete the hero from the server */
  delete(entityId: number, params?): Observable<T> {
    return this.http.request<T>('delete', this.absolutePath + this.getEndPoint() + '/' + entityId, {
      body: params ? params : {},
      headers: this.getHeaders()
    });
  }

}

