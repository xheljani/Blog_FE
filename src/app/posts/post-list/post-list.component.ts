import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/post';
import { PostService } from 'src/app/shared/post.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  public allPosts: Array<Post> = [];
  public categories: Array<any> = [];
  public searchText: string = "";
  public selectedCategory: string = "Filter by category"

  constructor(private service: PostService,
    private router: Router) { }

  ngOnInit() {
    this.getAllPosts();
    this.getAllCategories();
  }

  getAllPosts() {
    this.service.getPosts(this.searchText).subscribe(res => {
      this.allPosts = res;
    });
  }

  filterByCategory(id: number, name?: string) {
    if (id == 0) {
      this.selectedCategory = "All Categories";
      this.getAllPosts();
    }
    else {
      this.selectedCategory= name
      this.searchText = "";
      this.service.getPostsByCategory(id).subscribe(res => {
        this.allPosts = res;
      });
    }
  }

  getAllCategories() {
    this.service.getCategories().subscribe(res => {
      this.categories = res;
    });
  }


  removePost(post: Post) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.service.removePost(post.id).subscribe();
          setTimeout(() => {
            this.getAllPosts();
          }, 200);
          swal("Deleted", {
            icon: "success",
          });
        } else {
          swal("Post wasnt deleted");
        }
      });
  }

  viewPost(post: Post) {
    this.router.navigate(['/comments/', post.id]);
  }
}
