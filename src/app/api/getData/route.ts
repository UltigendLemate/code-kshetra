import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { env } from "~/env.js";
import { type Project } from "~/types/project";
import { addNewProject } from '~/lib/queries';
import openai from "openai";
const MODEL_NAME = "gemini-pro";

const API_KEY = env.GOOGLE_AI_API;

async function run(idea : string) {
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
    {text: `prompt - You are a Product Manager at a MNC and you are given a task to make a full blown project structure for a given idea which is {idea} \n\nDevelop a plan which consist of - \n\nNOTE : before suggesting answer for each of these requirements think what is the audience for the product, what should be the tone of the company while marketing it's product, should the business be more creative or professional in it's approach to attract customers. \n\n- target audience \n- current industry trends in India and in US/Europe\n- primary pain points of users\n- the database schema structure for the business in this domain, create this schema in seperate tables for each property. \n- suggested typography [ suggest 2-4 typographies for each business idea, pertaining to the fact how much professional / goofy / kinky the idea is ] , and color scheme [ give atleast 2 color palletes, with 5 colors in each ] for application/website\n- a list of required features in the prototype [ atleast recommend 4 features which a business should offer to its users ]\n- suggest some big brands who are already key players in this domain, and help entrepreneur understand the competitive landscape of the industry in which they want to venture, for example Airbnb, Trivago, makemytrip is for hotel booking, Zomato, Swiggy, Uber eats for food delivery, Hindustan Unilever for FMCG products, and think of all other huge MNCs who can help us in understanding the industry. \n\nidea = ${idea}\n\n\ndevelop all of this in Tabular form. Add any other information which you think any entrepreneur or business owner should keep in mind while starting to work on an idea.\n\nGenerate response in JSON format, like below: \n\noutput : {\ntarget_audience : \"\" , \n// target audience is a string of minimum 26 characters\nindustry_trends : {\nindia: \"\", \n// this will be a string of minimum 26 characters\nus_europe: \"\", \n// this will be a string of minimum 26 characters\n},  \n\npain_points_of_user: \"\", \n// pain_points is an array of strings of each 60 characters\ndatabase _schema: [\n// this is a object array for which we require db table\nevery object has : \ncategory: [\n // this is first category on which i need to make db table, and \n// we need to mention the properties this will have\n], \nproperties : string[]\nfor example : category : \"user\", properties : \"userid\",\"name\",\"email\",\"phone_number\" etc\n], \nwebsite_ui : [\ntypography : [\n// object array with different typographies as strings, \n], \ncolor_pallete : [\n// object array with different typographies as strings, \n],\n], \n\nrequired_features : [\n \" \", \n \" \",\n \" \",\n\n// required_features is an object array of strings with minimum 50 characters\n], \n\nbig_brands : [\n\" \" , \" \" , \" \" , \n\n// big_brands is an object array of strings with each string of minimum 8 characters\n],\ngive output only as a perfect JSON typesafe object in the following type : \ntype Project = {\n    big_brands : string[],\n    database_schema : {\n        category : string,\n        properties : string[]\n    }[],\n    industry_trends : {\n        india : string,\n        us_europe : string\n    },\n    pain_points_of_user : string[],\n    required_features : string[],\n    target_audience : string[],\n    website_ui : {\n        color_pallete : string[][],\n        typography : string[]\n    }\n\n}\n \n ensure the object is a valid json and is of the type Project`},
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response.text();
  const subs = response.substring(7,response.length-3).replace(/[^\{\}\[\]\w\s,":]/g, '');
  const finalJson = JSON.parse(subs) as Project;
  return finalJson;
}


async function image_generation(idea : string) {

  const response = await openai.createImage({
    model: "dall-e-3",
    prompt: "logo for a company that sells " + idea,
    n: 1,
    size: "1024x1024",
  });
  image_url = response.data.data[0].url;
  console.log(image_url);
}

export async function POST(req: Request) {
  try{
      const {idea}  = await req.json() as {idea : string};
      console.log(idea);
        const res = await run(idea);
        console.log(res);
        // res.images = await image_generation(idea);
        const stringified_json = JSON.stringify(res);
        
        if(res) {
          console.log("Adding new project")
          await addNewProject(stringified_json, idea)
        }
        console.log("it must be added now")
        return new Response(JSON.stringify(res), {status: 200});
  }
  catch(error){
    console.log(error);
        return new Response(JSON.stringify(error),{status:500});
  }

}
