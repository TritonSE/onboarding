/**
 * Initializes the shape for the data being retrieved from the backend.
 */
export interface Task {
  _id: string;
  title: string;
  description?: string;
  isChecked: boolean;

  // data received will be in JSON, JSON does not have a date type so we use
  // a string instead
  dateCreated: string;
}
