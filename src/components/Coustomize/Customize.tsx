import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Customize = () => {
  const router = useRouter();
  return (
    <div className="w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl w-full">
        <div className="sm:flex items-center">
          {/* Left: Image */}
          <div className="sm:w-1/2 w-full">
            <Image
              src="/image/customize2.webp"
              alt="Customize"
              width={700}
              height={700}
              className="w-full h-auto object-contain sm:rounded-lg"
            />
          </div>

          {/* Right: Text & Button */}
          <div className="sm:w-1/2 p-8 flex flex-col justify-center items-start">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Make Your Own Customized Case
            </h1>
            <div className="bg-red-500 h-1 w-full mb-4"></div>
            <p className="text-lg text-gray-600 mb-6">
              Personalize your case with your own design, photos, and text.
            </p>
            <Button onClick={(e)=>router.push("/customize")} className="flex items-center space-x-2 bg-red-500 hover:bg-red-600">
              <span>Get Started</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customize;
