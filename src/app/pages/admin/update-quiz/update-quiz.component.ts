import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit{
  categories: any[] = [];

  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService, 
    private _cat:CategoryService, 
    private _snack:MatSnackBar,
    private _router:Router){}
  quid=0;
  quiz: any;
  ngOnInit(): void {

    this.quid=this._route.snapshot.params['quid'];
    //alert(this.quid);
    this._quiz.getQuiz(this.quid).subscribe((data:any)=>{
      this.quiz=data;
      console.log(this.quiz);
    },(error)=>{
      console.log(error);
    });

    this._cat.categories().subscribe((data:any)=>{
      this.categories=data;
      console.log(this.categories);
    },(error)=>{
      console.log(error);
      Swal.fire('Error','Error loading data from server','error');
    });

  }
  public updateData(){
    this._quiz.updateQuiz(this.quiz).subscribe((data)=>{
      Swal.fire('Success','Updated quiz succesfuly','success').then((e)=>{
        this._router.navigate(['/admin/quizzes']);
      });
    },(error)=>{
      Swal.fire('Error','Error in updating data','error');
      console.log(error);
    });
  }

}
