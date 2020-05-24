import { Component, OnInit } from '@angular/core';
import { BlogService, Post } from '../blog.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})


export class ListComponent implements OnInit {
  post_list: Post[];
  
  constructor(private bs : BlogService,  private router: Router) 
  { 
    
  }

  ngOnInit(): void 
  {
    let username = parseJWT(document.cookie).usr;
  
    let holder = Promise.resolve(this.bs.fetchPosts(username));
    this.post_list = [];
    let second;
    holder.then(second =>
    {
      
      this.post_list = second;

    });
    
  }
  openPost(postid)
  {
    let username = parseJWT(document.cookie).usr;
  
    let holder = Promise.resolve(this.bs.getPost(username,postid));
    let post;
    
    holder.then(post =>
      {
        
        this.bs.setCurrentDraft(post);
  
      });
      this.router.navigate(['/edit/', postid]);
  }
  newPost(): void
  {
    let username = parseJWT(document.cookie).usr;
    let i = this.post_list.length -1;
    let postid=0;
    if (i!=-1)
    {
      postid = this.post_list[i].postid + 1;
    }
    console.log(postid);
    let created = new Date(Date.now());
    let post =  {postid: postid, created: created, modified: created,title: "title",body:"body"};
    console.log(post);
    this.bs.setCurrentDraft(post);
    this.bs.newPost(username,post);
    this.router.navigate(['/edit/', postid]);
  }

}
function parseJWT(token) 
{
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
}