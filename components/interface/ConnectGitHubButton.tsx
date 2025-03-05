"use client";

import { useState } from "react";

export default function ConnectGitHubButton() {
    const [loading, setLoading] = useState(false);

    const connectGitHub = async () => {
        setLoading(true);
        const res = await fetch("/api/auth/github", { method: "POST" });
        const { url } = await res.json();
        window.location.href = url; // Redirect to GitHub login
    };

    return (
        <button
            onClick={connectGitHub}
            className="px-6 py-3 bg-sky-600 text-white rounded"
            disabled={loading}
        >
            {loading ? "Connecting..." : "Connect to GitHub"}
        </button>
    );
}
