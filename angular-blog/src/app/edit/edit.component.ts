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
  constructor(private bs : BlogService, private router: Router, private route: ActivatedRoute) 
  { 
    let id;
    console.log("test");
    let username = parseJWT(document.cookie).usr;
    this.route.params.subscribe( postid =>
      {
          id = (postid.id);
          let holder = Promise.resolve(this.bs.getPost(username,id));
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

  }

  preview(): void
  {
    
  }

  delete(): void
  {
    
  }

}
function parseJWT(token) 
{
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
}
