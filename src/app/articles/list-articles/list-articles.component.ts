import { Component, HostBinding, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/Services/ArticleService';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.scss']
})
export class ListArticlesComponent implements OnInit {

  @HostBinding('class') classes = 'row';
   user:string;
  articles: any = [{ }];
  allarticles;
title:string
  constructor(private articleService: ArticlesService,private http: HttpClient,private spinner: NgxSpinnerService) { }
  notEmptyPost = true;
  notscrolly = true;

  ngOnInit() {
    
    
    this.getArticles();
    console.log(this.getArticles());
    
  }

  getArticles() {
    this.user= localStorage.getItem("userConnected").toString();
    console.log(this.user);
    this.articleService.getArticles()
      .subscribe(
        res => {
          console.log(this.articles.posts);
          
          this.articles = res;
        },
        err => console.error(err)
      );
  }
  myFunction(x:any) {
    console.log("test");
    
    x.classList.toggle("fa-thumbs-down");
  }
  deleteArticle( id: string) {
    
    this.articleService.deleteArticle(id)
      .subscribe(
        res => {
          console.log(res);
          this.getArticles();
          window.location.reload()
        },
        err => console.error(err)
      )
  }
  onScroll() {
    console.log("scrolled");
    
    // if (this.notscrolly && this.notEmptyPost) {
    //   this.spinner.show();
    //   this.notscrolly = false;
    //   // this.loadNextPost();
    //  }
    }
    // loadNextPost() {
    //   const url = 'http://tlino.96.lt/api/getnextpost';
    //   // return last post from the array
    //   const lastPost = this.allarticles[this.allarticles.length - 1];
    //   // get id of last post
    //   const lastPostId = lastPost.id;
    //   // sent this id as key value pare using formdata()
    //   const dataToSend = new FormData();
    //   dataToSend.append('id', lastPostId);
    //   // call http request
    //   this.http.post(url, dataToSend)
    //   .subscribe( (data: any) => {
    //      const newPost = data[0];
    //      this.spinner.hide();
    //      if (newPost.length === 0 ) {
    //        this.notEmptyPost =  false;
    //      }
    //      // add newly fetched posts to the existing post
    //      this.allarticles = this.allarticles.concat(newPost);
    //      this.notscrolly = true;
    //    });
    // }
}
  

