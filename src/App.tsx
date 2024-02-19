import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useRef, useState } from "react";
import { configure, misceval, importMainWithBody } from "skulpt";

function App() {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [output, setOutput] = useState("");

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
  }

  function runCode() {
    if (editorRef.current) {
      const editor = editorRef.current;
      const model = editor.getModel();
      if (model) {
        const code = model.getValue();
        configure({
          output: (text) =>
            setOutput(
              (prevOutput) =>
                prevOutput +
                `${new Date().toLocaleTimeString()}: ${text}` +
                "\n"
            ),
        });
        misceval
          .asyncToPromise(() => {
            return importMainWithBody("<stdin>", false, code, true);
          })
          .then(
            () => {
              console.log("Python code execution completed.");
            },
            (err: unknown) => {
              console.error("Error running Python code:", String(err));
            }
          );
      }
    }
  }

  return (
    <>
      <button onClick={runCode}>Run code</button>
      <Editor
        height="50vh"
        defaultLanguage="python"
        defaultValue="# Enter your Python code here"
        onMount={handleEditorDidMount}
      />
      <div>
        <h2>Output:</h2>
        <pre
          style={{
            height: "30vh",
            overflow: "auto",
            border: "1px solid black",
            padding: "1rem",
          }}
        >
          {output}
        </pre>
      </div>
    </>
  );
}

export default App;
