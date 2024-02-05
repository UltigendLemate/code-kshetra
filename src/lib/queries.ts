'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { eq } from 'drizzle-orm';
import { db } from "~/server/db";
import { type Project } from "~/types/project";
import { project } from "~/server/db/schema";
import { v4 as uuidv4} from "uuid";
export const addNewProject = async (newProject: Project, idea: string) => {

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("You must be logged in to add a new project");
    }
    // Add the project to the database
    const uid = uuidv4() as string;
    await db.insert(project).values({
      id: uid,
      idea: idea,
      data: JSON.stringify(newProject),
      createdById: session.user.id,
    });
    return uid;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add new project");
  }
};


export const getProject = async (id : string) => {
  try {
    const res = await db.query.project.findFirst({
      where(fields, operators) {
          return eq(fields.id, id );
      },
  });
    return res;
  } 
  catch (error) {
    console.error(error);
    throw new Error("Failed to get projects");
  }
}
