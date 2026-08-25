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
      // Tistory category changes should be visible without waiting for the
      // previous one-hour RSS response to expire.
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`RSS request failed: ${response.status}`);
    }

    const xml = await response.text();
    const parser = new Parser<Record<string, never>, TistoryItem>();
    const feed = await parser.parseString(xml);

    // Tistory omits `category` when a post has no categories. Normalize the
    // response so the UI can safely render every item.
    const posts = feed.items.map((item) => ({
      title: item.title ?? "Untitled post",
      link: item.link ?? rssUrl,
      pubDate: item.pubDate ?? "",
      contentSnippet: item.contentSnippet ?? "",
      categories: item.categories ?? [],
    }));

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Tistory RSS error", error);
    return NextResponse.json(
      { error: "Failed to fetch RSS feed" },
      { status: 500 },
    );
  }
}
