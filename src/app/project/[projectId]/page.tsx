/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { set } from "zod";
import axios from 'axios'
import Sidebar from "~/components/sidebar";
import Description from "~/components/project/Description";
import Heading from "~/components/project/Heading";
import Overview from "~/components/project/Overview";
import { Button } from "~/components/ui/button";
import { getProject } from "~/lib/queries";
import { cn } from "~/lib/utils";
import { type Project } from "~/types/project";
import { ArrowBigUpDash, BookCheck, Bug, CaseSensitive, DatabaseZap, Palette, Wand2, Users, Figma, BookType } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip"

export default function ProjectPage({ params }: { params: { projectId: string } }) {
  const [proj, setProj] = useState<Project>()
  const [refractoredAnsOverview, setRefractoredAnsOverview] = useState<string>("")
  const [refractoredAnsTA, setRefractoredAnsTA] = useState<string>("")
  const [active, setActive] = useState<string>('overview')
  console.log(proj)
  const [idea, setIdea] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true)
      const res = await getProject(params.projectId);
      const jsonProj = JSON.parse(res?.data ?? "") as Project
      console.log("fetchproj", jsonProj)
      setProj(jsonProj)
      setIdea(res?.idea ?? "")
      setIsLoading(false)
    }
    void fetchProject();
  }, [])


  const refractor = async (query: string, value: string) => {
    setIsLoading(true)
    const res = await axios.post('/api/refractor', { idea: idea, query: query, value: value });
    setIsLoading(false)
    return res;
  }
  // console.log(JSON.stringify(refractoredAns.data, null, 2) + "  refracter")
  console.log("proj printing", proj)

  return (
    <>
      <div className="flex h-full w-full bg-blue-200 relative">
        <Sidebar active={active} />
        <div className="flex w-4/5 flex-col gap-5 bg-muted p-6 shadow-lg shadow-black absolute right-0">
          <h2 className="px-5  text-2xl font-semibold capitalize ">{idea}</h2>
          <div className="rounded-md bg-gray-50 p-6 group shadow-xl relative">
            <Dialog >
              <DialogTrigger asChild>
                {proj?.overview ? (<Button
                  className="absolute right-5 top-5 hidden group-hover:flex"
                  variant="outline"><Wand2 /> <p className="p-[0.3rem]">Edit with AI</p></Button>) : null}
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit with AI</DialogTitle>
                  <DialogDescription>
                    Select the option you want and let the AI give you tailored answers
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 items-center gap-4">
                    <DialogClose asChild>


                      <Button
                        onClick={() => {
                          refractor("Extrapolate this data with latest research till 2023", proj?.overview ?? "").then(
                            (res) => setRefractoredAnsOverview(res.data as string)
                          ).catch((err) => alert(err))
                        }}
                        type="submit">Extrapolate this data with latest research till 2023</Button>
                    </DialogClose>
                    <DialogClose asChild>
                    <Button
                      onClick={() => {
                        refractor("Expand the answer to understand with ease", proj?.overview ?? "").then(
                          (res) => setRefractoredAnsOverview(res.data as string)
                        ).catch((err) => alert(err))
                      }}
                      type="submit">Expand the answer to understand with ease</Button>
                      </DialogClose>

                      <DialogClose asChild>
                    <Button
                      onClick={() => {
                        refractor("Explain this data in less words", proj?.overview ?? "").then(
                          (res) => setRefractoredAnsOverview(res.data as string)
                        ).catch((err) => alert(err))
                      }}
                      type="submit">Explain this data in less words</Button>
                      </DialogClose>

                  </div>
                </div>
              </DialogContent>
            </Dialog>


            <Heading setActive={setActive} text="Overview" />
            {isLoading || !proj ? (
              <div className="space-y-2">
                <h6 className="h-10 w-full animate-pulse rounded-md bg-gray-300 duration-1000"></h6>
                <h6 className="h-10 w-full animate-pulse rounded-md bg-gray-300 duration-1000"></h6>
                <h6 className="h-10 w-full animate-pulse rounded-md bg-gray-300 duration-1000"></h6>
              </div>
            ) : (
              <>
                <Description text={proj?.overview} />
                {
                  refractoredAnsOverview ? (
                    <Description text={refractoredAnsOverview} />

                  ) : null
                }
              </>
            )}
          </div>

          {/* Name Suggestions  */}
          <div className="rounded-md bg-gray-50 p-6 shadow-xl relative group">
            <Dialog >
              <DialogTrigger asChild>
                {proj?.overview ? (<Button
                  className="absolute right-5 top-5 hidden group-hover:flex"
                  variant="outline"><Wand2 /> <p className="p-[0.3rem]">Edit with AI</p></Button>) : null}
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit with AI</DialogTitle>
                  <DialogDescription>
                    Select the option you want and let the AI give you tailored answers
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Button
                      // onClick={() => {

                      // }}
                      type="submit">Extrapolate this data with latest research till 2023</Button>
                    <Button type="submit">Expand the answer to understand with ease</Button>
                    <Button type="submit">Explain this data in less words</Button>
                    {/* <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" /> */}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Heading icon={<BookType />} setActive={setActive} text="Suggested Names" />
            {/* <Description text={` ${proj?.target_audience}`} /> */}
            <div>
              <div className="mt-3 grid  grid-cols-3 gap-4">
                {isLoading || !proj?.suggested_names
                  ? [...Array(6)].map((index) => {
                    return (
                      <div
                        key={index}
                        className="flex animate-pulse flex-col gap-1 rounded-md bg-blue-200 p-3 text-left duration-1000"
                      >
                        <div className="h-5 w-full " />
                      </div>
                    );
                  })
                  : proj.suggested_names.map((aud, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-col gap-1 rounded-md bg-blue-100 p-3 text-left"
                      >
                        <h4
                          className="text-xl font-medium capitalize"

                        >
                          {aud}
                        </h4>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="rounded-md bg-gray-50 p-6 group shadow-xl relative">
            <Dialog >
              <DialogTrigger asChild>
                {proj?.overview ? (<Button
                  className="absolute right-5 top-5 hidden group-hover:flex"
                  variant="outline"><Wand2 /> <p className="p-[0.3rem]">Edit with AI</p></Button>) : null}
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit with AI</DialogTitle>
                  <DialogDescription>
                    Select the option you want and let the AI give you tailored answers
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Button
                      // onClick={() => {
                      //   refractor(idea, "Extrapolate this data with latest research till 2023", proj.overview).then(
                      //     (res) => setRefractoredAnsTA(res.data as string)
                      //   ).catch((err) => alert(err))
                      // }}
                      type="submit">Extrapolate this data with latest research till 2023</Button>
                    <Button
                      // onClick={() => {
                      //   refractor(idea, "Expand the answer to understand with ease", proj.overview).then(
                      //     (res) => setRefractoredAnsTA(res.data as string)
                      //   ).catch((err) => alert(err))
                      // }}
                      type="submit">Expand the answer to understand with ease</Button>
                    <Button
                      // onClick={() => {
                      //   refractor(idea, "Explain this data in less words", proj.overview).then(
                      //     (res) => setRefractoredAnsTA(res.data as string)
                      //   ).catch((err) => alert(err))
                      // }}
                      type="submit">Explain this data in less words</Button>
                    {/* <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" /> */}
                  </div>
                </div>
              </DialogContent>
            </Dialog>


            <Heading icon={<Users />} setActive={setActive} text="Target Audience" />
            <div>
              {!isLoading && <p className="text-md ">Your key target audience includes :</p>}
              <div className="flex gap-4 flex-wrap">
                {isLoading || !proj ? (
                  <div className="w-full space-y-2  ">
                    <h6 className="h-10 w-full animate-pulse rounded-md bg-gray-300 duration-1000"></h6>
                    <h6 className="h-10 w-full animate-pulse rounded-md bg-gray-300 duration-1000"></h6>
                    <h6 className="h-10 w-full animate-pulse rounded-md bg-gray-300 duration-1000"></h6>
                  </div>
                ) : (
                  proj.target_audience.split(",").map((aud, index) => {
                    return (
                      <>
                        <p
                          key={index}
                          className=" text-md  capitalize underline underline-offset-4"
                        >
                          {aud}
                        </p>

                        {/* {
  refractoredAnsOverview ? (
    <p className="text-black text-center text-xs my-[0.2rem]">
      {refractoredAnsTA}
    </p>
  ) : null
} */}
                      </>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Ui Designs */}
          <div className="rounded-md bg-gray-50 p-6 shadow-xl relative group">
            <Dialog >
              <DialogTrigger asChild>
                {proj?.overview ? (<Button
                  className="absolute right-5 top-5 hidden group-hover:flex"
                  variant="outline"><Wand2 /> <p className="p-[0.3rem]">Edit with AI</p></Button>) : null}
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit with AI</DialogTitle>
                  <DialogDescription>
                    Select the option you want and let the AI give you tailored answers
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Button
                      // onClick={() => {

                      // }}
                      type="submit">Extrapolate this data with latest research till 2023</Button>
                    <Button type="submit">Expand the answer to understand with ease</Button>
                    <Button type="submit">Explain this data in less words</Button>
                    {/* <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" /> */}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Heading icon={<Figma />} setActive={setActive} text="Suggested UI Designs" />
            {/* <Description text={` ${proj?.target_audience}`} /> */}
            <div>
              <div className="mt-3 grid grid-cols-4 gap-4">
                {isLoading || !proj
                  ? [...Array(4)].map((aud, index) => {
                    return (
                      <div
                        key={index}
                        className="h-10 w-full animate-pulse rounded-md bg-violet-100 duration-1000"
                      >
                        <h4 className="mb-2 text-lg font-bold capitalize underline underline-offset-2"></h4>
                        {[...Array(5)].map((prop, index) => {
                          return <p key={index}>{prop}</p>;
                        })}
                      </div>
                    );
                  })
                  : ["08", "07", "06", "05"].map((aud, index) => {
                    return <img key={index} src={`/${aud}.png`} className="w-full h-full object-cover" />
                  }
                  )}
              </div>
            </div>
          </div>

          {/* DB Schema  */}
          <div className="rounded-md bg-gray-50 p-6 shadow-xl relative group">
            <Dialog >
              <DialogTrigger asChild>
                {proj?.overview ? (<Button
                  className="absolute right-5 top-5 hidden group-hover:flex"
                  variant="outline"><Wand2 /> <p className="p-[0.3rem]">Edit with AI</p></Button>) : null}
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit with AI</DialogTitle>
                  <DialogDescription>
                    Select the option you want and let the AI give you tailored answers
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Button
                      // onClick={() => {

                      // }}
                      type="submit">Extrapolate this data with latest research till 2023</Button>
                    <Button type="submit">Expand the answer to understand with ease</Button>
                    <Button type="submit">Explain this data in less words</Button>
                    {/* <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" /> */}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Heading icon={<DatabaseZap />} setActive={setActive} text="Database Schema Suggestions" />
            {/* <Description text={` ${proj?.target_audience}`} /> */}
            <div>
              <div className="mt-3 grid grid-cols-4 gap-4">
                {isLoading || !proj
                  ? [...Array(4)].map((aud, index) => {
                    return (
                      <div
                        key={index}
                        className="h-10 w-full animate-pulse rounded-md bg-violet-100 duration-1000"
                      >
                        <h4 className="mb-2 text-lg font-bold capitalize underline underline-offset-2"></h4>
                        {[...Array(5)].map((prop, index) => {
                          return <p key={index}>{prop}</p>;
                        })}
                      </div>
                    );
                  })
                  : proj.database_schema.map((aud, index) => {
                    return (
                      <div
                        key={index}
                        className="text-md rounded-md bg-violet-100 p-3 capitalize"
                      >
                        <h4 className="mb-2 text-lg font-bold capitalize underline underline-offset-2">
                          {aud.category}
                        </h4>
                        {aud.properties.map((prop, index) => {
                          return <p key={index}>{prop}</p>;
                        })}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Typography Suggestions  */}
          <div className="rounded-md bg-gray-50 p-6 shadow-xl relative group">
            <Dialog >
              <DialogTrigger asChild>
                {proj?.overview ? (<Button
                  className="absolute right-5 top-5 hidden group-hover:flex"
                  variant="outline"><Wand2 /> <p className="p-[0.3rem]">Edit with AI</p></Button>) : null}
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit with AI</DialogTitle>
                  <DialogDescription>
                    Select the option you want and let the AI give you tailored answers
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Button
                      // onClick={() => {

                      // }}
                      type="submit">Extrapolate this data with latest research till 2023</Button>
                    <Button type="submit">Expand the answer to understand with ease</Button>
                    <Button type="submit">Explain this data in less words</Button>
                    {/* <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" /> */}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Heading icon={<CaseSensitive />} setActive={setActive} text="Typography Suggestions" />
            {/* <Description text={` ${proj?.target_audience}`} /> */}
            <div>
              <div className="mt-3 grid  grid-cols-2 gap-4">
                {isLoading || !proj
                  ? [...Array(4)].map((index) => {
                    return (
                      <div
                        key={index}
                        className="flex animate-pulse flex-col gap-1 rounded-md bg-blue-200 p-3 text-left duration-1000"
                      >
                        <div className="h-5 w-full " />
                      </div>
                    );
                  })
                  : proj.website_ui.typography.map((aud, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-col gap-1 rounded-md bg-blue-100 p-3 text-left"
                      >
                        <h4
                          className="text-xl font-bold capitalize"
                          style={{ fontFamily: aud }}
                        >
                          {aud}
                        </h4>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Color Palette Suggestions  */}
          <div className="rounded-md bg-gray-50 p-6 shadow-xl relative group">
            <Dialog >
              <DialogTrigger asChild>
                {proj?.overview ? (<Button
                  className="absolute right-5 top-5 hidden group-hover:flex"
                  variant="outline"><Wand2 /> <p className="p-[0.3rem]">Edit with AI</p></Button>) : null}
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit with AI</DialogTitle>
                  <DialogDescription>
                    Select the option you want and let the AI give you tailored answers
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Button
                      // onClick={() => {

                      // }}
                      type="submit">Extrapolate this data with latest research till 2023</Button>
                    <Button type="submit">Expand the answer to understand with ease</Button>
                    <Button type="submit">Explain this data in less words</Button>
                    {/* <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" /> */}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Heading icon={<Palette />} setActive={setActive} text="Color Palette Suggestions" />
            {/* <Description text={` ${proj?.target_audience}`} /> */}
            <div>
              <div className="mt-3 flex flex-col gap-4">
                {isLoading || !proj
                  ? [...Array(2)].map((aud, index) => {
                    return (
                      <div key={index} className="flex gap-5">
                        {[...Array(5)].map((index) => {
                          return (
                            <div
                              key={index}
                              className={cn(
                                "flex aspect-square w-full animate-pulse items-center justify-center rounded-md bg-gray-300 duration-1000",
                              )}
                            ></div>
                          );
                        })}
                      </div>
                    );
                  })
                  : proj.website_ui.color_pallete.map((aud, index) => {
                    return (
                      <div key={index} className="flex gap-5">
                        {aud.map((color, index) => {
                          return (
                            <div
                              key={index}
                              className={cn(
                                "flex aspect-square w-full items-center justify-center rounded-md border-2 border-black",
                              )}
                              style={{ backgroundColor: `#${color}` }}
                            >
                              {color}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Pain points of users  */}
          <div className="rounded-md bg-gray-50 p-6 shadow-xl relative group">
            <Dialog >
              <DialogTrigger asChild>
                {proj?.overview ? (<Button
                  className="absolute right-5 top-5 hidden group-hover:flex"
                  variant="outline"><Wand2 /> <p className="p-[0.3rem]">Edit with AI</p></Button>) : null}
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit with AI</DialogTitle>
                  <DialogDescription>
                    Select the option you want and let the AI give you tailored answers
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Button
                      // onClick={() => {

                      // }}
                      type="submit">Extrapolate this data with latest research till 2023</Button>
                    <Button type="submit">Expand the answer to understand with ease</Button>
                    <Button type="submit">Explain this data in less words</Button>
                    {/* <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" /> */}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Heading icon={<Bug />} setActive={setActive} text="Pain Points of Users" />
            {/* <Description text={` ${proj?.target_audience}`} /> */}
            <div>
              <div className="mt-3 flex flex-col gap-4">
                {isLoading || !proj
                  ? [...Array(4)].map((aud, index) => {
                    return (
                      <div
                        key={index}
                        className="h-10 animate-pulse rounded-md bg-violet-100 capitalize  duration-1000"
                      >
                        {aud}
                      </div>
                    );
                  })
                  : proj.pain_points_of_user.map((aud, index) => {
                    return (
                      <div
                        key={index}
                        className="text-md rounded-md bg-violet-100 p-3   capitalize"
                      >
                        {aud}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Required Features  */}
          <div className="rounded-md bg-gray-50 p-6 shadow-xl relative group">
            <Dialog >
              <DialogTrigger asChild>
                {proj?.overview ? (<Button
                  className="absolute right-5 top-5 hidden group-hover:flex"
                  variant="outline"><Wand2 /> <p className="p-[0.3rem]">Edit with AI</p></Button>) : null}
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit with AI</DialogTitle>
                  <DialogDescription>
                    Select the option you want and let the AI give you tailored answers
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Button
                      // onClick={() => {

                      // }}
                      type="submit">Extrapolate this data with latest research till 2023</Button>
                    <Button type="submit">Expand the answer to understand with ease</Button>
                    <Button type="submit">Explain this data in less words</Button>
                    {/* <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" /> */}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Heading icon={<BookCheck />} setActive={setActive} text="Required Features" />
            <div>
              <div className="mt-3 flex flex-col gap-4">
                {isLoading || !proj
                  ? [...Array(4)].map((aud, index) => {
                    return (
                      <div
                        key={index}
                        className="h-10 animate-pulse rounded-md bg-blue-100 capitalize  duration-1000"
                      >
                        {aud}
                      </div>
                    );
                  })
                  : proj.required_features.map((aud, index) => {
                    return (
                      <div
                        key={index}
                        className="text-md rounded-md bg-blue-100 p-3   capitalize"
                      >
                        {aud}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Big Brands  */}
          <div className="rounded-md bg-gray-50 p-6 shadow-xl relative group">
            <Dialog >
              <DialogTrigger asChild>
                {proj?.overview ? (<Button
                  className="absolute right-5 top-5 hidden group-hover:flex"
                  variant="outline"><Wand2 /> <p className="p-[0.3rem]">Edit with AI</p></Button>) : null}
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit with AI</DialogTitle>
                  <DialogDescription>
                    Select the option you want and let the AI give you tailored answers
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Button
                      // onClick={() => {

                      // }}
                      type="submit">Extrapolate this data with latest research till 2023</Button>
                    <Button type="submit">Expand the answer to understand with ease</Button>
                    <Button type="submit">Explain this data in less words</Button>
                    {/* <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" /> */}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <div>
              <Heading icon={<ArrowBigUpDash />} setActive={setActive} text="Your Competitors" />
              <p>Brands that dominate similar or this particular domain(s)</p>
            </div>
            {/* <Description text={` ${proj?.target_audience}`} /> */}
            <div>
              <div className="mt-3 grid grid-cols-3 gap-4">
                {isLoading || !proj
                  ? [...Array(4)].map((aud, index) => {
                    return (
                      <div
                        key={index}
                        className="h-10 animate-pulse rounded-md bg-blue-100 capitalize  duration-1000"
                      >
                        {aud}
                      </div>
                    );
                  })
                  : proj.big_brands.map((aud, index) => {
                    return (
                      <TooltipProvider key={aud}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              key={index}
                              className="text-md rounded-md cursor-pointer bg-blue-100 p-3 capitalize"
                            >
                              {aud}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className=" w-96">
                            <p>{aud} serves {proj.overview}.
                              Their growth looks strong in India, cause of the fact that {proj?.industry_trends.india}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Industry Trends  */}
          <div className="rounded-md bg-gray-50 p-6 shadow-xl relative group">
            <Dialog >
              <DialogTrigger asChild>
                {proj?.overview ? (<Button
                  className="absolute right-5 top-5 hidden group-hover:flex"
                  variant="outline"><Wand2 /> <p className="p-[0.3rem]">Edit with AI</p></Button>) : null}
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit with AI</DialogTitle>
                  <DialogDescription>
                    Select the option you want and let the AI give you tailored answers
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Button
                      type="submit">Extrapolate this data with latest research till 2023</Button>
                    <Button type="submit">Expand the answer to understand with ease</Button>
                    <Button type="submit">Explain this data in less words</Button>
                    {/* <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" /> */}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <div>
              <Heading setActive={setActive} text="Industry Trends" />
            </div>
            {/* <Description text={` ${proj?.target_audience}`} /> */}
            <div>
              <div className="mt-3 grid grid-cols-2 gap-4">
                {isLoading || !proj ? (
                  [...Array(2)].map((aud, index) => {
                    return (
                      <div
                        key={index}
                        className="h-[120px] animate-pulse rounded-md bg-violet-100 capitalize  duration-1000"
                      >
                        {aud}
                      </div>
                    );
                  })
                ) : (
                  <>
                    <p className="rounded-md bg-purple-100 p-3">
                      India : {proj?.industry_trends.india}
                    </p>
                    <p className="rounded-md bg-purple-100 p-3">
                      US/Europe : {proj?.industry_trends.us_europe}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
