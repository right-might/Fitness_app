import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-character-counter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './character-counter.component.html',
  styleUrl: './character-counter.component.scss'
})
export class CharacterCounterComponent {
  maxLength: number = 100;

  @Output() commentChanged = new EventEmitter<string>();
  @Input() comment: string = '';
  
  constructor() { }

  onCommentChange() {
    this.commentChanged.emit(this.comment);
  }
}
