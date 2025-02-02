import { useState } from "react";
import TemplateEditor from "./TemplateEditor/TemplateEditor";
import { EntriesEditor } from "./EntriesEditor/EntriesEditor";

function App() {
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <div>
      {openSettings ? (
        <button onClick={() => setOpenSettings(false)}>Close</button>
      ) : (
        <div className="gap-4 flex">
          <button onClick={() => setOpenSettings(true)}>Settings</button>
          <button onClick={() => localStorage.clear()}>Reset</button>
        </div>
      )}

      {openSettings ? <TemplateEditor /> : <EntriesEditor />}
    </div>
  );
}

export default App;
