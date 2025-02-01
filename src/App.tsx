import { useState } from "react";
import TemplateEditor from "./TemplateEditor/TemplateEditor";

function App() {
  const [openSettings, setOpenSettings] = useState(false);

  if(openSettings) {
    return <TemplateEditor />;

  return (
    <EntriesEditor />
  );
}

export default App;
