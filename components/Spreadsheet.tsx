"use client";
import React, { useState, useRef } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataRecord {
  id: number;
  timestamp?: string;
  action?: string;
  enrichment?: string;
  [key: string]: any;
}

interface ColumnConfig {
  id: string;
  title: string;
  img: string;
}

const initialRecords: DataRecord[] = [
  {
    id: 1,
    timestamp: "Oct 12, 2024 at 14:08 PM",
    action: "Bitscale Evaluation - Account relevancy check.csv",
    enrichment: "Bitscale Evaluation - Account relevancy check.csv",
  },
  {
    id: 2,
    timestamp: "Oct 12, 2024 at 14:08 PM",
    action: "cell data size exceeds limit",
    enrichment: "BMW Evaluation - Relevancy check.csv",
  },
  {
    id: 3,
    timestamp: "Oct 12, 2024 at 14:08 PM",
    action: "https://www.linkedin.com/bits...",
    enrichment: "Google Evaluation - Lilevancy check.csv",
  },
  {
    id: 4,
    timestamp: "Oct 12, 2024 at 14:08 PM",
    action: "Loading data, Please wait",
    enrichment: "Apple Evaluation - Olvancy check.csv.",
  },
  {
    id: 5,
    timestamp: "Oct 12, 2024 at 14:08 PM",
    action: "Loading data, Please wait",
    enrichment: "Figma Evaluation - Evancy check.csv",
  },
];

const defaultHeaderImage = "/header1.svg";

const Spreadsheet = () => {
  const MIN_ROWS = 20;
  const [emptyRowsCount] = useState(MIN_ROWS);
  const [customColumns, setCustomColumns] = useState<ColumnConfig[]>([]);
  const [records, setRecords] = useState<DataRecord[]>(initialRecords);
  const [editingHeader, setEditingHeader] = useState<string | null>(null);
  const [headerText, setHeaderText] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const baseColumns: ColumnDef<DataRecord>[] = [
    {
      accessorKey: "serialNo",
      header: "",
      cell: ({ row }) => <div className="w-7">{row.index + 1}</div>,
    },
    {
      accessorKey: "play",
      header: "",
      cell: () => (
        <div className="w-7">
          <Icons.playCircle className="h-6 w-6" />
        </div>
      ),
    },
    {
      accessorKey: "timestamp",
      header: () => (
        <div className="flex items-center gap-2 w-[270px]">
          <Image src="/header1.svg" alt="Input Column" width={23} height={22} />
          <span>Input Column</span>
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: () => (
        <div className="flex items-center gap-2">
          <Image
            src="/header2.svg"
            alt="Action Column"
            width={20}
            height={20}
          />
          <span>Action Column</span>
        </div>
      ),
    },
    {
      accessorKey: "enrichment",
      header: () => (
        <div className="flex items-center gap-2">
          <Image
            src="/header3.svg"
            alt="Enrich Company"
            width={16}
            height={16}
          />
          <span>Enrich Company</span>
        </div>
      ),
    },
  ];

  const dynamicColumns: ColumnDef<DataRecord>[] = customColumns.map((col) => ({
    accessorKey: col.id,
    header: () =>
      editingHeader === col.id ? (
        <div className="flex items-center gap-2">
          <Image src={col.img} alt={col.title} width={20} height={20} />
          <Input
            ref={inputRef}
            className="h-8 w-32"
            value={headerText}
            onChange={(e) => setHeaderText(e.target.value)}
            onBlur={() => finishEditing(col.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                finishEditing(col.id);
              }
            }}
            autoFocus
          />
        </div>
      ) : (
        <div
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
          onClick={() => startEditing(col.id, col.title)}
        >
          <Image src={col.img} alt={col.title} width={20} height={20} />
          <span>{col.title || "Click to edit"}</span>
        </div>
      ),
    cell: ({ row, column }) => {
      const value = (row.getValue(column.id) as string) || "";
      return (
        <div className="relative w-full">
          <Input
            className="h-8 w-full"
            value={value}
            onChange={(e) => {
              e.currentTarget.focus();
              handleCellEdit(row.original.id, column.id, e.target.value);
            }}
            onClick={(e) => {
              e.currentTarget.focus();
            }}
          />
        </div>
      );
    },
  }));

  const addColumnDef: ColumnDef<DataRecord> = {
    accessorKey: "addColumn",
    header: () => (
      <Button
        onClick={handleAddColumn}
        className="flex gap-2 rounded-md p-2 hover:bg-gray-200 bg-transparent shadow-none text-gray-800"
      >
        <Icons.plus className="h-6 w-6" />
        <span>Add Column</span>
      </Button>
    ),
    cell: () => null,
  };

  const handleAddRow = () => {
    const newRow: DataRecord = {
      id: records.length + 1,
      timestamp: "",
      action: "",
      enrichment: "",
      ...Object.fromEntries(customColumns.map((col) => [col.id, ""])),
    };
    setRecords([...records, newRow]);
  };

  const startEditing = (columnId: string, currentTitle: string) => {
    setEditingHeader(columnId);
    setHeaderText(currentTitle);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const finishEditing = (columnId: string) => {
    if (headerText.trim() !== "") {
      handleHeaderEdit(columnId, headerText);
    }
    setEditingHeader(null);
    setHeaderText("");
  };

  const handleAddColumn = () => {
    const newColumnId = `custom_${customColumns.length + 1}`;
    setCustomColumns([
      ...customColumns,
      {
        id: newColumnId,
        title: `New Column ${customColumns.length + 1}`,
        img: defaultHeaderImage,
      },
    ]);

    const updatedRecords = records.map((record) => ({
      ...record,
      [newColumnId]: "",
    }));
    setRecords(updatedRecords);
  };

  const handleHeaderEdit = (columnId: string, newTitle: string) => {
    setCustomColumns((columns) =>
      columns.map((col) =>
        col.id === columnId ? { ...col, title: newTitle } : col,
      ),
    );
  };

  const handleCellEdit = (
    recordId: number,
    columnId: string,
    value: string,
  ) => {
    setRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.id === recordId ? { ...record, [columnId]: value } : record,
      ),
    );
  };

  const allColumns = [...baseColumns, ...dynamicColumns, addColumnDef];

  const table = useReactTable({
    data: records,
    columns: allColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="w-full h-full">
        <div className="min-w-full h-full">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="border-x border-[#E2E2E3] bg-[#F6F6F6] h-9 text-sm text-[#1C1B1F]"
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
                    <TableCell
                      key={cell.id}
                      className="border text-sm text-gray-700 font-medium"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              <TableRow className="border h-9">
                <TableCell colSpan={2} className="border" />
                <TableCell className="border">
                  <Button
                    onClick={handleAddRow}
                    className="flex items-center gap-2 rounded-md p-2 hover:bg-gray-200 bg-transparent shadow-none text-sm text-gray-700 font-medium"
                  >
                    <Icons.plus className="h-6 w-6" />
                    <span>Add Row</span>
                  </Button>
                </TableCell>
                <TableCell colSpan={allColumns.length - 3} className="border" />
              </TableRow>
              {Array.from({ length: emptyRowsCount - 1 }).map((_, index) => (
                <TableRow
                  key={`empty-${index}`}
                  className="border h-9 bg-[#F6F6F6]"
                >
                  {Array.from({ length: allColumns.length }).map(
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
