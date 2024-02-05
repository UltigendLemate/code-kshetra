import Link from "next/link";
import {} from "module";

export default function HomePage() {
  return (
    <main className="h-full">
      <div className="mx-auto max-w-screen-xl">
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
              ProjectPlannerAI is a platform that suggests marketing strategies,
            </h6>
            <h6 className=" text-xl text-muted-foreground">
              design elements and product features for your idea in minutes.
            </h6>
            <Link href={"/dada"} className="flex justify-center">
              <h6 className="font-sem mt-4 max-w-fit rounded-sm bg-primary px-3 py-2 text-muted hover:bg-secondary-foreground">
                Generate my project plan
              </h6>
            </Link>
          </div>
        </div>

        {/* video div starts  */}
        <div className="my-20 h-[90vh] rounded-3xl border-[12px] border-border"></div>
      </div>
    </main>
  );
}
