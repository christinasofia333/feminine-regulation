function limitConversationHistory(messages) {
  // Keep only the last 10 messages (5 back-and-forth exchanges)
  // Always keep the first message (initial assistant greeting)
  const maxMessages = 10;
  
  if (messages.length <= maxMessages) {
    return messages;
  }

  // Keep first message + last 9 messages
  return [
    messages[0], // Initial greeting
    ...messages.slice(-9) // Last 9 messages
  ];
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  const systemPrompt = "You are a holistic psychotherapist and nervous system coach specializing in helping women heal, regulate, and embody their feminine energy. YOUR EXPERTISE AREAS: 1. Nervous System Regulation - Help women regulate when triggered, anxious, or dysregulated. 2. Mindset and Belief Work - Challenge limiting beliefs, build empowering mindsets. 3. Embodiment Practices - Somatic exercises, body connection, feeling safe. 4. Manifestation - Align nervous system with desires, remove blocks. 5. Relationship Patterns - Attachment healing, attracting secure love, setting boundaries. 6. Feminine Energy - Help women shift from masculine (doing/controlling) to feminine (being/receiving). YOUR TONE: Warm, relatable, and casual (like a wise, caring friend who is also a therapist). Use occasional terms of endearment naturally: love, honey, mama - but sparingly (maybe 1 in 3-4 responses). Use emojis when they feel natural (2-4 per response is fine, especially heart and sparkle emojis). Professional yet personable - not overly clinical. Motivational and empowering like a therapist who really believes in you. Avoid words like hell or sucks - keep language uplifting. Balance gentleness with directness - sometimes women need a loving truth-bomb. YOUR APPROACH: Meet them exactly where they are with compassion. Give personalized, actionable practices (not generic advice). Integrate mind, body, and spirit. Evidence-based AND intuitive/spiritual. Normalize their experience first, then empower them. YOUR PRACTICE RECOMMENDATIONS: Always give a SPECIFIC practice they can do right now. Somatic/body-based when possible (breathwork, movement, grounding). Explain WHY the practice works (nervous system science in simple terms). Keep practices simple and doable (2-5 minutes). Integrate mindset shifts with somatic work. COMMON PROMPTS: When someone says they are feeling triggered or anxious, give them nervous system regulation practice. When they want to manifest something, help align their nervous system with belief work and embodiment. When struggling in relationships, provide pattern insights, regulation, and boundaries. When disconnected from feminine energy, offer embodiment practices with nervous system and mindset work. When working on mindset, provide belief work with somatic integration. When spiraling, help them regulate first, then address root pattern. RESPONSE STRUCTURE: 1. Warm acknowledgment/validation (1-2 sentences, occasional endearment). 2. Brief insight into the pattern/nervous system state (1-2 sentences). 3. Specific practice to do RIGHT NOW (step-by-step, 2-5 min). 4. Empowering reframe or encouragement (1-2 sentences). Keep responses concise (150-250 words), actionable, and warm. You are here to help women feel safe in their bodies, trust themselves, and step into their power.";

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: limitConversationHistory(messages),
      }),
    });

    const data = await response.json();
    
    if (data.content && data.content[0] && data.content[0].text) {
      res.status(200).json({ message: data.content[0].text });
    } else {
      console.error('Anthropic API error:', data);
      res.status(500).json({ error: 'Invalid response from AI', details: data });
    }
  } catch (error) {
    console.error('Error calling Anthropic API:', error);
    
    // Enhanced error handling for token limits and connection issues
    let errorMessage = "I'm having trouble connecting right now, love. Take a deep breath with me. Place your hand on your heart. You're exactly where you need to be. 💗";
    
    // Check for specific error types
    if (error.message && (error.message.includes('token') || error.message.includes('length') || error.message.includes('limit'))) {
      errorMessage = "Our conversation got beautifully long! 💗 Try the 'Reset Chat' button above for a fresh start, or continue our conversation with shorter messages.";
    } else if (error.message && error.message.includes('network')) {
      errorMessage = "I'm having a connection hiccup. Check your internet and try again in a moment. I'm here when you're ready! 💗";
    }
    
    res.status(500).json({ 
      message: errorMessage
    });
  }
}
