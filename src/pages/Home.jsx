/**
 * @ Author: zhenghui
 * @ Create Time: 2021-10-19 14:28:36
 * @ Modified by: zhenghui
 * @ Modified time: 2021-10-19 18:11:31
 * @ Description:
 */

import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const HomePage = () => {
  const codeString = `function createStyleObject(classNames, style) {
    return classNames.reduce((styleObject, className) => {
      return {...styleObject, ...style[className]};
    }, {});
  }
  
  function createClassNameString(classNames) {
    return classNames.join(' ');
  }
  
  // this comment is here to demonstrate an extremely long line length, well beyond what you should probably allow in your own code, though sometimes you'll be highlighting code you can't refactor, which is unfortunate but should be handled gracefully
  

  
  function createElement({ node, style, useInlineStyles, key }) {
    const { properties, type, tagName, value } = node;
    if (type === "text") {
      return value;
    } else if (tagName) {
      const TagName = tagName;
      const childrenCreator = createChildren(style, useInlineStyles);
      const props = (
        useInlineStyles
        ?
        { style: createStyleObject(properties.className, style) }
        :
        { className: createClassNameString(properties.className) }
      );
      const children = childrenCreator(node.children);
      return <TagName key={key} {...props}>{children}</TagName>;
    }
  }`;
  return (
    <div className="container mx-auto">
      <div className="mt-24">
        <div>
          <span className="block font-semibold text-2xl mb-4 text-blue-600">
            <code>Talk is cheap. Show me the code.</code>
          </span>
        </div>
        <div className="relative">
          <SyntaxHighlighter style={docco}>{codeString}</SyntaxHighlighter>

          <div className="shadow-xl absolute bottom-3 h-10 right-3 bg-gray-600 cursor-pointer">
            <span className="text-white px-4 py-1 leading-10">Copy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
