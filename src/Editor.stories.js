import React, { useState, Fragment } from "react";
import Editor from "./Editor.js";

export default {
  component: Editor,
  title: "React Text Editor"
};

export const Example = () => {
  const [values, setValues] = useState({ text: '<p>This is our rich text editor and here we will display different options and functionalities</p><p>There are some elements like bold, italic, underline, strikethrough</p><br><p>First Title</p><p>Second Title</p><p>Third Title</p>' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  return (
    <Fragment>
      <Editor
        field="text"
        html={values.text}
        saveCallback={handleChange}
        placeholder="Temporal placeholder..."
      />

      <button onClick={() => console.log(values.text)}>Submit</button>
    </Fragment>
  );
}