import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder } from "@angular/forms";

@Injectable()

export class PostsServices{
    
    constructor(private fb: FormBuilder, private http: HttpClient) { }
    readonly BaseURI = 'https://localhost:44302/api';

    getAllPosts() {
        return this.http.get(this.BaseURI + '/Post');
      }
}