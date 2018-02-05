import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as showdown from 'showdown';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  public inputText: string;
  public outputText: string;
  public wordCount: number;

  private converter;

  constructor() {
    this.converter = new showdown.Converter();
  }

  ngAfterViewInit(): void {
    const lastInput = localStorage.getItem('last_input');

    if (lastInput) {
      this.inputText = lastInput;
      this.render();
    }
  }

  render() {
    this.outputText = this.converter.makeHtml(this.inputText);

    localStorage.setItem('last_input', this.inputText);

    this.wordCount = this.inputText.trim().split(/\s+/).length;
  }
}
