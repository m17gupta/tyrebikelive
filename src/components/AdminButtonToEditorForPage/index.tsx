"use client";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

export const EditOnEditor = ({ path }: { path?: string }) => {
  const router = useRouter();
  const { segments } = useParams<{ segments?: string[] }>();

  const last = segments?.[segments.length - 1];

  const openEditor = () => {
    router.push(`/edit/${last}`);
  };

  return (
    <div className="p-2">
      <Button onClick={openEditor} size="sm" className="w-full">
        Edit This Section
      </Button>
    </div>
  );
};

