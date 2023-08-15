import React from "react";
import { Button, Page, TextField } from "src/components/";
import * as TaskApi from "src/api/task_api";

export default function Home() {
  const exp = async () => {
    const resp = await TaskApi.createTask({'title': 'test', 'description': 'test'});
  }

  return (
    <Page>
      <h1>Home</h1>
      <TextField label="Asdf" />
      <Button label="Click me" style={{ marginTop: 4 }} onClick={async () => await exp()}/>
      <Button label="Click me too" kind="secondary" onClick={() => alert("FIRED")} style={{ marginTop: 4, marginLeft: 4 }} />
    </Page>
  );
}
