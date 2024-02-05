"use client";
import Link from "next/link";
import SmallHeading from "~/components/SmallHeading";
import LargeHeading from "~/components/LargeHeading";
import { Button } from "~/components/ui/button";
import ProjectsCard from "~/components/ProjectsCard";
import FeaturesCard from "~/components/FeeaturesCard";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import Waiting from "~/components/Waiting";
import { BadgeDollarSign, Figma, GanttChartSquare, Laptop, Settings, User } from "lucide-react";

export default function HomePage() {
  return (
    <main className="h-full">
      <div className="">
        {/* hero section */}
        <div className="pt-20 text-center">
          <div>
            <h1 className="text-6xl font-bold">
              Turn your <span className="text-primary">idea</span> into
            </h1>
            <h1 className="text-6xl font-bold">
              a <span className="text-primary">plan</span> with{" "}
              <span className="text-primary">1 click</span>
            </h1>
          </div>
          <div className=" pt-4">
            <h6 className=" text-xl text-muted-foreground">
              QuikPlanr is a platform that suggests marketing strategies,
            </h6>
            <h6 className=" text-xl text-muted-foreground">
              design elements and product features for your idea in minutes.
            </h6>
            <Button className="mt-4">
              <Link href={"/project"} className="flex justify-center">
                Generate my project plan
              </Link>
            </Button>
          </div>
        </div>

        {/* video div starts  */}
        <div className="mx-auto my-20 h-[90vh] max-w-screen-xl rounded-3xl border-[12px] border-border"></div>

        {/* features section */}
        <div className="mx-auto max-w-screen-xl pb-20 pt-10">
          <SmallHeading text="Features" />
          <LargeHeading text="Save Hours of researching" />
          <div className="grid grid-cols-6 gap-10 pt-10">
            <div className="col-span-2">
              <FeaturesCard
                icon = {<GanttChartSquare />}
                title="Overview"
                desc="Provides a general summary and insight into the project."
              />
            </div>
            <div className="col-span-2">
              <FeaturesCard
                icon = {<BadgeDollarSign />}
                title="Marketing"
                desc="Focuses on marketing-related aspects such as product names, icons, assets, and competitive analysis."
              />
            </div>
            <div className="col-span-2">
              <FeaturesCard
                icon = {<Figma />}
                title="Design"
                desc="Covers design elements including color palette, designs, and suggested typography."
              />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-10 pt-10">
            <div className="col-span-1"></div>
            <div className="col-span-2">
              <FeaturesCard
                icon = {<Settings />}
                title="Functionality"
                desc="Addresses functional aspects like required features, additional features, and information architecture."
              />
            </div>
            <div className="col-span-2">
              <FeaturesCard
                icon = {<Laptop />}
                title="Technology"
                desc="Encompasses technological considerations, specifically database models."
              />
            </div>
            <div className="col-span-1"></div>
          </div>
        </div>

        {/* examples section */}
        <div className=" bg-blue-100 py-16 ">
          <div className="mx-auto max-w-screen-xl">
            <SmallHeading text="Examples" />
            <LargeHeading text="Built with QuickPlanr" />
            <div className="grid gap-10 pt-10 md:grid-cols-3">
              <ProjectsCard
                image="/ex-01.webp"
                title="Yummly"
                date="5 Feb 2024"
                desc="An app to organise recipees"
                id = "912cfd4f-f3a6-4111-868e-e771ff0cfb14"
              />

              <ProjectsCard
                image="/rentcam.png"
                title="LensRentals"
                date="5 Feb 2024"
                desc="a website to rent media equipment"
                id="fd000f9c-97f3-4fda-aee0-851a53af3136"
              />
              <ProjectsCard
                image="/cloudkitchen.png"
                title="AsapEats"
                id="c8dfa1ee-06fa-443b-841f-51383641a6b9"
                date="5 Feb 2024"
                desc="fast food business on cloud kitchen model"
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
