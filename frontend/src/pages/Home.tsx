import React from "react";
import { Button } from "src/components/Button";

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <Button label="hi" onClick={() => alert("hi")} />
    </>
  );
}
