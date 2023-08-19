/**
 * Credit to justinyaodu https://github.com/TritonSE/TSE-Fulcrum/blob/main/frontend/src/api.ts
 */

// a custom type defining the HTTP methods we are handling
type Method = "get" | "post" | "put";

/**
 * A custom wrapper for the fetch request that abstracts extra fields away.
 *
 * @param method the HTTP method used to make the call
 * @param url the url the calls is being made to
 * @param body the body of the call if there is one
 * @param headers the header of the fetch call
 * @returns the response received from the fetch request
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

  // call the fetch call
  const response = await fetch(url, {
    method,
    headers: newHeaders,
    body: hasBody ? JSON.stringify(body) : undefined,
  });

  return response;
}

/**
 * Throws an error only if the response has not been resolved successfully.
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
 * Used to abstract unnecessary fields for get requests.
 *
 * @param url the url the call is being made to
 * @param headers the headers used in the call
 * @returns the response from the fetch request
 */
export async function get(url: string, headers: Record<string, string> = {}): Promise<Response> {
  // body is null for get requests
  const response = await fetchRequest("get", url, null, headers);

  // checks that there are no errors in the response
  assertOk(response);
  return response;
}

/**
 * Used to abstract unnecessary fields for post requests.
 *
 * @param url the url the call is being made to
 * @param body the body of the call
 * @param headers the headers used in the call
 * @returns the response from the fetch request
 */
export async function post(
  url: string,
  body: unknown,
  headers: Record<string, string> = {},
): Promise<Response> {
  const response = await fetchRequest("post", url, body, headers);
  assertOk(response);
  return response;
}

/**
 * Used to abstract unnecessary fields for put requests.
 *
 * @param url the url the call is being made to
 * @param body the body of the call
 * @param headers the headers used in the call
 * @returns the response from the fetch request
 */
export async function put(
  url: string,
  body: unknown,
  headers: Record<string, string> = {},
): Promise<Response> {
  const response = await fetchRequest("put", url, body, headers);
  assertOk(response);
  return response;
}
