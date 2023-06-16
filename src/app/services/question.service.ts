import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  public getQuestionOfQuiz(quid: any){
    return this._http.get('http://localhost:8080/question/quiz/all/'+quid);
  }

  public getQuestionOfQuizForTest(quid: any){
    return this._http.get('http://localhost:8080/question/quiz/'+quid);
  }

  public addQuestion(question:any){
    return this._http.post('http://localhost:8080/question/',question);
  }

  public deleteQuestion(questionId:any){
    return this._http.delete('http://localhost:8080/question/'+questionId);
  }

  public updateQuestion(question:any){
    return this._http.put('http://localhost:8080/question/',question);
  }

  public getOneQuestionOfQuiz(quesid: any){
    return this._http.get('http://localhost:8080/question/'+quesid);
  }

  public evalQuiz(questions:any){
    return this._http.post('http://localhost:8080/question/eval-quiz',questions);
  }
}
