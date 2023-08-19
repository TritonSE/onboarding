/**
 * Credit to justinyaodu https://github.com/TritonSE/TSE-Fulcrum/blob/main/frontend/src/api.ts
 */

type Method = "get" | "post" | "put";

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

export async function get(
  url: string,
  body: unknown,
  headers: Record<string, string> = {},
): Promise<Response> {
  const response = await fetchRequest("get", url, body, headers);
  assertOk(response);
  return response;
}

export async function post(
  url: string,
  body: unknown,
  headers: Record<string, string> = {},
): Promise<Response> {
  const response = await fetchRequest("post", url, body, headers);
  assertOk(response);
  return response;
}

export async function put(
  url: string,
  body: unknown,
  headers: Record<string, string> = {},
): Promise<Response> {
  const response = await fetchRequest("put", url, body, headers);
  assertOk(response);
  return response;
}
