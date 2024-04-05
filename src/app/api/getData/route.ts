import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { env } from "~/env.js";
import { type Project } from "~/types/project";
import { addNewProject } from "~/lib/queries";
import { OpenAI } from "openai";
const MODEL_NAME = "gemini-pro";

const API_KEY = env.GOOGLE_AI_API;

async function run(idea: string) {
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
    {
      text: `prompt - You are a Product Manager at a MNC and you are given a task to make a full blown project structure for a given idea which is {idea}

      Develop a plan which consist of - 
      
      NOTE : before suggesting answer for each of these requirements think what is the audience for the product, what should be the tone of the company while marketing it's product, should the business be more creative or professional in it's approach to attract customers. 
      
      - overview of the business idea, what is the business idea, what is the problem it is solving, what is the USP of the business
      - target audience ( make a list of target audience, seperated by commas, atleat 4)
      -suggested names for the business (total number of suggestions should be in mutliples of 4)
      - current industry trends in India and in US/Europe
      - primary pain points of users in this domain, atleast 4 pain points in an array
      - the database schema structure for the business in this domain, create this schema in seperate tables for each property. 
      - suggested typography [ suggest 2-4 typographies for each business idea, pertaining to the fact how much professional / goofy / kinky the idea is ] , and color scheme [ recommend atleast 2 color palletes with 5 colors each and in each color pallete should be of only one color with subsequent colors in pallete having an opacity of -20% each ] for application/website
      - a list of required features in the prototype [ atleast recommend 4 features which a business should offer to its users ]
      - competitor analysis suggest some real big brands who are already key players in this domain, and help entrepreneur understand the competitive landscape of the industry in which they want to venture, for example Airbnb, Trivago, makemytrip is for hotel booking, Zomato, Swiggy, Uber eats for food delivery, Hindustan Unilever for FMCG products, and think of all other huge MNCs who can help us in understanding the industry.  atleast 3 competition brands Include their competitor analysis [ list the unique selling points of the big brand competitors, compare their pricing, promotion,product, their shortcomings, user complaints and praises ]   
    -SWOT analysis [ suggest 4-5 points for each strengths, weaknesses, opportunities and threats separately to analyze the business in terms of customer experience, sales strategy, pricing strategy, brand positioning, product viability, search engine requests for similar demand ] 
      - Carbon_footprints_from_different_operations [ suggest integral values with unit in kg or tonnes of CO2 equivalent per unit each for different operations of the business venture like energy, fuel , resource consumption, transportation and industrial and commercial processes . suggest potential reasons for generating carbon footprint in this business] 
      - a list of points suggesting measures to reduce carbon footprints and suggest sustainable measures that can be adopted by the user for business idea.
      - a list of points suggesting measures to incorporate corporate social responsibility that a company be socially accountable to itself, its stakeholders and public.
      
      idea = ${idea}
      
      develop all of this in Tabular form. Add any other information which you think any entrepreneur or business owner should keep in mind while starting to work on an idea.
      
      Generate response in JSON format, like below: 
      
      output : {
      overview : "", 
      target_audience : "" , 
      // target audience is an array of strings of minimum 4 strings. all strings are target audience.
      industry_trends : {
      india: "", 
      // this will be a string of minimum 26 characters
      us_europe: "", 
      // this will be a string of minimum 26 characters
      },  
      
      pain_points_of_user: "", 
      // pain_points is an array of strings of minimum 70 characters each. ensure it is an array of strings.
      database _schema: [
      // this is a array of objects of category and its properties  for which we require db table
  
      // and so on ........
      ], 
      website_ui : [
      typography : [
      // object array with different typographies as strings, 
      ], 
      color_pallete : [
      // object array with different color codes as strings, 
      ],
      ], 
      suggested_names : array of strings
      
      required_features : [
       " ", 
       " ",
       " ",
      
      // required_features is an object array of strings with minimum 50 characters
      ], 
      competitor_analysis : [{},{},{}] // competitor_analysis is an array of objects with each object about a real competitor brand and their complete analysis. mention atleast 2 similar brands.
      
      carbon_fp_reasons : "",
      //carbon footprints is an array of strings of minimum 4 points each
      
          sustainable _measures_to_reduce_carbon_footprints:””,
      //sustainable _measures_to_reduce_carbon_footprints is an array of strings of minimum 70 characters each
      
          measures_for_corporate _social_responsibility:””,
      // measures_for_corporate _social_responsibility is an array of strings of minimum 70 characters each
         SWOT_analysis : {
          // object array with different strengths, weaknesses, opportunities and threats as strings, 
          }
      
      
  
      give the output in JSON format strictly. your output should be strictly of the following type : 
      export type Project = {
        overview: string,
        database_schema : {
            category : string,
            properties : string[]
        }[],
        industry_trends : {
            india : string,
            us_europe : string
        },
        pain_points_of_user : string[],
        required_features : string[],
        target_audience : string[],
        website_ui : {
            color_pallete : string[][],
            typography : string[]
        }
        suggested_names : string[],
      
        swot_analysis : {
        strengths : string[],
        weaknesses: string[],
        opportunities: string[],
        threats : string[],   
        },
    
      measures_for_corporate_social_responsibility : string[],
        carbon_fp_reasons : string[],
        sustainable_measures_to_reduce_carbon_footprints: string[],
      competitor_analysis : {name : string,
        "USP": string,
            "pricing_strategy": string,
            "promotion_strategy": string,
            "product_strategy": string,
            "user_complaints" : string,
            "shortcomings": string,
            "user_praises": string
      }[]
    }
      the json should not contain any non json parsable character.  it should strictly follow the given type Project. name the properties exactly the same. no spelling mistake should be there. check 2 times`,
    },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response.text();
  const subs = response
    .substring(7, response.length - 3)
    .replace(/[^\{\}\[\]\w\s,":]/g, "");
  const finalJson = JSON.parse(subs) as Project;
  const correctJson = checkObjectType(finalJson);
  console.log(correctJson)
  return correctJson;

}

function checkObjectType(obj : Project) {
  const defaults : Project = {
      overview: "",
      database_schema: [],
      industry_trends: { india: "", us_europe: "" },
      pain_points_of_user: [],
      required_features: [],
      target_audience: [],
      website_ui: { color_pallete: [[]], typography: [] },
      suggested_names: [],
      app_icons: [],
      web_designs: [],
      swot_analysis: { strengths: [], weaknesses: [], opportunities: [], threats: [] },
      measures_for_corporate_social_responsibility: [],
      carbon_fp_reasons: [],
      sustainable_measures_to_reduce_carbon_footprints: [],
      competitor_analysis: []
  };

  const expectedKeys = Object.keys(defaults);

  // Check if all expected keys are present
  for (const key of expectedKeys) {
      if (!(key in obj)) {
          console.log(`Missing key: ${key}`);
          // obj[key] = defaults[key];
      }
  }



  if (!Array.isArray(obj.database_schema) || obj.database_schema.some(item => typeof item !== 'object' || !Array.isArray(item.properties))) {
      console.log('database_schema should be an array of objects with properties array');
      obj.database_schema = defaults.database_schema;
  }

  if (typeof obj.industry_trends !== 'object' ||
      typeof obj.industry_trends.india !== 'string' ||
      typeof obj.industry_trends.us_europe !== 'string') {
      console.log('industry_trends should be an object with india and us_europe properties of type string');
      obj.industry_trends = defaults.industry_trends;
  }

  if (!Array.isArray(obj.pain_points_of_user) || !obj.pain_points_of_user.every(item => typeof item === 'string')) {
      console.log('pain_points_of_user should be an array of strings');
      obj.pain_points_of_user = defaults.pain_points_of_user;
  }

  if (!Array.isArray(obj.required_features) || !obj.required_features.every(item => typeof item === 'string')) {
      console.log('required_features should be an array of strings');
      obj.required_features = defaults.required_features;
  }

  if (!Array.isArray(obj.target_audience) || !obj.target_audience.every(item => typeof item === 'string')) {
      console.log('target_audience should be an array of strings');
      obj.target_audience = defaults.target_audience;
  }

  if (typeof obj.website_ui !== 'object' ||
      !Array.isArray(obj.website_ui.color_pallete) ||
      !obj.website_ui.color_pallete.every(item => Array.isArray(item) && item.every(color => typeof color === 'string')) ||
      !Array.isArray(obj.website_ui.typography) ||
      !obj.website_ui.typography.every(item => typeof item === 'string')) {
      console.log('website_ui should be an object with color_pallete as an array of arrays of strings and typography as an array of strings');
      obj.website_ui = defaults.website_ui;
  }

  // Optional properties
  if (obj.overview && typeof obj.overview !== 'string') {
      console.log('overview should be a string');
      obj.overview = defaults.overview;
  }

  if (obj.suggested_names && (!Array.isArray(obj.suggested_names) || !obj.suggested_names.every(item => typeof item === 'string'))) {
      console.log('suggested_names should be an array of strings');
      obj.suggested_names = defaults.suggested_names;
  }

  if (obj.app_icons && (!Array.isArray(obj.app_icons) || !obj.app_icons.every(item => typeof item === 'string'))) {
      console.log('app_icons should be an array of strings');
      obj.app_icons = defaults.app_icons;
  }

  if (obj.web_designs && (!Array.isArray(obj.web_designs) || !obj.web_designs.every(item => typeof item === 'string'))) {
      console.log('web_designs should be an array of strings');
      obj.web_designs = defaults.web_designs;
  }

  if (obj.swot_analysis && (typeof obj.swot_analysis !== 'object' ||
      !Array.isArray(obj.swot_analysis.strengths) ||
      !obj.swot_analysis.strengths.every(item => typeof item === 'string') ||
      !Array.isArray(obj.swot_analysis.weaknesses) ||
      !obj.swot_analysis.weaknesses.every(item => typeof item === 'string') ||
      !Array.isArray(obj.swot_analysis.opportunities) ||
      !obj.swot_analysis.opportunities.every(item => typeof item === 'string') ||
      !Array.isArray(obj.swot_analysis.threats) ||
      !obj.swot_analysis.threats.every(item => typeof item === 'string'))) {
      console.log('swot_analysis should be an object with strenghts, weaknesses, opportunities, and threats as arrays of strings');
      obj.swot_analysis = defaults.swot_analysis;
  }

  if (obj.measures_for_corporate_social_responsibility && (!Array.isArray(obj.measures_for_corporate_social_responsibility) || !obj.measures_for_corporate_social_responsibility.every(item => typeof item === 'string'))) {
      console.log('measures_for_corporate_social_responsibility should be an array of strings');
      obj.measures_for_corporate_social_responsibility = defaults.measures_for_corporate_social_responsibility;
  }

  if (obj.carbon_fp_reasons && (!Array.isArray(obj.carbon_fp_reasons) || !obj.carbon_fp_reasons.every(item => typeof item === 'string'))) {
      console.log('carbon_fp_reasons should be an array of strings');
      obj.carbon_fp_reasons = defaults.carbon_fp_reasons;
  }

  if (obj.sustainable_measures_to_reduce_carbon_footprints && (!Array.isArray(obj.sustainable_measures_to_reduce_carbon_footprints) || !obj.sustainable_measures_to_reduce_carbon_footprints.every(item => typeof item === 'string'))) {
      console.log('sustainable_measures_to_reduce_carbon_footprints should be an array of strings');
      obj.sustainable_measures_to_reduce_carbon_footprints = defaults.sustainable_measures_to_reduce_carbon_footprints;
  }

  if (obj.competitor_analysis && (!Array.isArray(obj.competitor_analysis) || !obj.competitor_analysis.every(item => typeof item === 'object' &&
      typeof item.name === 'string' &&
      typeof item.USP === 'string' &&
      typeof item.pricing_strategy === 'string' &&
      typeof item.promotion_strategy === 'string' &&
      typeof item.product_strategy === 'string' &&
      typeof item.user_complaints === 'string' &&
      typeof item.shortcomings === 'string' &&
      typeof item.user_praises === 'string'))) {
      console.log('competitor_analysis should be an array of objects with specified properties');
      obj.competitor_analysis = defaults.competitor_analysis;
  }

  return obj;
}
// const openai = new OpenAI();

// async function image_generation(idea : string) {
//   const response = await openai.images.generate({
//     model: "dall-e-3",
//     prompt: "a white siamese cat",
//     n: 4,
//     size: "1024x1024",
//   });
//   const image_url = response.data;
//   return image_url;
// }

export async function POST(req: Request) {
  try {
    const { idea } = (await req.json()) as { idea: string };
    console.log(idea);
    const res = await run(idea);
    console.log(res);
    // res.images = await image_generation(idea);
    // const stringified_json = JSON.stringify(res);

    console.log("Adding new project");
    const id = await addNewProject(res, idea);

    console.log("it must be added now");
    return new Response(JSON.stringify({ res, id }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
