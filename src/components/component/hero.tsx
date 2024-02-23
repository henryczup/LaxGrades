/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/FKAyXTrboTU
 */
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="w-full h-screen flex items-center">
      <div className="container px-16 md:px-36 flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-10">
        <div className="space-y-24 lg:order-first lg:max-w-3xl lg:space-y-12">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-7xl">
              Lax Grades
            </h1>
            <p className="max-w-[500px] text-gray-500 md:text-xl dark:text-gray-400">
              View all the past grades for classes taken at the University of Wisconsin, Lacrosse.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-stretch gap-2 min-w-[300px]">
            <Input className="w-full pl-10 text-md" placeholder="Search by Class, Instructor, or Department" type="search" />
          </div>
        </div>
        <img
          alt="Hero"
          className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom lg:ml-auto lg:aspect-square"
          height="500"
          src="\UW–La_Crosse_logo.svg.png"
          width="500"
        />
      </div>
    </section>
  )
}


function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}