import { Component, OnInit } from '@angular/core';
import { BlogService, Post } from '../blog.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  c_post: Post;
  post_id: number;
  constructor(private bs : BlogService, private router: Router, private route: ActivatedRoute) 
  { 
    let id;
    console.log("test");
    let username = parseJWT(document.cookie).usr;
    this.route.params.subscribe( posti =>
      {
          id = (posti.id);
          let holder = Promise.resolve(this.bs.getPost(username,id));
          this.post_id =id;
          let post;
          holder.then(post =>
            {
              
              this.c_post=post;
              
        
            });
      });
  }

  ngOnInit(): void {
  }

  save(): void
  {
    
    let username = parseJWT(document.cookie).usr;
    this.bs.updatePost(username,this.c_post);
    
  }

  preview(): void
  {
    
  }

  delete(): void
  {
    let username = parseJWT(document.cookie).usr;
    this.bs.deletePost(username,this.post_id);
  }

}
function parseJWT(token) 
{
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
}
