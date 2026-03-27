"use client";
"use no memo";
// TODO: delete use no memo after Tanstack react-table bump to react 19

import { useTranslations } from "next-intl";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Minimal Order type replacing payload-types import
type Order = {
  id: string;
  createdAt: string;
  customer?: string | { id: string };
  orderDetails: {
    status: string;
    totalWithShipping: number;
    currency: string;
    transactionID?: string;
  };
  shippingAddress: {
    email: string;
  };
};

const formatPrice = (amount: number, currency: string, locale: string = "en-US") => {
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
};

export const OverviewLastOrders = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const t = useTranslations("adminDashboard");

  const columns: ColumnDef<Order>[] = [
    {
      id: "date",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0 text-base hover:bg-payload-elevation-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t("date")}
          <ArrowUpDown width={20} height={20} className="ml-2" />
        </Button>
      ),
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      id: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0 text-base hover:bg-payload-elevation-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t("status")}
          <ArrowUpDown width={20} height={20} className="ml-2" />
        </Button>
      ),
      cell: ({ row }) => <p>{row.original.orderDetails.status}</p>,
    },
    {
      id: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0 text-base hover:bg-payload-elevation-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t("email")}
          <ArrowUpDown width={20} height={20} className="ml-2" />
        </Button>
      ),
      cell: ({ row }) => <div className="lowercase">{row.original.shippingAddress.email}</div>,
    },
    {
      id: "amount",
      header: () => <div className="text-right">{t("amount")}</div>,
      cell: ({ row }) => {
        const amount = row.original.orderDetails.totalWithShipping;
        const currency = row.original.orderDetails.currency;
        return <div className="text-right font-medium">{formatPrice(amount, currency)}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const order = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">{t("openMenu")}</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-payload-elevation-50">
              <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(order.orderDetails.transactionID ?? "")}
              >
                {t("copyPaymentID")}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="border-payload-elevation-0 bg-payload-elevation-0" />
              {order.customer && (
                <DropdownMenuItem>
                  <Link
                    href={`/admin/collections/customers/${typeof order.customer === "string" ? order.customer : order.customer.id}`}
                    className="no-underline"
                  >
                    {t("viewCustomer")}
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <Link href={`/admin/collections/orders/${order.id}`} className="no-underline">
                  {t("viewOrder")}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  };

  const handlePaginationChange = (page: number) => {
    router.push(`?${createQueryString("page", page.toString())}`, { scroll: false });
  };

  const [data, setData] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const params = new URLSearchParams({
          limit: "6",
          page: String(currentPage),
          sort: sorting.length > 0
            ? `${sorting[0].desc ? "-" : ""}${sorting[0].id}`
            : "-createdAt",
        });
        const { data } = await axios.get<{ docs: Order[] }>(`/api/orders?${params}`, {
          withCredentials: true,
        });
        setData(data.docs);
      } catch (error) {
        console.log(error);
      }
    };
    void fetchOrders();
  }, [currentPage, sorting, columnFilters]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  });

  return (
    <Card className="twp rounded-xl border border-payload-elevation-150 bg-transparent lg:col-span-3">
      <CardHeader>
        <CardTitle>{t("recentOrders")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="flex items-center py-4">
            <div className="no-twp field-type text">
              <input
                placeholder={t("filterEmails")}
                value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
                className="h-10 max-w-sm placeholder:text-payload-elevation-900 placeholder:opacity-75"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-auto border-payload-elevation-150 bg-payload-elevation-50 text-base hover:bg-payload-background-color"
                >
                  {t("columns")} <ChevronDown className="ml-2" width={20} height={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-payload-elevation-50">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="cursor-pointer text-base capitalize hover:bg-payload-elevation-0"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="rounded-lg border border-payload-elevation-150">
            <Table className="text-base">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow className="border-payload-elevation-150 hover:bg-transparent" key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="text-payload-elevation-900 opacity-75">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      className="border-payload-elevation-150 hover:bg-payload-elevation-50"
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="border-payload-elevation-150 hover:bg-payload-elevation-50">
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              className="border border-payload-elevation-150 bg-payload-elevation-50 text-base hover:bg-payload-elevation-0"
              size="sm"
              onClick={() => handlePaginationChange(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              {t("previous")}
            </Button>
            <Button
              variant="outline"
              className="border border-payload-elevation-150 bg-payload-elevation-50 text-base hover:bg-payload-elevation-0"
              size="sm"
              onClick={() => handlePaginationChange(currentPage + 1)}
              disabled={data.length < 6}
            >
              {t("next")}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

