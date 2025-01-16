"use client";
import { useState } from "react";
import { Switch } from "./ui/switch";
import { Icons } from "./icons";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const [isAutoSave, setIsAutoSave] = useState(false);

  const handleAutoSaveToggle = (checked: boolean) => {
    setIsAutoSave(checked);
  };

  return (
    <div className="border-b-[1px] border-[#E5E5E5] w-full h-14 p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Icons.arrowLeft className="w-4 h-4" />
        <Input
          placeholder="Name of the file"
          className="border-0 shadow-none focus-visible:ring-0 text-sm placeholder:text-sm p-0"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Switch
            checked={isAutoSave}
            onCheckedChange={handleAutoSaveToggle}
            className="bg-gray-200 hover:bg-gray-300 data-[state=checked]:bg-[#0E9F6E] data-[state=checked]:hover:bg-[#0E9F6E]/90"
          />
          <p
            className={`${isAutoSave ? "text-[#0E9F6E]" : "text-gray-500"} font-medium text-sm`}
          >
            Auto Save
          </p>
        </div>
        <Avatar className="h-8 w-8">
          <AvatarImage src="user.png" />
          <AvatarFallback>P</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
