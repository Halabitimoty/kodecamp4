import { getUser, getUserId, createUser } from "./auth";
import {
  getNotes,
  addNote,
  deleteNote,
  getUserNotes,
  updateNote,
} from "./notes";
export class User {
  static getUser = getUser;
  static getUserId = getUserId;
  static createUser = createUser;
}

export class Note {
  static getNotes = getNotes;
  static addNote = addNote;
  static deleteNote = deleteNote;
  static getUserNotes = getUserNotes;
  static updateNote = updateNote;
}
