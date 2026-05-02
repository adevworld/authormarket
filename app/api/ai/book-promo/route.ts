export async function POST(req: Request) {
  try {
    const { title, author, summary } = await req.json();

    return Response.json({
      result: `AI Book Booster Test

Book: ${title}
Author: ${author}

Description:
${summary}

Social Post:
Check out "${title}" by ${author}. This is a powerful book for readers ready to grow, build, and take action.`,
    });
  } catch (error) {
    return Response.json({
      result: "AI route error. The request reached the backend, but something failed.",
    });
  }
}