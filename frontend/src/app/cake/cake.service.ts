import { Injectable } from '@angular/core';
import { Cake } from './cake';
import { NgHttpClientService } from '../ng-http-client.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CakeService extends NgHttpClientService<Cake> {

  constructor(
    http: HttpClient
  ) {
    super(http);
   }

   getEndPoint(): string {
    return 'cake';
  }
}
