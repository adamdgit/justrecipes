import Transcribe from "@/components/Transcribe";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className='content-wrap'>
      <h2>Generate recipe from video using AI</h2>
      <p><strong>Supports:</strong> Youtube videos and shorts</p>
      <ol>
        <li>Click "share" on your Youtube video</li>
        <li>Copy the video URL</li>
        <li>Paste the URL in the box below</li>
        <li>Click Generate</li>
      </ol>
      <Transcribe />
    </div>
  );
}
