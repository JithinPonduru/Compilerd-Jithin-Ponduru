import { func } from "joi";
import React from "react";
import { useState, useEffect } from "react";
import Dropdown from "react-dropdown";

const CodingArea = () => {
  const languages = [
    "C",
    "CPP",
    "Python",
    "Java",
    "NodeJS",
    "Ruby",
    "PromptV1",
    "PromptV2",
    "MultiFile",
    "SQLite3",
    "LUA",
    "PERL",
    "ERLANG",
  ];
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const clearfunction = () => {
    for (let i = 0; i < document.getElementsByTagName("textarea").length; i++) {
      const temp = document.getElementsByTagName("textarea")[i];
      if (temp) {
        temp.value = "";
      }
    }
  };

  async function SubmitFunction() {

    await fetch("http://localhost:3000/api/execute/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language : selectedLanguage.toLowerCase(),
        script: code,
        stdin: " ",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((data) => {
        setOutput(data.output);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setOutput(`Error: ${error.message}`);
      });
  }

  return (
    <div className="CodingArea">
      <div className="CodeContainerwithInputOutPut">
        <textarea
          placeholder="Enter your code Here"
          className="CodeContainer"
          name="code"
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        ></textarea>
        <div className="InputOutPut">
          <textarea
            className="CodeContainerInput"
            placeholder="Input"
            name="input"
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
          <textarea
            className="CodeContainerInput"
            placeholder="Output"
            name="output"
            id="output"
            value={output}
            onChange={(e) => setOutput(e.target.value)}
          ></textarea>
        </div>

        <Dropdown
          options={languages}
          id="dropdown"
          onChange={(option) => setSelectedLanguage(option.value)}
          value={selectedLanguage}
          className="dropdown"
          menuClassName="dropdownmenu"
          controlClassName="dropdowncontrol"
        />
      </div>

      <div className="buttons">
        <button id="run" onClick={SubmitFunction} className="run">
          Run
        </button>
        <button onClick={clearfunction} id="clear" className="clear">
          Clear
        </button>
      </div>
    </div>
  );
};

export default CodingArea;
