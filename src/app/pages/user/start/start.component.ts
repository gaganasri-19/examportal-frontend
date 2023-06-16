import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{
  qid:any;
  questions:any;
  marksGot=0;
  correctAnswers=0;
  attempted=0;
  isSubmit=false;
  timer:any;

  constructor(
    private locationSt:LocationStrategy,
    private _route:ActivatedRoute,
    private _question:QuestionService
  ){}
  ngOnInit(): void {
    this.qid=this._route.snapshot.params['quid'];
   this.preventBackButton();
   this.loadQuestions();
  }
  loadQuestions() {
    this._question.getQuestionOfQuizForTest(this.qid).subscribe((data:any)=>{
    this.questions=data;
    this.timer=this.questions.length*1*60;
    // this.questions.forEach((q:any)=>{
    //   q['givenAnswer']="";
    // });
    this.startTimer();
    },(error)=>{
      console.log(error);
      Swal.fire('Error','Error loading questions','error');
    });
  }
  preventBackButton(){
    history.pushState(null,'',location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,'',location.href);
    });
  }

  submitQuiz(){
    Swal.fire({
      title:'Are you sure you want to submit the quiz?',
      showCancelButton:true,
      confirmButtonText:'Submit',
      denyButtonText:'No',
      icon:'question'
    }).then((e)=>{
      if(e.isConfirmed){
        this.evalQuiz();
      }
      console.log("Correct "+this.correctAnswers);
      console.log("Marks "+this.marksGot);
    });
  }

  startTimer(){
    let t=window.setInterval(()=>{
      if(this.timer<=0){
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000)
  }

  getFormattedTime(){
    let hh=Math.floor(this.timer/3600);
    let mm=Math.floor(this.timer/60);
    let ss=this.timer-mm*60;
    return hh+" hr: "+mm+" min: "+ss+" sec";
  }
  evalQuiz() {
    console.log(this.questions);
    this._question.evalQuiz(this.questions).subscribe((data:any)=>{
      
      this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
      this.correctAnswers=data.correctAnswers;
      this.attempted=data.attempted;
      this.isSubmit=true;
    },(error)=>{
      console.log(error);
    });
    // this.isSubmit=true;
    // this.questions.forEach((q: { givenAnswer: any; answer: any; })=>{
    //   if(q.givenAnswer==q.answer){
    //     this.correctAnswers++;
    //     let marksSingle=this.questions[0].quiz.maxMarks/this.questions.length;
    //     this.marksGot+=marksSingle;
    //   }
    //   if(q.givenAnswer.trim()!=''){
    //     this.attempted++;
    //   }
    // });
  }
}
