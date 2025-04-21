import { GoogleGenerativeAI } from "@google/generative-ai";
// import 'dotenv/config'
// SYSTEM PROMPT 
const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`;
  
// Initialize the Gemini API client (replace with your own API key)
const genAI = new GoogleGenerativeAI("AIzaSyAnSdCGXuzoIPSX2Pubmbn8wm1wndkABdI");

export async function getRecipeFromGemini(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");
  
  try {
    // Get the Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    // Create a content generation request
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${SYSTEM_PROMPT}\n\nI have ${ingredientsString}. Please give me a recipe you'd recommend I make!`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      }
    });
    // console.log(result);
    // const resultText = await result.response.text();
    // console.log(resultText)
    return await result.response.text();
  } catch (err) {
    console.error("Error from Gemini API:", err.message);
    return "Error fetching recipe from Gemini.";
  }
}
