"use server";

import { cookies } from "next/headers";

export async function handleGitHubLogin() {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const redirectUri = "http://localhost:3000/api/auth/callback";

    return {
        url: `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo user`,
    };
}

export async function handleGitHubCallback(code: any) {
    const res = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new URLSearchParams({
            client_id: process.env.GITHUB_CLIENT_ID!,
            client_secret: process.env.GITHUB_CLIENT_SECRET!,
            code,
        }),
    });

    const data = await res.json();
    if (!data.access_token) throw new Error("GitHub login failed");

    // Store token securely (use a database in production)
    cookies().set("github_token", data.access_token, { httpOnly: true });

    return { success: true };
}
