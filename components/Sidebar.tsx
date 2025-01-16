import { Icons } from "./icons";

export default function Sidebar() {
  return (
    <div className="border-r-[1px] border-[#E5E5E5] w-16 h-full pt-6 pb-4 flex flex-col items-center justify-between">
      <div className="flex flex-col items-center gap-6">
        <Icons.table className="h-6 w-6 cursor-pointer" />
        <Icons.puzzle className="h-6 w-6 cursor-pointer" />
        <Icons.intersectCircle className="h-6 w-6 cursor-pointer" />
      </div>
      <div className="flex flex-col items-center gap-6">
        <Icons.creditCard className="h-6 w-6 cursor-pointer" />
        <Icons.coinStacked className="h-6 w-6 cursor-pointer" />
      </div>
    </div>
  );
}
