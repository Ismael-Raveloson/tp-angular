import { Routes } from '@angular/router';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { GraphComponent } from './components/graph/graph.component';

export const routes: Routes = [
    {path : 'articles' , component: ArticleListComponent},
    {path : '' , redirectTo:'articles', pathMatch: 'full'},
    {path:'graph' , component: GraphComponent}
];
