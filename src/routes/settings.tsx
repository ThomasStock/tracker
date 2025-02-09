import { createFileRoute, Link } from "@tanstack/react-router";
import TemplateEditor from "../TemplateEditor/TemplateEditor";
import { PageLayout } from "../layouts/PageLayout";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Header } from "@/components/ui/header";
import { useAtom } from "jotai";
import { entriesAtom } from "../store/entriesAtom";
import { templateAtom } from "../store/templateAtom";
import { defaultEntries } from "../store/defaultEntries";

export const Route = createFileRoute("/settings")({
  component: Settings,
});

function Settings() {
  const [, setEntries] = useAtom(entriesAtom);
  const [, setTemplate] = useAtom(templateAtom);

  return (
    <PageLayout>
      <Header
        leftButton={
          <Link to="/">
            <Button variant="ghost" size="icon">
              <Edit className="h-5 w-5" />
              <span className="sr-only">Back to Editor</span>
            </Button>
          </Link>
        }
        rightButton={
          <Button
            variant="ghost"
            onClick={() => {
              setTemplate(defaultEntries.templates);
              setEntries(defaultEntries.entries);
            }}
          >
            Reset
          </Button>
        }
      />
      <div className="sticky top-0 bg-background z-20 text-center border-b pb-4 mb-4 pt-6">
        <h1 className="text-xl font-semibold">Edit Template</h1>
      </div>
      <TemplateEditor />
    </PageLayout>
  );
}
