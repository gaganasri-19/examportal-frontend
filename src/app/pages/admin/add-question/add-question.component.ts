import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import  ClassicEditor  from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit{
  public Editor=ClassicEditor;
  qId:any;
  qTitle:any;
  questionData={
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
  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionService,
    private _router:Router
  ){}
  ngOnInit(): void {
    this.qId=this._route.snapshot.params['quid'];
    this.qTitle=this._route.snapshot.params['title'];
    this.questionData.quiz['quid']=this.qId;
  }
  formSubmit(){
    if(this.questionData.content.trim()=='' || this.questionData.content.trim()==null){
      return;
    } 
    if(this.questionData.option1.trim()=='' || this.questionData.option1.trim()==null){
      return;
    } 
    if(this.questionData.option2.trim()=='' || this.questionData.option2.trim()==null){
      return;
    } 
    if(this.questionData.option3.trim()=='' || this.questionData.option3.trim()==null){
      return;
    } 
    if(this.questionData.option4.trim()=='' || this.questionData.option4.trim()==null){
      return;
    }  
    if(this.questionData.answer.trim()=='' || this.questionData.answer.trim()==null){
      return;
    }  
  
    this._question.addQuestion(this.questionData).subscribe((data: any)=>{
      Swal.fire('Success','Question added succesfuly','success').then((e)=>{
        this._router.navigate([`/admin/view-questions/${this.qId}/${this.qTitle}`]);
      });
      this.questionData.content='';
      this.questionData.option1='';
      this.questionData.option2='';
      this.questionData.option3='';
      this.questionData.option4='';
      this.questionData.answer='';
    },(error: any)=>{
      Swal.fire("Error",'Error in adding question','error');
      console.log(error);
    });
  }

}
