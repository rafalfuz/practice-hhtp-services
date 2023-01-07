import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class HttpMoviesService {

  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}


  // METODA GET

  getMovies():Observable<Movie[]>{
    return this.http.get<Movie[]>(this.url + '/movies')
    .pipe(tap(console.log))

  }

  // Nizej bardziej zlozona metoda aby odbierac nie tylko JSON ale wszystko z backendu, zwraca caly obiekt zapytania nie tylko BODY

  getMoviesAndMore():Observable<HttpResponse<Movie[]>>{
    return this.http.get<HttpResponse<Movie[]>>(this.url + '/movies', {observe: 'response'})
    .pipe(tap(console.log))
  }


  // METODA POST

  postMovie(movie:Movie): Observable<Movie>{
    return this.http.post<Movie>(this.url + 'movie', movie).pipe(tap(console.log))
  }

  // METODA PUT


  putMovie(movie: Movie): Observable<Movie>{
    return this.http.put<Movie>(this.url + '/movie/' + movie.id, movie)
  }

  // METODA PATCH

  patchMovie(movie: Partial<Movie>): Observable<Movie>{
    return this.http.patch<Movie>(this.url + '/movie/' + movie.id, movie)
  }

  // METODA DELETE

  deleteMovie(id: string): Observable<{}>{
    return this.http.delete<{}>(this.url + '/movies/' + id )
  }

  // WYWOLUJAC KAZDA Z TYCH METODA PAMIETAJ ZEBY SIE ZASUBSKRYBOWAC, INACZEJ METODA SIE NIE WYKONA
}
