import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }

  private generateUrl(requestParameter: Partial<RequestParameters>): string {
    if (requestParameter.fullEndpoint)
      return requestParameter.fullEndpoint;
    let url: string = `${requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl}`;
    let controller: string = requestParameter.controller;
    let action: string = `${requestParameter.action ? `/${requestParameter.action}` : ''}`;
    let fullUrl: string = `${url}/${controller}${action}`;
    if (requestParameter.queryString)
      fullUrl += `?${requestParameter.queryString}`;
    return fullUrl;
  }

  // Partial --> Fonksiyonun çağrımı sırasında nesnenin önceden oluşturulmasını zorunlu kılmaz. { controller="test";} şeklinde bir input oluşturularak kullanılabilir.
  get<T>(requestParameter: Partial<RequestParameters>, id?: string): Observable<T> {
    let url = `${this.generateUrl(requestParameter)}${id ? `/${id}` : ''}`;
    return this.httpClient.get<T>(url, { headers: requestParameter.headers });
  }

  post<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    let url = this.generateUrl(requestParameter);
    return this.httpClient.post<T>(url, body, { headers: requestParameter.headers });
  }

  put<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    let url = this.generateUrl(requestParameter);
    return this.httpClient.put<T>(url, body, { headers: requestParameter.headers });
  }

  delete<T>(requestParameter: Partial<RequestParameters>, id?: string): Observable<T> {
    let url = `${this.generateUrl(requestParameter)}${id ? `/${id}` : ''}`;
    return this.httpClient.delete<T>(url, { headers: requestParameter.headers });
  }
}

export class RequestParameters {
  controller?: string;
  action?: string;
  queryString?: string;

  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndpoint?: string;
}