import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { env } from "~/env.js";
import { type Project } from "~/types/project";
import { addNewProject } from '~/lib/queries';
import { OpenAI } from "openai";
const MODEL_NAME = "gemini-pro";

const API_KEY = env.GOOGLE_AI_API;



async function ans_refractor(idea : string, query: string, value: string) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    const parts = [
      {text: `
      idea = ${idea}
      query = ${query}
      value = ${value}


      Prompt: with the given above idea, we need to perform the specified query and give a better response by examining the statement given as 'value', you can use latest data 
      of 2023 and 2022 to answer the query, just remember the user requires a heavy understanding of the subject matter. Return the response as a string only 
      `},
    ];
  
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });
  

    const response = result.response.text();
    // const subs = response.substring(7,response.length-3).replace(/[^\{\}\[\]\w\s,":]/g, '');
    // const finalJson = JSON.parse(subs) as string;
    return response;
  }


  export async function POST(req: Request) {
    try{
        const {idea, query, value}  = await req.json() as {idea : string, query: string, value: string};
        console.log(idea);
          const res = await ans_refractor(idea, query, value);
          console.log(res);
          // res.images = await image_generation(idea);
          // const stringified_json = JSON.stringify(res);
          console.log("refraction")
          return new Response(JSON.stringify(res), {status: 200});
    }
    catch(error){
      console.log(error);
          return new Response(JSON.stringify(error),{status:500});
    }
  
  }