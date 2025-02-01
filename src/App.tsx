import { useState } from "react";
import TemplateEditor from "./TemplateEditor/TemplateEditor";
import { EntriesEditor } from "./EntriesEditor/EntriesEditor";

function App() {
  const [openSettings, setOpenSettings] = useState(false);

  if (openSettings) {
    return <TemplateEditor />;
  }

  return (
    <div>
      {openSettings ? (
        <button onClick={() => setOpenSettings(false)}>close Settings</button>
      ) : (
        <button onClick={() => setOpenSettings(true)}>open Settings</button>
      )}

      {openSettings ? <TemplateEditor /> : <EntriesEditor />}
    </div>
  );
}

export default App;
