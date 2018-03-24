import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import * as showdown from 'showdown';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('inputArea')
  public inputArea: ElementRef;

  public inputText: string;
  public outputText: string;
  public wordCount: number;

  private converter;

  constructor(private cdRef: ChangeDetectorRef) {
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
    const renderStartTime = Date.now();
    this.outputText = this.converter.makeHtml(this.inputText);

    setTimeout(() => {
      this.inputArea.nativeElement.style.height = this.inputArea.nativeElement.scrollHeight + 'px';
    }, 10);

    console.log('Render duration: ' + (Date.now() - renderStartTime));

    localStorage.setItem('last_input', this.inputText);

    this.wordCount = this.inputText.trim().split(/\s+/).length;
    this.cdRef.detectChanges();
  }
}
