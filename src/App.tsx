import { useState } from "react";
import TemplateEditor from "./TemplateEditor/TemplateEditor";
import { EntriesEditor } from "./EntriesEditor/EntriesEditor";
import { Button } from "@/components/ui/button";
import { Edit, Settings } from "lucide-react";
import { useAtom } from "jotai";
import { entriesAtom } from "./store/entriesAtom";
import { defaultEntries } from "./store/defaultEntries";
import { templateAtom } from "./store/templateAtom";

declare const process: {
  env: {
    VERSION: string;
  };
};

function App() {
  const [openSettings, setOpenSettings] = useState(false);
  const [, setEntries] = useAtom(entriesAtom);
  const [, setTemplate] = useAtom(templateAtom);

  return (
    <div className="min-h-screen max-w-xl bg-background p-4">
      <div className="flex items-center justify-between sticky top-0 pt-2 z-20 bg-background">
        <Button variant="ghost" size="icon" onClick={() => setOpenSettings(!openSettings)}>
          {openSettings ? <Edit className="h-5 w-5" /> : <Settings className="h-5 w-5" />}
          <span className="sr-only">Settings</span>
        </Button>
        <span className="text-xs text-muted-foreground flex-1 text-center">{process.env.VERSION}</span>
        <Button
          variant="ghost"
          onClick={() => {
            setTemplate(defaultEntries.templates);
            setEntries(defaultEntries.entries);
          }}
        >
          Reset
        </Button>
      </div>
      {openSettings && (
        <div className="sticky top-0 bg-background z-20 text-center border-b pb-4 mb-4 pt-6">
          <h1 className="text-xl font-semibold">Edit Template</h1>
        </div>
      )}
      {openSettings ? <TemplateEditor /> : <EntriesEditor />}
    </div>
  );
}

export default App;
