import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {


  readonly rootURL = "https://localhost:44302/api"

  constructor(private http : HttpClient) { }


  getComments(): Observable<any>{
      return this.http.get(this.rootURL+'/Comment');
  }

  postComment(obj: any): Observable<any>{
    return this.http.post(this.rootURL+'/Comment', obj);
}


}
