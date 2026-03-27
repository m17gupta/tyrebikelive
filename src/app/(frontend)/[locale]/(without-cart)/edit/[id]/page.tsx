import { Editor } from "@/EditorComp/Editor";

export const dynamic = "force-dynamic";

const EditorPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // TODO: Replace with your custom API call to fetch page data by ID
  // e.g. const page = await fetchPage(id);
  const page = { id } as Record<string, unknown>;

  return <Editor mode="edit" data={page} />;
};
export default EditorPage;
