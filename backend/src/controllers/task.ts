/**
 * Functions that process task route requests.
 */

import { RequestHandler } from "express";
import TaskModel from "../models/task";
import createHttpError from "http-errors";

export const getTask: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    // if the id doesn't exist, returns null
    const task = await TaskModel.findById(id);

    if (task === null) {
      // 404 is the "not found" error
      throw createHttpError(404, "Task not found.");
    }

    res.status(200).json(task);
  } catch (error) {
    // pass errors to the error handler
    next(error);
  }
};

export const createTask: RequestHandler = async (req, res, next) => {
  const { title, description, isChecked } = req.body;

  try {
    const task = await TaskModel.create({
      title: title,
      description: description,
      isChecked: isChecked,
      dateCreated: Date.now(),
    });

    // 201 means a new resource has been created successfully
    // the newly created task is sent back to the user
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const removeTask: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await TaskModel.deleteOne({ _id: id });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
