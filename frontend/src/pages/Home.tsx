import React from "react";
import { Page, TaskForm } from "src/components/";

export default function Home() {
  return (
    <Page>
      <TaskForm mode="create" />
    </Page>
  );
}
