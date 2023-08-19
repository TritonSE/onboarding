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

    // convert the string version of the date to a Date object
    dateCreated: new Date(task.dateCreated),
  };
}

/**
 * This interface is optional, it's being used to make the input of createTask
 * cleaner. It's being exported so when calls are made to the function it can
 * be used.
 */
export interface CreateTaskRequest {
  title: string;
  description?: string;
}

export async function createTask(task: CreateTaskRequest): Promise<Task> {
  // we can call "/api/task" due to the "proxy" field in package.json
  // the proxy field is being used to circumvent CORS errors on the dev system
  // CORS is a security feature meant to prevent malicious cross-origin
  // data retrieval
  //
  // read more about CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
  // read more about proxying: https://create-react-app.dev/docs/proxying-api-requests-in-development/
  const response = await post("/api/task", task);
  const json = await response.json();

  return parseTask(json);
}

export async function getAllTasks(): Promise<Task[]> {
  return [];
}
