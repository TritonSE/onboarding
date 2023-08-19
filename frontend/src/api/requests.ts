/**
 * Credit to justinyaodu https://github.com/TritonSE/TSE-Fulcrum/blob/main/frontend/src/api.ts
 */

/**
 * A custom type defining which HTTP methods we will handle in this file
 */
type Method = "GET" | "POST" | "PUT";

/**
 * A wrapper around the built-in `fetch()` function that abstracts away some of
 * the low-level details so we can focus on the important parts of each request.
 * See https://developer.mozilla.org/en-US/docs/Web/API/fetch for information
 * about the Fetch API.
 *
 * @param method The HTTP method to use
 * @param url The URL to request
 * @param body The body of the request, or undefined if there is none
 * @param headers The headers of the request
 * @returns The Response object returned by `fetch()
 */
async function fetchRequest(
  method: Method,
  url: string,
  body: unknown,
  headers: Record<string, string>,
): Promise<Response> {
  const hasBody = body !== undefined;

  const newHeaders = { ...headers };
  if (hasBody) {
    newHeaders["Content-Type"] = "application/json";
  }

  const response = await fetch(url, {
    method,
    headers: newHeaders,
    body: hasBody ? JSON.stringify(body) : undefined,
  });

  return response;
}

/**
 * Throws an error if the given response's status code indicates an error
 * occurred, else does nothing.
 *
 * @param response the response from the fetch call
 * @throws an error if one exists
 */
async function assertOk(response: Response): Promise<void> {
  if (response.ok) {
    return;
  }

  let message = `${response.status} ${response.statusText}`;

  try {
    const text = await response.text();
    if (text) {
      message += ": " + text;
    }
  } catch (e) {
    // skip errors
  }

  throw new Error(message);
}

/**
 * Sends a GET request to the provided URL.
 *
 * @param url the URL the call is being made to
 * @param headers the headers of the request (optional)
 * @returns the response from the fetch request
 */
export async function get(url: string, headers: Record<string, string> = {}): Promise<Response> {
  // body is null for get requests
  const response = await fetchRequest("GET", url, null, headers);

  // checks that there are no errors in the response
  assertOk(response);
  return response;
}

/**
 * Sends a POST request to the provided URL
 *
 * @param url the URL the call is being made to
 * @param body the body of the call
 * @param headers the headers of the request (optional)
 * @returns the response from the fetch request
 */
export async function post(
  url: string,
  body: unknown,
  headers: Record<string, string> = {},
): Promise<Response> {
  const response = await fetchRequest("POST", url, body, headers);
  assertOk(response);
  return response;
}

/**
 * Sends a PUT request to the provided URL.
 *
 * @param url the URL the call is being made to
 * @param body the body of the call
 * @param headers the headers used in the call
 * @returns the response from the fetch request
 */
export async function put(
  url: string,
  body: unknown,
  headers: Record<string, string> = {},
): Promise<Response> {
  const response = await fetchRequest("GET", url, body, headers);
  assertOk(response);
  return response;
}
