import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit{
  categories=[
    // {
    //   cid:23,
    //   title:"Mathematics"
    // },
    // {
    //   cid:25,
    //   title:"Chemistry"
    // }
  ];
  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:'',
    }
  };
  constructor(private _cat:CategoryService, private _snack:MatSnackBar,private _quiz:QuizService,private _router:Router){}
  ngOnInit(): void {
    this._cat.categories().subscribe((data:any)=>{
      this.categories=data;
      console.log(this.categories);
    },(error)=>{
      console.log(error);
      Swal.fire('Error','Error loading data from server','error');
    });
  }

addQuiz(){
  console.log(this.quizData);
  if(this.quizData.title.trim()=='' || this.quizData.title==null){
    this._snack.open('Title required','OK');
    return;
  }

  this._quiz.addQuiz(this.quizData).subscribe((data)=>{
    Swal.fire('Success','Quiz successfuly added','success').then((e)=>{
      this._router.navigate(['/admin/quizzes']);
    });
    this.quizData={
      title:'',
      description:'',
      maxMarks:'',
      numberOfQuestions:'',
      active:true,
      category:{
        cid:'',
      }
    };
  },(error)=>{
    Swal.fire('Error','Error while adding quiz','error');
    console.log(error);
  });
}
}
