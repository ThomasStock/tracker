import { createFileRoute } from "@tanstack/react-router";
import { EntriesEditor } from "../EntriesEditor/EntriesEditor";
import { PageLayout } from "../layouts/PageLayout";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <PageLayout>
      <EntriesEditor />
    </PageLayout>
  );
}
