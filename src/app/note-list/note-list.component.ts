import { Component } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { NoteListService } from '../firebase-services/note-list.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoteComponent } from './note/note.component';



@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [FormsModule, CommonModule, NoteComponent],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss'
})
export class NoteListComponent {
  
  favFilter: "all" | "fav" = "all";
  status: "notes" | "trash" = "notes";

  constructor(public noteService: NoteListService) {

  }

  showContent () {
    if (this.status === "notes") {
      if (this.favFilter == "fav") {
        return this.noteService.markedNotesList;
      } else {
        return this.noteService.noteslist;
      }
    } else {
      return this.noteService.trasheslist;
    }
  }

  changeFavFilter(filter:"all" | "fav"){
    this.favFilter = filter;
  }

  changeTrashStatus(){
    if(this.status == "trash"){
      this.status = "notes";
    } else {
      this.status = "trash";
      this.favFilter = "all";
    }
  }
}