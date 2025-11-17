import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const { shop } = await request.json();
    // For now, simulate fetching products from Shopify (add real API later)
    const products = [{ id: 1, title: 'Test Product', body_html: 'Old description' }]; // Placeholder

    for (const product of products.slice(0, 5)) { // Limit to 5 for test
      const keyword = product.title.split(' ')[0];
      // Simulate competitor scrape (in real: use a scraper like Firecrawl)
      const competitorText = 'Competitor title: Best Test Product Ever. Description: Amazing quality, fast shipping...'; 

      const prompt = `Rewrite this Shopify product to rank #1 on Google for "${keyword}". Beat this competitor: ${competitorText}.

Current title: ${product.title}
Current description: ${product.body_html}

Make it SEO-optimized, persuasive, 500+ words. Return JSON: {"title": "...", "description": "..."}`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      // In real app: Update product via Shopify API
      console.log('Updated:', result); // Log for now
    }

    return NextResponse.json({ success: true, message: 'Optimized 5 products!' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to optimize' }, { status: 500 });
  }
}
