"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Icons } from "./icons";
import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";

interface DataRecord {
  id: number;
  timestamp: string;
  action: string;
  enrichment: string;
}

interface Header {
  id: number;
  title: string;
  img: string;
}

const data = {
  records: [
    {
      id: 1,
      timestamp: "Oct 12, 2024 at 14:08 PM",
      action: "Bitscale Evaluation - Account relev...",
      enrichment: "Bitscale Evaluation - Account r...",
    },
    {
      id: 2,
      timestamp: "Oct 12, 2024 at 14:08 PM",
      action: "cell data size exceeds limit",
      enrichment: "BMW Evaluation - Relevancy c...",
    },
    {
      id: 3,
      timestamp: "Oct 12, 2024 at 14:08 PM",
      action: "https://www.linkedin.com/bits...",
      enrichment: "Google Evaluation - Lilevancy...",
    },
    {
      id: 4,
      timestamp: "Oct 12, 2024 at 14:08 PM",
      action: "Loading data, Please wait",
      enrichment: "Apple Evaluation - Olvancy che...",
    },
    {
      id: 5,
      timestamp: "Oct 12, 2024 at 14:08 PM",
      action: "Loading data, Please wait",
      enrichment: "Figma Evaluation - Evancy che...",
    },
  ],
  headers: [
    {
      id: 1,
      title: "Input Column",
      img: "/header1.svg",
    },
    {
      id: 2,
      title: "Action Column",
      img: "/header2.svg",
    },
    {
      id: 3,
      title: "Enrich Company",
      img: "/header3.svg",
    },
  ],
};

const Spreadsheet = () => {
  const MIN_ROWS = 20;
  const [emptyRowsCount, setEmptyRowsCount] = useState(MIN_ROWS);

  const handleAddColumn = () => {
    console.log("Add new column clicked");
  };

  const columns: ColumnDef<DataRecord>[] = [
    {
      accessorKey: "serialNo",
      header: "",
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "play",
      header: "",
      cell: () => <Icons.playCircle className="h-6 w-6" />,
    },
    {
      accessorKey: "timestamp",
      header: () => (
        <div className="flex items-center gap-2">
          <Image
            src={data.headers[0].img}
            alt={data.headers[0].title}
            height={23}
            width={22}
          />
          <span>{data.headers[0].title}</span>
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: () => (
        <div className="flex items-center gap-2">
          <Image
            src={data.headers[1].img}
            alt={data.headers[1].title}
            height={20}
            width={20}
          />
          <span>{data.headers[1].title}</span>
        </div>
      ),
    },
    {
      accessorKey: "enrichment",
      header: () => (
        <div className="flex items-center gap-2">
          <Image
            src={data.headers[2].img}
            alt={data.headers[2].title}
            width={16}
            height={16}
          />
          <span>{data.headers[2].title}</span>
        </div>
      ),
    },
    {
      accessorKey: "addColumn",
      header: () => (
        <Button
          onClick={handleAddColumn}
          className="flex gap-2 rounded-md p-2 hover:bg-gray-200 bg-transparent shadow-none text-gray-800"
        >
          <Plus className="h-5 w-5" />
          <span>Add Column</span>
        </Button>
      ),
      cell: () => null,
    },
  ];
  const table = useReactTable({
    data: data.records,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 w-full">
        <div className="inline-block min-w-full h-full">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="border-r border-b border-l bg-[#F6F6F6] h-9"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border h-9">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {Array.from({ length: emptyRowsCount }).map((_, index) => (
                <TableRow
                  key={`empty-${index}`}
                  className="border h-9 bg-[#F6F6F6]"
                >
                  {Array.from({ length: columns.length }).map(
                    (_, cellIndex) => (
                      <TableCell
                        key={`empty-cell-${cellIndex}`}
                        className="border"
                      />
                    ),
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Spreadsheet;
