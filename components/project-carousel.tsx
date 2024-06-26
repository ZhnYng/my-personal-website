"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ProjectsQueryResult } from "@/sanity/types";
import Autoplay from "embla-carousel-autoplay"
import { Github, Link2, LucideExternalLink } from "lucide-react";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export default function ProjectCarousel({ projects }: { projects: ProjectsQueryResult }) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-4xl my-6"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="flex items-center md:mx-12 mx-6">
        {projects.map((project) => {
          return (
            <CarouselItem key={project._id}>
              <div
                className="my-4 md:text-xl flex justify-between items-center"
              >
                <p className="max-w-sm">
                  {project.name}
                </p>
                <Link
                  href={`/projects/${project.slug}`}
                  key={project._id}
                  className="rounded-lg md:p-3 flex text-sm gap-2 items-center hover:text-blue-500 transition duration-700"
                >
                  <LucideExternalLink size={30} />
                  <p className="md:block hidden">
                    Find out more
                  </p>
                </Link>
              </div>
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.name || "Project image"}
                  width={1980}
                  height={1080}
                  className="object-cover rounded-lg border border-gray-500"
                />
              )}
              <div className="my-4 flex justify-start gap-2 items-center">
                {project.technologies ? project.technologies.map((technology) => (
                  <HoverCard key={technology._id}>
                    <HoverCardTrigger href={technology.url} target="_blank">
                      <Image
                        alt={technology.image?.alt!}
                        src={technology.imageUrl!}
                        width={50}
                        height={50}
                        className="w-8 rounded-md"
                      />
                    </HoverCardTrigger>
                    <HoverCardContent className="w-fit flex flex-col gap-2">
                      {technology.name}
                      <p className="text-gray-400 text-xs">{technology.url}</p>
                    </HoverCardContent>
                  </HoverCard>
                ))
                  :
                  null}
              </div>
              <div className="my-6 line-clamp-2 md:line-clamp-none">
                {project.elevatorPitch}
              </div>
              <div className="flex md:gap-6 gap-2 justify-end">
                <Link href={project.repositoryUrl || ""} className="flex gap-2 items-center hover:text-blue-500 transition duration-700">
                  <Github />
                  <p className="md:block hidden">
                    View repository
                  </p>
                </Link>
                <Link href={project.projectUrl || ""} className="flex gap-2 items-center hover:text-blue-500 transition duration-700">
                  <Link2 />
                  <p className="md:block hidden">
                    View project
                  </p>
                </Link>
              </div>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  )
}