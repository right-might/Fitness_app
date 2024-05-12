import { Component} from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { PagePrincipaleBasPageComponent } from "../page-principale-bas-page/page-principale-bas-page.component";
import { PagePrincipaleEnteteComponent } from "../page-principale-entete/page-principale-entete.component";
import { PagePrincipaleCorpsComponent } from "../page-principale-corps/page-principale-corps.component";
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-page-principale-hote',
  standalone: true,
  imports: [
    RouterOutlet,
    PagePrincipaleBasPageComponent,
    PagePrincipaleEnteteComponent,
    PagePrincipaleCorpsComponent,
  ],
  templateUrl: './page-principale-hote.component.html',
  styleUrl: './page-principale-hote.component.css',
  providers:[
    HttpClient
  ]
})

export class PagePrincipaleHoteComponent {

}
