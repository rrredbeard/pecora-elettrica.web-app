import { Injectable } from '@angular/core';
import { EBook, Book } from '../types';

const DELAY_MS = 700;

function delayedValue<T>( strategy: () => T ): Promise<T> {
  return new Promise( ( resolve, reject ) => {
    setTimeout( () => {
      let result: T;

      try {
        result = strategy();
      } catch ( e ) {
        reject( e );
      }

      resolve( result );
    }, DELAY_MS );
  } );
}


@Injectable()
export class BooksService {


  private readonly cache: { [ isbn: string ]: EBook } = {};



  getAll(): Promise<Book[]> {
    // TODO
    return delayedValue( () => Object.values( this.cache ) );
  }

  search( qs: string ): Promise<Book[]> {
    return delayedValue( () => Object.values( this.cache ).filter(
      ( book ) => !!book.title // && book.title.toLowerCase().includes( qs.toLowerCase() )
    ) );
  }

  add( book: Book ): Promise<void> {
    return delayedValue( () => {
      if ( !!this.cache[ book.isbn ] ) {
        throw new Error( 'Already exist!' );
      }

      this.cache[ book.isbn ] = Object.assign( {
        prev_edition: null
      }, book ) as EBook;

    } );
  }

  get( isbn: Book[ 'isbn' ] ): Promise<Book> {
    return delayedValue( () => {
      const book = this.cache[ isbn ];
      if ( !book ) {
        throw new Error( 'Not Found!' );
      }
      return book as Book;
    } );
  }



  constructor() {
    const books = [
      {
        title: 'Quo rerum sed reprehenderit.',
        author: 'Dr. Carlie Heller',
        publication_date: '1989-07-08',
        isbn: '441d8a1a2d21df26c',
        pages_no: 345,
        replies: 4,
        prev_edition: '3e00b2b75582c98a2'
      },
      {
        title: 'Molestias ut numquam maxime aut.',
        author: 'Mrs. Lizeth Batz',
        publication_date: '2018-03-23',
        isbn: '9a375356b99909054',
        pages_no: 394,
        replies: 4,
        prev_edition: '493939115f268c19c'
      },
      {
        title: 'Magnam quod aut in.',
        author: 'Dr. Dan Ledner II',
        publication_date: '1992-02-11',
        isbn: '3e00b2b75582c98a2',
        pages_no: 554,
        replies: 4,
        prev_edition: '0559910017ec93d8a'
      },
      {
        title: 'Est minima harum sed.',
        author: 'Kendra Davis',
        publication_date: '1987-07-28',
        isbn: 'e8cc4f7638c0f5edd',
        pages_no: 115,
        replies: 4,
        prev_edition: '493939115f268c19c'
      },
      {
        title: 'Distinctio autem distinctio.',
        author: 'Polly Effertz',
        publication_date: '1982-05-28',
        isbn: '493939115f268c19c',
        pages_no: 1362,
        replies: 4
      },
      {
        title: 'Delectus quo dolor enim molestiae.',
        author: 'Aubree Kessler',
        publication_date: '1992-12-02',
        isbn: '9f8e513ddaea03c4e',
        pages_no: 2793,
        replies: 4
      },
      {
        title: 'Similique excepturi odio id distinctio.',
        author: 'Zetta Beer',
        publication_date: '2013-07-21',
        isbn: '0559910017ec93d8a',
        pages_no: 296,
        replies: 4
      },
      {
        title: 'Animi vitae aut repellendus.',
        author: 'Johnnie Fahey',
        publication_date: '2012-09-26',
        isbn: '485dfb048013e231f',
        pages_no: 1695,
        replies: 4
      },
      {
        title: 'Ea eos quia doloremque tenetur quo.',
        author: 'Mona Collins',
        publication_date: '1987-09-21',
        isbn: '18657716e287560ad',
        pages_no: 730,
        replies: 4
      },
      {
        title: 'Iure sunt dolorum eos explicabo ab.',
        author: 'Jailyn Daniel',
        publication_date: '2016-04-04',
        isbn: '98ec541cfa60f0798',
        pages_no: 1800,
        replies: 4
      }
    ];


    books.map( ( b ) => ( {
      isbn: b.isbn,
      title: b.title,
      author: b.author,
      pages_no: b.pages_no,
      replies: b.replies,
      publication_date: new Date( b.publication_date ),
      prev_edition: b.prev_edition || null
    } as EBook ) ).forEach(
      ( eb ) => this.cache[ eb.title ] = eb
    );
  }
}
