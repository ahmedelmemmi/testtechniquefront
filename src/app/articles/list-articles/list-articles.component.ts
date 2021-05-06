import { Component, HostBinding, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/Services/ArticleService';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.scss']
})
export class ListArticlesComponent implements OnInit {

  @HostBinding('class') classes = 'row';
   user:string;
  articles: any = [{ }];

title:string
  constructor(private articleService: ArticlesService) { }


  ngOnInit() {
    
    
    this.getGames();
    console.log(this.getGames());
    
  }

  getGames() {
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

  deleteGame(id: string) {
    this.articleService.deleteArticle(id)
      .subscribe(
        res => {
          console.log(res);
          this.getGames();
        },
        err => console.error(err)
      )
  }

}
