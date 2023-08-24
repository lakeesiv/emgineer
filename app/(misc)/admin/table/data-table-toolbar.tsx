"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "components/ui/button";
import { Input } from "components/ui/input";

import { DataTableFacetedFilter } from "./data-table-facted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  events: string[];
}

export function DataTableToolbar<TData>({
  table,
  events,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[150px]"
        />
        {table.getColumn("event") && (
          <DataTableFacetedFilter
            column={table.getColumn("event")}
            title="Event"
            options={events.map((event) => ({
              label: event,
              value: event,
            }))}
          />
        )}
        {table.getColumn("going") && (
          <DataTableFacetedFilter
            column={table.getColumn("going")}
            title="Going"
            options={[
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
              { label: "Maybe", value: "Maybe" },
            ]}
          />
        )}
        {table.getColumn("paid") && (
          <DataTableFacetedFilter
            column={table.getColumn("paid")}
            title="Paid"
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false },
              { label: "N/A", value: null },
            ]}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
