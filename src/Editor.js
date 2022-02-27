import React, { useState, useRef } from "react";
import { IconBold, IconItalic, IconUnderline, IconStrikethrough, IconOrderedList, IconUnorderedList, IconTextSize, IconJustifyLeft, IconJustifyCenter, IconJustifyRight, IconQuote, IconLink, IconImage, IconEdit, IconCode } from "./Icons.js";
import Dropdown from "./Dropdown.js";
import Button from "./Button.js";
import "./Editor.css";

const Editor = ({ field, html, classes, saveCallback, placeholder }) => {
  const [htmlEditor, setHtmlEditor] = useState(false);
  const editorRef = useRef();

  const generateLink = (url) => {
    const pattern = /^((http|https|ftp):\/\/)/;
    return !pattern.test(url) ? `https://${url}` : url;
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const text = event.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
  };

  const toggleHtmlEditor = () => setHtmlEditor(!htmlEditor);

  const handleSave = (event) => {
    event.preventDefault();

    const initialHtml = html;
    const el = editorRef.current;
    const newHtml = el ? el.innerHTML : event.target.value;

    if (initialHtml !== newHtml) {
      const newEvent = Object.assign({}, event, {
        target: { name: field, value: newHtml }
      });
      saveCallback(newEvent);
    }
  };

  return (
    <div className={`editor ${classes ? classes : ""}`}>
      <div className="actions">
        <Button cmd="bold" icon={IconBold} />
        <Button cmd="italic" icon={IconItalic} />
        <Button cmd="underline" icon={IconUnderline} />

        <Button cmd="strikeThrough" icon={IconStrikethrough} />

        <Button cmd="insertOrderedList" icon={IconOrderedList} />
        <Button cmd="insertUnorderedList" icon={IconUnorderedList} />

        <Dropdown
          icon={<IconTextSize />}
          options={[
            { cmd: "formatBlock", text: "H1", arg: "h1"},
            { cmd: "formatBlock", text: "H2", arg: "h2"},
            { cmd: "formatBlock", text: "H3", arg: "h3"},
            { cmd: "formatBlock", text: "H4", arg: "h4"}
          ]}
        />

        <Button cmd="justifyLeft" icon={IconJustifyLeft} />
        <Button cmd="justifyCenter" icon={IconJustifyCenter} />
        <Button cmd="justifyRight" icon={IconJustifyRight} />

        <Button cmd="formatBlock" icon={IconQuote} arg="blockquote" />

        <Button icon={IconLink} func={() => {
          const linkUrl = prompt("Enter the URL");
          const selection = document.getSelection();
          document.execCommand("createLink", false, generateLink(linkUrl));
          selection.anchorNode.parentElement.target = "_blank";
          selection.anchorNode.parentElement.rel = "noopener";
        }} />

        <Button icon={IconImage} func={() => {
          const imageUrl = prompt("Paste image url here");
          document.execCommand("insertHTML", false, `<img src="${imageUrl}">`);
        }} />

        <span onClick={toggleHtmlEditor}>
          {htmlEditor ? <IconEdit/> : <IconCode/>}
        </span>
      </div>

      {htmlEditor ? (
        <textarea
          defaultValue={html}
          placeholder="Write your html code here"
          onBlur={handleSave}
        />
      ) : (
        <div
          ref={editorRef}
          className="editable"
          dangerouslySetInnerHTML={{ __html: html }}
          contentEditable={true}
          placeholder={placeholder ? placeholder : "Write your rich text here"}
          onBlur={handleSave}
          onPaste={handlePaste}
        />
      )}
    </div>
  );
};

export default Editor;