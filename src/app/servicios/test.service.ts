import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private httpclient: HttpClient) { }


  getArrayDatos(){
    return this.httpclient.get<any[]>('https://jsonplaceholder.typicode.com/albums');
  }

}
