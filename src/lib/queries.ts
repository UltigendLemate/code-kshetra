'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { db } from "~/server/db";
import { type Project } from "~/types/project";
import { project } from "~/server/db/schema";

export const addNewProject = async (newProject: Project, idea: string) => {

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("You must be logged in to add a new project");
    }
    // Add the project to the database
    await db.insert(project).values({
      idea: idea,
      data: JSON.stringify(newProject),
      createdById: session.user.id,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add new project");
  }
};
