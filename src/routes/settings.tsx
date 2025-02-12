import { createFileRoute, Link } from "@tanstack/react-router";
import TemplateEditor from "../TemplateEditor/TemplateEditor";
import { PageLayout } from "../layouts/PageLayout";

export const Route = createFileRoute("/settings")({
  component: Settings,
});

function Settings() {
  return (
    <PageLayout>
      <TemplateEditor />
    </PageLayout>
  );
}
