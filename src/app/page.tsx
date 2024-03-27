import Search from "@/components/component/search"
import { BackgroundGradientAnimation } from "@/components/ui/background-animations"

export default function Home() {
  return (
    <BackgroundGradientAnimation>
      <div className="absolute z-50 inset-0 flex items-center justify-center">
        <main className="flex flex-col items-center px-3">
          <h1 className="text-3xl lg:text-6xl font-bold tracking-tight text-center ">
            Find grade distributions for UWL classes
          </h1>
          <p className="mb-12 mt-7 text-2xl lg:text-3xl opacity-75 text-center">
            View all the past grades for classes taken at the University of Wisconsin, Lacrosse.
          </p>
          <div className="w-[600px]">
            <Search placeholder="Search by Class, Department, or Intructor" />
          </div>
        </main>
      </div>
    </BackgroundGradientAnimation>
  )
}