import createHttpError from "http-errors";
import { Note } from "../models/note.js";


export const getAllNotes = async (req, res, next) => {

  const { page=1, perPage=10,tag, search } = req.query;
   const skip = (page - 1) * perPage;

  const noteQuery = Note.find();

  if (search) {
    noteQuery.where({
      $or: [
    { title: { $regex: search, $options: 'i' } },
    { content: { $regex: search, $options: 'i' } },
  ],
    });
  }
  if (tag) {
    noteQuery.where("tag").equals(tag);
  }

   const [totalItems, notes] = await Promise.all([
    // x.clone()
    noteQuery.clone().countDocuments(),
    // x()
    noteQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);





    res.status(200).json({
    page,
    perPage,
    totalItems,
    totalPages,
      notes}
    );
};


export const getNoteById = async (req, res, next) => {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);
    if (!note) {
         throw createHttpError(404, "Note not found");
    }
    res.status(200).json(note);

};


export const createNote = async (req, res, next) => {
    const body = req.body;
    const note = await Note.create(body);
    res.status(201).json(note);
};

export const deleteNote = async (req, res, next) => {
    const { noteId } = req.params;
    const note = await Note.findByIdAndDelete(noteId);
    if (!note) {
        throw createHttpError(404, "Note not found");
    }
    res.status(200).json(note);
};

export const updateNote = async (req, res, next) => {
    const { noteId } = req.params;
    const body = req.body;
    const note = await Note.findByIdAndUpdate(noteId, body, { returnDocument: 'after', });
    if (!note) {
        throw createHttpError(404, "Note not found");
    }
    res.status(200).json(note);
};
