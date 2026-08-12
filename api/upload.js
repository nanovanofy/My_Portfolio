import { handleUpload } from "@vercel/blob/client";

export async function POST(request) {
  const body = await request.text();

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ["image/*", "video/*"],
        maximumSizeInBytes: 20 * 1024 * 1024, // 20 Mo
      }),
      onUploadCompleted: async () => {},
    });
    return new Response(JSON.stringify(jsonResponse), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
