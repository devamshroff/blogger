import { Component, OnInit } from '@angular/core';
import { BlogService, Post } from '../blog.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  c_post : Post;
  post_id : number;
  constructor(private bs : BlogService, private router: Router, private route: ActivatedRoute) 
  { 
    let id;
    console.log("test");
    let username = parseJWT(document.cookie).usr;
    this.route.params.subscribe( posti =>
      {
          id = (posti.id);
          this.post_id =id;
          this.c_post=this.bs.getCurrentDraft();
          
      });
  }

  ngOnInit(): void {
  }
  edit(): void {
    this.router.navigate(['/edit/', this.post_id]);
  }

}
function parseJWT(token) 
{
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
}
