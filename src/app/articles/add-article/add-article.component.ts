import { Component, OnInit, HostBinding } from '@angular/core';
import {Article} from '../../models/Article';
import{ArticlesService} from '../../Services/ArticleService'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {
  @HostBinding('class') clases = 'row';

  article: Article = {
    id: "0",
    title: '',
    description: '',
    created_at: new Date(),
    publiePar:localStorage.getItem("userConnected")
  };

  edit: boolean = false;
  constructor(private articleService: ArticlesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.articleService.getArticle(params.id)
        .subscribe(
          res => {
            console.log(res);
            this.article = res;
            this.edit = true;
          },
          err => console.log(err)
        )
    }
  }
  saveNewArticle() {
    delete this.article.created_at;
    delete this.article.id;
    this.article.publiePar=localStorage.getItem("userConnected");
    this.articleService.saveArticle(this.article)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/']);
        },
        err => console.error(err)
      )
  }

  updateArticle() {
    delete this.article.created_at;
    this.articleService.updateArticle(this.article.id, this.article)
      .subscribe(
        res => { 
          console.log(res);
          this.router.navigate(['/posts']);
        },
        err => console.error(err)
      )
  }

}
