import React from "react";
import { Button, Page, TextField } from "src/components/";

export default function Home() {
  return (
    <Page>
      <h1>Home</h1>
      <TextField label="Asdf" />
      <Button label="Click me" style={{ marginTop: 4 }} />
      <Button label="Click me too" kind="secondary" style={{ marginTop: 4, marginLeft: 4 }} />
    </Page>
  );
}
