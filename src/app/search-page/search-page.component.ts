import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BooksService } from '../__service/book/books.service';
import { Book } from '../__service/types';

@Component( {
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: [ './search-page.component.css' ],
  providers: [ BooksService ]
} )
export class SearchPageComponent {

  constructor( private books: BooksService, private route: ActivatedRoute ) { }

  queryString: string;
  searchResult: Book[];


  submitSearch( text: string ) {
    console.log( 'init-search: ', text );
    this.books.search( text ).then( ( result ) => {
      console.log( 'result-search: ', text, result );

      this.queryString = text;
      this.searchResult = result;
    } );
  }

}
