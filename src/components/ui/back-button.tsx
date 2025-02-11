import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface BackButtonProps {
  to?: string;
}

export function BackButton({ to = "/" }: BackButtonProps) {
  return (
    <Link to={to}>
      <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary" onClick={() => window.history.back()}>
        <ChevronLeft className="h-5 w-5" />
        <span className="sr-only">Back</span>
      </Button>
    </Link>
  );
}
