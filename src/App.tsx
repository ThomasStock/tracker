import { useState } from "react";
import TemplateEditor from "./TemplateEditor/TemplateEditor";
import { EntriesEditor } from "./EntriesEditor/EntriesEditor";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useAtom } from "jotai";
import { entriesAtom } from "./store/entriesAtom";

function App() {
  const [openSettings, setOpenSettings] = useState(false);
  const [, setEntries] = useAtom(entriesAtom);

  return (
    <div className="min-h-screen max-w-xl bg-background p-4">
      <div className="flex items-center justify-between sticky top-0 pt-2 z-20 bg-background">
        <Button variant="ghost" size="icon" onClick={() => setOpenSettings(!openSettings)}>
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
        <Button variant="ghost" onClick={() => setEntries({})}>
          Reset
        </Button>
      </div>
      {openSettings ? <TemplateEditor /> : <EntriesEditor />}
    </div>
  );
}

export default App;
