"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const SimpleTextEditor = ({value, setValue} : {value: string, setValue:any}) => {
   
   const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block', 'video'],
    ],
  }

    return (
        <ReactQuill modules={modules} theme="snow" value={value} onChange={setValue} placeholder='write description here...'/>
    );
};

export default SimpleTextEditor;