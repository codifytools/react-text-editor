# React Text Editor

A small, simple and customizable text editor for React applications.

![npm bundle size](https://img.shields.io/bundlephobia/min/@codifytools/react-text-editor)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@codifytools/react-text-editor)
[![npm downloads](https://img.shields.io/npm/dt/@codifytools/react-text-editor)](https://www.npmjs.com/package/@codifytools/react-text-editor)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE)

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Props](#props)
* [Requirements](#requirements)
* [Contributing](#contributing)

## Installation

To install, you can use [npm](https://npmjs.org/) or [yarn](https://yarnpkg.com):

```sh
npm install @codifytools/react-text-editor
```

## Usage
```jsx
import React, { useState, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Editor from '@codifytools/react-text-editor';

const Example = () => {
  const [values, setValues] = useState({ text: '<p>Editor example text</p>' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  return (
    <Fragment>
        <Editor
          field="text"
          html={values.text}
          classes="example-class"
          saveCallback={handleChange}
          placeholder="custon placeholder text..."
       />

       <button onClick={() => console.log(values.text)}>Preview Text</button>
    </Fragment>
  );
};

ReactDOM.render(<Example />, document.body);
```

## Props

| Prop                   | Type             | Description                                                                                                                                                                                                                                                          |
| ---------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| field                  | String           | Field that callback `event.target.name` will replace                                                                            |
| html                   | String           | Current html text value                                                                                                         |
| classes                | String           | Class names for custom styles                                                                                                   |
| saveCallback           | Function         | Save changes function. The Editor returns a event with the updated information                                                  |
| placeholder            | String           | Text editor custom placeholder                                                                                                  |                                                                                                                                                                                                                                     |

## Requirements

The minimum supported version of React is v16.8.0. If you use an older version, upgrade React to use this library.
