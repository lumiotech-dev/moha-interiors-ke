import { GoogleGenerativeAI } from "@google/generative-ai";

export class AIService {
    private genAI: GoogleGenerativeAI;

    constructor() {
        // Initialize with API Key from environment
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    }

    /**
     * Generates a luxury-toned response for social media messages
     */
    async generateSocialResponse(messageContent: string, platform: string) {
        const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      You are the AI Concierge for Moha Interiors, a ultra-luxury interior design firm in Kenya.
      
      Client Message from ${platform}: "${messageContent}"
      
      Tasks:
      1. Analyze the sentiment.
      2. Draft a response that is professional, elite, and welcoming. 
      3. Maintain a tone of "quiet luxury" (minimalist, confident, helpful).
      4. Mention that an interior architect will reach out shortly for a private consultation.

      Return the result in JSON format:
      {
        "sentiment": "positive/neutral/negative",
        "response": "the drafted response",
        "intent": "purchase/inquiry/complaint/other"
      }
    `;

        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return JSON.parse(response.text());
        } catch (error) {
            console.error("AI Generation Error:", error);
            return {
                sentiment: "neutral",
                response: "Thank you for reaching out to Moha Interiors. A member of our design team will contact you shortly to schedule a private consultation.",
                intent: "inquiry"
            };
        }
    }

    /**
     * Scores a lead based on their message and profile info
     */
    async scoreLead(leadData: { name: string; email: string; message: string }) {
        const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      Score this interior design lead on a scale of 0-100 based on purchase intent and luxury fit.
      
      Lead Name: ${leadData.name}
      Lead Email: ${leadData.email}
      Message: "${leadData.message}"
      
      High scores for: Business emails, specific project details, mentions of high-end areas (e.g., Muthaiga, Karen, Runda), architectural terminology.
      
      Return JSON:
      {
        "score": number,
        "reasoning": "short explanation",
        "category": "hot/warm/cold"
      }
    `;

        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return JSON.parse(response.text());
        } catch (error) {
            return { score: 50, reasoning: "Default scoring due to AI timeout.", category: "warm" };
        }
    }

    /**
     * Provides expert interior design consultation advice
     */
    async generateDesignAdvice(query: string, context?: string) {
        const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // Using Pro for better advice

        const prompt = `
      You are the Lead Interior Architect at Moha Interiors, Kenya's premier luxury design firm.
      You are speaking with a potential client.
      
      Client Inquiry: "${query}"
      ${context ? `Additional Context: ${context}` : ""}

      Guidelines:
      1. Provide sophisticated, expert-level interior design advice.
      2. Mention high-end materials (e.g., Italian marble, Belgian linens, Kenyan artisan wood).
      3. Your tone is "Elegant, Confident, Minimalist".
      4. Suggest a specific luxury design style if applicable (e.g., Biophilic Luxury, Afro-Minimalism, Contemporary Noir).
      5. Don't be too wordy; luxury is about quality, not quantity.
      6. End by suggesting they book a site visit for a bespoke assessment.

      Response format (Markdown):
      Provide a beautifully formatted response.
    `;

        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error("Design Advice Error:", error);
            return "An error occurred while consulting our design registry. Please contact our concierge directly for immediate assistance.";
        }
    }

    /**
     * Expands a simple concept into a professional architectural rendering prompt
     */
    async expandRenderPrompt(userPrompt: string) {
        const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      Convert the following interior design concept into a highly detailed technical prompt for a high-end AI image generator (like Midjourney or Stable Diffusion).
      
      Concept: "${userPrompt}"

      Include:
      - Specific architectural lighting (e.g., volumetric, soft diffusion, golden hour).
      - Material textures (e.g., brushed brass, polished concrete, sustainable bamboo).
      - Camera settings (e.g., 8k, photorealistic, wide-angle lens, depth of field).
      - Style keywords (e.g., Moha Interiors Signature, Minimalist Luxury, High-End Kenyan Contemporary).

      Return ONLY the expanded prompt string.
    `;

        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text().trim();
        } catch (error) {
            return userPrompt; // Fallback to raw prompt
        }
    }
}

export const aiService = new AIService();
