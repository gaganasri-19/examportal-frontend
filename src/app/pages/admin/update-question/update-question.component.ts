import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit{
  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService, 
    private _cat:CategoryService, 
    private _question:QuestionService,
    private _snack:MatSnackBar,
    private _router:Router){}

    categories: any[] = [];
    qId:any;
    qTitle:any;
    question={
      quiz:{
        quid:''
      },
      content:'',
      option1:'',
      option2:'',
      option3:'',
      option4:'',
      answer:'',
    };
    quid=0;
    quiz: any;
    quesid:any;

  ngOnInit(): void {
    this.qId=this._route.snapshot.params['quid'];
    this.qTitle=this._route.snapshot.params['title'];
   this.quesid=this._route.snapshot.params['quesid'];

   //this.question.quiz['quid']=this.qId;

   this._question.getOneQuestionOfQuiz(this.quesid).subscribe((data:any)=>{
    this.question=data;
    console.log(this.question);
  },(error: any)=>{
    console.log(error);
  });
  }

  public updateQuestionData(){
    this._question.updateQuestion(this.question).subscribe((data)=>{
      Swal.fire('Success','Updated quiz succesfuly','success').then((e)=>{
        this._router.navigate([`/admin/view-questions/${this.qId}/${this.qTitle}`]);
      });
    },(error)=>{
      Swal.fire('Error','Error in updating data','error');
      console.log(error);
    });
  }

}
