import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PasswordDTO } from '../dtos/password-dto';
import { HttpApi } from './http-api';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private readonly URL = '/passwords';

  constructor(
    private http: HttpApi
  ) { }

  getCurrentPassword(): Observable<PasswordDTO> {
    return this.http.get( this.URL + '/current').pipe(map(data => data as PasswordDTO));
  }

  newPassword(passwordType: any): Observable<PasswordDTO> {
    const body  ={ passwordType }
    return this.http.post( this.URL + '/new-password', body).pipe(map(data => data as PasswordDTO));
  }

  nextPassword(): Observable<any> {
    return this.http.post( this.URL + '/next-password', {}).pipe(map(data => data as any));
  }

  resetSequence(): Observable<any> {
    return this.http.post( this.URL + '/reset-sequence', {}).pipe(map(data => data as any));
  }
}
