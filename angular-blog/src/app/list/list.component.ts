import { Component, OnInit } from '@angular/core';
import { BlogService, Post } from '../blog.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})


export class ListComponent implements OnInit {
  post_list: Post[];
  
  constructor(private bs : BlogService) 
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
      console.log(second);
      this.post_list = second;

    });
    
  }
  
  newPost(): void
  {

  }

}
function parseJWT(token) 
{
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
}
