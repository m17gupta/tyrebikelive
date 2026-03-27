import { Editor } from "@/EditorComp/Editor";
import { type Locale } from "@/i18n/config";

export const dynamic = "force-dynamic";

const EditorPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  
  return <Editor mode="create" data={null} />;
};
export default EditorPage;
