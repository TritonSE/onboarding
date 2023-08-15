import { Task } from "src/models/task";

// a customized fetch wrapper that handles errors
// wrapping fetch in a try-catch does not handle errors as expected so a custom
// wrapper is necessary

/**
 * A customized fetch wrapper that handles errors. Wrapping fetch in a try-catch
 * does not handle errors as expected so a custom wrapper is necessary.
 *
 * @param input the url the request is being made to
 * @param init the necessary initialization parameters
 * @returns the fetch response or throws an error
 */
async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);

  // true if HTTP code is between 200 and 300
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;

    throw Error(errorMessage);
  }
}

/**
 * This interface is optional, it's being used to make the input of createTask
 * cleaner. It's being exported so when calls are made to the function it can
 * be used.
 */
export interface TaskInput {
  title: string;
  description?: string;
  isChecked?: boolean;
}

export async function createTask(task: TaskInput): Promise<Task> {
  // we can call "/api/task" due to the "proxy" field in package.json
  // the proxy field is being used to circumvent CORS errors on the dev system
  // CORS is a security feature meant to prevent malicious cross-origin
  // data retrieval
  //
  // read more about CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
  // read more about proxying: https://create-react-app.dev/docs/proxying-api-requests-in-development/
  const response = await fetchData("/api/task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  console.log(response);

  return await response.json();
}

export async function getAllTasks(): Promise<Task[]> {
  return [];
}
