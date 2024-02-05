import Image from "next/image";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface ProjectsCardProps {
  image: string;
  title: string;
  date: string;
  desc: string;
}

const ProjectsCard: React.FC<ProjectsCardProps> = ({
  image,
  title,
  date,
  desc,
}: ProjectsCardProps) => {
  return (
    <Card className="shadow-lg duration-75 hover:scale-[1.01]">
      <CardHeader>
        <Image
          src={image}
          height={250}
          width={400}
          alt="image"
          className="h-[200px] w-full rounded-sm object-cover"
        />
      </CardHeader>
      <CardContent className="space-y-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{date}</CardDescription>
        <CardDescription className="font-bold text-secondary-foreground">
          {desc}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default ProjectsCard;
