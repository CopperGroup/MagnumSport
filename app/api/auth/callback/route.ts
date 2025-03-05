import { NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { handleGitHubCallback } from "@/lib/actions/auth.actions";

export async function GET(req: NextApiRequest) {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code) return NextResponse.json({ error: "Missing code" }, { status: 400 });

    try {
        await handleGitHubCallback(code);
        return NextResponse.redirect("/");
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
