import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/shared/post.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public categories: Array<any> = [];
  public postForm: FormGroup;
  public postObject: any;
  public file: any;

  constructor(private service: PostService,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
    this.getAllCategories()
  }

  resetForm() {
    this.postObject = {
      title: '',
      content: '',
      createTime: new Date(),
      updateTime: new Date(),
      userId: localStorage.getItem("userId")
    }
  }

  getAllCategories() {
    this.service.getCategories().subscribe(res => {
      this.categories = res;
    });
  }
  

 

  onSubmit() {
    if(!this.file){
      this.toastr.error('Please upload file');
    }
    this.insertRecord();
  }

  insertRecord() {
     const categories: any[] = [];
    this.categories.forEach(element => {
      if(element.value){
        categories.push({
          categoryId: element.id
        })
      }
    });

    this.postObject.categoryPosts = categories; 
    const formData = new FormData();
    formData.append('files', this.file);       
    formData.append('data', JSON.stringify(this.postObject));       

    this.service.post(formData).subscribe(res => {
      this.toastr.success('Post inserted successfully');
      this.router.navigateByUrl("/home")
    })

  }


  onFileSelect(event) {
    this.file = null;
    if (event.target.files.length > 0) {
       this.file = event.target.files[0];
       
    }
  }
}
