import { db } from "../database";

export async function getNotes() {
  if (!db) throw Error("DB not init.");
  return db.all("SELECT * FROM notes");
}

export async function addNote({
  title,
  content,
  userId,
}: {
  title: string;
  content: string;
  userId: number;
}) {
  if (!db) throw Error("DB not init.");
  const createdNote = await db.run(
    `INSERT INTO notes (title, content, user_id) VALUES (?, ?, ?)`,
    [title, content, userId]
  );
  const noteId = createdNote.lastID;
  return db.get<{ id: number; title: string; content: string }>(
    `SELECT id, title, content, created_at FROM notes WHERE id = ?`,
    [noteId]
  );
}

export async function getUserNotes(userId: number) {
  if (!db) throw Error("DB not init.");
  return db.all(`SELECT * FROM notes WHERE user_id = ?`, [userId]);
}

export async function updateNote({
  noteId,
  title,
  content,
}: {
  noteId: number;
  title: string;
  content: string;
}) {
  if (!db) throw Error("DB not init.");
  await db.run(`UPDATE notes SET title = ?, content = ? WHERE id = ?`, [
    title,
    content,
    noteId,
  ]);
  return db.get<{ id: number; title: string; content: string }>(
    `SELECT id, title, content, created_at FROM notes WHERE id = ?`,
    [noteId]
  );
}

export async function deleteNote({ noteId }: { noteId: number }) {
  if (!db) throw Error("DB not init.");
  return db.run(`DELETE FROM notes WHERE id = ?`, [noteId]);
}
