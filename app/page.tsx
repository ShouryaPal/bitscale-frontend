import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Columns3, Rows3 } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="h-20 py-5 px-6 flex items-center justify-between w-full">
        <div className="flex items-center gap-6">
          <div className="relative w-full max-w-md h-10">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <Icons.search className="w-4 h-4" />
            </span>
            <Input
              placeholder="Search"
              className="pl-10 h-10 min-w-[350px] bg-gray-50 rounded-md text-sm placeholder:text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-white shadow-none text-gray-800 hover:bg-gray-50 p-2">
              <Rows3 height={16} width={16} />
              <p className="text-xs font-mediums">1/1 Row</p>
            </Button>
            <Button className="bg-white shadow-none text-gray-800 hover:bg-gray-50 p-2">
              <Columns3 height={16} width={16} />
              <p className="text-xs font-mediums">3/3 Column</p>
            </Button>
            <Button className="bg-white shadow-none text-gray-800 hover:bg-gray-50 p-2">
              <Icons.filterFunel height={16} width={16} />
              <p className="text-xs font-mediums">0 Filter</p>
            </Button>
            <Button className="bg-white shadow-none text-gray-800 hover:bg-gray-50 p-2">
              <ArrowUpDown height={16} width={16} />
              <p className="text-xs font-mediums">Sort</p>
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button className="w-20 h-9 bg-gray-800 hover:bg-gray-700 rounded-lg ">
            <Icons.stars className="h-4 w-4" />
            <p className="text-xs font-medium">Enrich</p>
          </Button>
          <div className="flex items-center">
            <Button className="bg-white shadow-none hover:bg-gray-50">
              <Icons.share className="h-5 w-5" />
            </Button>
            <Button className="bg-white shadow-none hover:bg-gray-50">
              <Icons.download className="h-5 w-5" />
            </Button>
            <Button className="bg-white shadow-none hover:bg-gray-50">
              <Icons.trash className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
