import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsServices } from '../shared/posts.service';
import { PostDTO } from '../interfaces/posts.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  userDetails;
  public listOfPosts: Array<PostDTO> = [];

  constructor(private router: Router, private postservice: PostsServices) { }

  ngOnInit() {
  }


  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
}
