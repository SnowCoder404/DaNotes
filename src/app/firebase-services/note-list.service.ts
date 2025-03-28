import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Note } from '../interfaces/note.interface';
import { single } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  noteslist: Note[] = [];
  trasheslist: Note[] = []; 

  firestore: Firestore = inject(Firestore);
  notelist;
  trashlist;

  constructor() { 
    this.noteslist = [];
    this.trasheslist = [];
    
    this.notelist = onSnapshot(this.getNotesRef(), (notes) => {
      notes.forEach((note) => { 
          this.noteslist.push(this.setNoteObject(note.data(), note.id)); 
      });
    } );
    
    this.trashlist = onSnapshot(this.getTrashRef(), (notes) => {
      notes.forEach((trash) => { 
          this.trasheslist.push(this.setNoteObject(trash.data(), trash.id)); 
      });
    } );
  }

  async deleteNote(collId: string, docId: string) {
    await deleteDoc(this.getSingleDocRef(collId, docId))
    .catch((error) => {
      console.error("Error deleting document: ", error);
  });
  }

  async updateNote(note: Note) {
    if (note) {
      let docRef = this.getSingleDocRef(this.getCallIdFromNode(note), note.id)
      await updateDoc(docRef, this.getCleanJson(note))
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
    }
    
  }
  
  getCleanJson(note: Note): {} {
    return {
      type: note.type,
      title: note.title,
      content: note.content,
      marked: note.marked
    };
    
  }

  getCallIdFromNode (note:Note) {
    if (note.type === "note") {
      return "notes";
    } else {
      return "trash";
    }
  }

  async addNote(type: "trash" | "note", item: Note) {
    if (type === "trash") {
      item.type = "trash";
      await addDoc(this.getTrashRef(), item)
      .then((docRef) => {{
        console.log("Document written with ID: ", docRef.id);
      }}).catch((error) => {
        console.error("Error adding document: ", error);
      });
    } else {
      item.type = "note";
      await addDoc(this.getNotesRef(), item)
      .then((docRef) => {{
        console.log("Document written with ID: ", docRef.id);
      }}).catch((error) => {
        console.error("Error adding document: ", error);
      });
    }
  }

  ngOnDestroy() {
    this.notelist();  
    this.trashlist();
  }

  getNotesRef() {
    return collection(this.firestore, 'notes');
  }

  getTrashRef() {
    return collection(this.firestore, 'trash');
  }

  getSingleDocRef(collId: string, docId: string) {
    return doc(collection(this.firestore, collId), docId);
  }

  setNoteObject(obj: any, id: string): Note {
    return {
      id: id || '',
      type: obj.type || 'note',
      title: obj.title || '',
      content: obj.content || '',
      marked: obj.marked || false,
    };
  }
}
