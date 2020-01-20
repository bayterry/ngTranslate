import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { TranslateService } from './translate.service';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('fromGroup', {static: false}) fromGroup: ElementRef;
  @ViewChild('toGroup', {static: false}) toGroup: ElementRef;

  inputTextControl = new FormControl();
  formCtrlSub: Subscription;

  text: string;
  translatedText: string;

  from = 'en';
  to = 'de';

  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    this.formCtrlSub = this.inputTextControl.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    )
    .subscribe(newValue =>{
       this.text = newValue;
       this.submit();
    });
  }

  change(fromTo: string, change) {

    fromTo === 'from' ? this.from = change.value : this.to = change.value;

    this.submit();
  }

  submit() {

      this.translateService.translate(this.from, this.to, this.text).subscribe((result => {
        this.translatedText = result;
      }));
  }
}

