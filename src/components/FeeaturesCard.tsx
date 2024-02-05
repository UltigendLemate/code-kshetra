import { Star } from "lucide-react";
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

interface FeaturesCardProps {
  icon : React.ReactNode;
  title: string;
  desc: string;
}

const FeaturesCard: React.FC<FeaturesCardProps> = ({

  title,
  desc,
  icon
}: FeaturesCardProps) => {
  return (
    <Card className="grid grid-cols-5 shadow-md">
      <CardHeader className="col-span-1 mx-auto p-4">
        {icon}
      </CardHeader>
      <CardContent className="col-span-4 space-y-3 pl-0 pt-5">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default FeaturesCard;
