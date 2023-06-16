import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) { }
  public quizzes(){
    return this._http.get('http://localhost:8080/quiz/')
  }

  public addQuiz(quiz:any){
    return this._http.post('http://localhost:8080/quiz/',quiz);
  }

  public deleteQuiz(quid:any){
    return this._http.delete('http://localhost:8080/quiz/'+quid);
  }

  public getQuiz(quid:any){
    return this._http.get('http://localhost:8080/quiz/'+quid);
  }

  public updateQuiz(quiz:any){
    return this._http.put('http://localhost:8080/quiz/',quiz);
  }

  public getQuizzesOfCategory(cid:any){
    return this._http.get('http://localhost:8080/quiz/category/'+cid);
  }

  public getActiveQuizzes(){
    return this._http.get('http://localhost:8080/quiz/active')
  }

  public getActiveQuizzesOfCategory(cid:any){
    return this._http.get('http://localhost:8080/quiz/category/active/'+cid);
  }
}
