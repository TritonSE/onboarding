import { post } from "src/api/requests";

/**
 * Initializes the shape for the data being retrieved from the backend.
 */
export interface Task {
  _id: string;
  title: string;
  description?: string;
  isChecked: boolean;
  dateCreated: Date;
}

interface TaskJSON {
  _id: string;
  title: string;
  description?: string;
  isChecked: boolean;
  dateCreated: string;
}

/**
 * Converts taks from "any"-typed JSON that only contains primitive types to our
 * custom Task interface. This is used to change the date field from a string
 * to a Date object.
 *
 * @param task the JSON representation of the task
 * @returns the typed Task
 */
function parseTask(task: TaskJSON): Task {
  return {
    _id: task._id,
    title: task.title,
    description: task.description,
    isChecked: task.isChecked,
    dateCreated: new Date(task.dateCreated),
  };
}

/**
 * The expected inputs when we want to create a new Task object. In the MVP, we only
 * need to provide the title and optionally the description, but in the course of
 * this tutorial you'll likely want to add more fields here.
 */
export interface CreateTaskRequest {
  title: string;
  description?: string;
}

export async function createTask(task: CreateTaskRequest): Promise<Task> {
  const response = await post("/api/task", task);
  const json = (await response.json()) as TaskJSON;

  return parseTask(json);
}

export async function getAllTasks(): Promise<Task[]> {
  return [];
}
