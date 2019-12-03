import { Component, Input } from '@angular/core';
import { Book } from 'src/app/__service/types';

@Component( {
  // tslint:disable-next-line: component-selector
  selector: '[app-books-list]',
  templateUrl: './books-list.component.html',
  styleUrls: [ './books-list.component.css' ]
} )
export class BooksListComponent {

  @Input() books: Book[];


  showBook( isbn: string ) {
    console.log( 'Redirect to -> /book/%s ', isbn );
  }

}
