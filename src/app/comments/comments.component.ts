import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/shared/post';
import { PostService } from 'src/app/shared/post.service';
import swal from 'sweetalert';
import { CommentsService } from '../shared/comments.service';

@Component({
    selector: 'comments',
    templateUrl: './comments.component.html',
})

export class CommentComponent implements OnInit {
    
    public post: Post;
    public currentPostId: number;
    CommentForm: FormGroup;

  constructor(private service : PostService,
            private commentService: CommentsService,
              private router: Router,
              private fb:FormBuilder,
              private activatedRoute: ActivatedRoute) { 
                 this.currentPostId = +this.activatedRoute.snapshot.paramMap.get('id');
              }
              
        ngOnInit() {
           this.getPostById()
           this.createForm()
        
        }

    createForm(){
        this.CommentForm = this.fb.group({
            comment: ""
        });
    }

    getPostById() {
        this.service.GetPostById(this.currentPostId).subscribe(res => {
        this.post = res;
        });
    }

    onSubmit(formValue: any){
        const commentObj ={
        content: formValue.comment,
        createTime: new Date(),
        postId: this.currentPostId,
        userId: localStorage.getItem('userId')
          
        }
        this.commentService.postComment(commentObj).subscribe(resp => {
            this.getPostById()
            this.createForm()
        })
    }


}