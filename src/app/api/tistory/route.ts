// src/app/api/tistory/route.ts

import { NextResponse } from "next/server";
import Parser from "rss-parser";

interface TistoryItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  categories?: string[];
}

export async function GET() {
  try {
    const rssUrl = "https://yoonseo0832.tistory.com/rss";

    // Add User-Agent and extend Accept headers
    const response = await fetch(rssUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`RSS request failed: ${response.status}`);
    }

    const xml = await response.text();
    const parser = new Parser<Record<string, never>, TistoryItem>();
    const feed = await parser.parseString(xml);

    return NextResponse.json(feed.items);
  } catch (error) {
    console.error("Tistory RSS error", error);
    return NextResponse.json(
      { error: "Failed to fetch RSS feed" },
      { status: 500 },
    );
  }
}
