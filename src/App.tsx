import { useState } from "react";
import TemplateEditor from "./TemplateEditor/TemplateEditor";
import { EntriesEditor } from "./EntriesEditor/EntriesEditor";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

function App() {
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between sticky top-0 pt-2 z-20 bg-gray-50">
        <Button variant="ghost" size="icon" onClick={() => setOpenSettings(!openSettings)}>
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
        <Button variant="ghost" onClick={() => localStorage.clear()}>
          Reset
        </Button>
      </div>
      {openSettings ? <TemplateEditor /> : <EntriesEditor />}
    </div>
  );
}

export default App;
