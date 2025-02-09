import { createFileRoute, Link } from "@tanstack/react-router";
import { EntriesEditor } from "../EntriesEditor/EntriesEditor";
import { PageLayout } from "../layouts/PageLayout";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Header } from "@/components/ui/header";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <PageLayout>
      <Header
        leftButton={
          <Link to="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </Link>
        }
      />
      <EntriesEditor />
    </PageLayout>
  );
}
