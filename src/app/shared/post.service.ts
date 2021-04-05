import { Injectable } from '@angular/core';
import { Post } from './post';
import { HttpClient, HttpResponse} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  formData : Post;
  list : Post[];
  isEditing: boolean = false;
  readonly rootURL = "https://localhost:44302/api"

  constructor(private http : HttpClient) { }

  post(formData : any){
    return this.http.post(this.rootURL+'/Post/upload',formData)
  }

  update(formData : Post){
    return this.http.put(this.rootURL +  `/Post/${this.formData.id}`,this.formData)
  }

  getPosts(searchText?: string): Observable<any>{
    if(!searchText)
      return this.http.get(this.rootURL+'/Post');
    return this.http.get(this.rootURL+'/Post?searchString=' + searchText);
    //.toPromise().then(res => this.list = res as Post[]);
  }

  getCategories(): Observable<any>{
    return this.http.get(this.rootURL+'/Category');
  }

  getPostsByCategory(id:number): Observable<any>{
    return this.http.get(this.rootURL+'/Post/category/'+ id);
  }


  removePost(postId: number): Observable<any>{
    return this.http.delete(this.rootURL + `/Post/${postId}`);
  }

  GetPostById(postId: number): Observable<any>{
    return this.http.get(this.rootURL + `/Post/${postId}`);
  }
}
