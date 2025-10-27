"use client";

import { useMemo } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { CryptoToken } from "@/types/tokens";
import Image from "next/image";
import { TrendingUp, TrendingDown } from "lucide-react";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ListOfCoins = ({ tokens }: { tokens: CryptoToken[] }) => {
  
  const tableTheme = useMemo(() => 
    createTheme({
      palette: {
        mode: 'dark',
        background: {
          default: 'rgb(var(--background))',
          paper: 'rgb(var(--card))',
        },
        text: {
          primary: 'rgb(var(--foreground))',
          secondary: 'rgb(var(--muted-foreground))',
        },
        divider: 'rgb(var(--border))',
      },
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundColor: 'rgb(var(--card))',
              color: 'rgb(var(--foreground))',
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            root: {
              borderColor: 'rgb(var(--border))',
              color: 'rgb(var(--foreground))',
            },
            head: {
              backgroundColor: 'rgb(var(--muted) / 0.5)',
              color: 'rgb(var(--muted-foreground))',
              fontWeight: 500,
            },
          },
        },
        MuiTableRow: {
          styleOverrides: {
            root: {
              borderBottom: '1px solid',
              '&:last-child': {
                borderBottom: 'none',
              },
              '&:hover': {
                backgroundColor: 'hsl(var(--muted) / 0.5) !important',
              },
            },
          },
        },
        MuiIconButton: {
          styleOverrides: {
            root: {
              color: 'rgb(var(--muted-foreground))',
              '&:hover': {
                backgroundColor: 'rgb(var(--muted) / 0.5)',
              },
            },
          },
        },
        MuiTextField: {
          styleOverrides: {
            root: {
              '& .MuiOutlinedInput-root': {
                color: 'rgb(var(--foreground))',
                '& fieldset': {
                  borderColor: 'rgb(var(--border))',
                },
                '&:hover fieldset': {
                  borderColor: 'rgb(var(--ring))',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgb(var(--ring))',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgb(var(--muted-foreground))',
              },
            },
          },
        },
        MuiToolbar: {
          styleOverrides: {
            root: {
              backgroundColor: 'rgb(var(--card))',
              borderBottom: '1px solid rgb(var(--border))',
            },
          },
        },
      },
    }), 
  []);
  
  const columns = useMemo<MRT_ColumnDef<CryptoToken>[]>(
    () => [
      {
        accessorKey: 'symbol',
        header: 'Crypto',
        Cell: ({ row }) => (
          <div className="flex items-center gap-3">
            {row.original.logo && (
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <Image 
                  src={row.original.logo} 
                  alt={row.original.symbol} 
                  width={32} 
                  height={32} 
                  className="rounded-full" 
                />
              </div>
            )}
            <div>
              <p className="font-semibold">{row.original.symbol}</p>
              <p className="text-sm text-muted-foreground">{row.original.name}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'balance',
        header: 'Balance',
        Cell: ({ cell }) => (
          <span className="font-medium">{Number(cell.getValue<number>()).toFixed(4)}</span>
        ),
      },
      {
        accessorKey: 'price',
        header: 'Prix',
        Cell: ({ cell }) => (
          <span className="font-medium">${Number(cell.getValue<number>()).toFixed(2)}</span>
        ),
      },
      {
        accessorKey: 'value',
        header: 'Valeur',
        Cell: ({ cell }) => (
          <span className="font-semibold">${Number(cell.getValue<number>()).toFixed(2)}</span>
        ),
      },
      {
        accessorKey: 'change24h',
        header: '24h',
        Cell: ({ cell }) => {
          const value = Number(cell.getValue<number>());
          const isPositive = value >= 0;
          return (
            <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="font-medium">{isPositive ? '+' : ''}{value.toFixed(2)}%</span>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Vos cryptomonnaies</h1>
      
      <ThemeProvider theme={tableTheme}>
        <div className="rounded-lg border border-border overflow-hidden">
          <MaterialReactTable
            columns={columns}
            data={tokens}
            enableSorting
            enableGlobalFilter
            enableColumnActions={false}
            enableColumnFilters={false}
            enableDensityToggle={false}
            enableHiding={false}
            enableFullScreenToggle={false}
            enablePagination={false}
            initialState={{ 
              sorting: [{ id: 'value', desc: true }],
              showGlobalFilter: true,
            }}
            muiTablePaperProps={{
              elevation: 0,
              sx: {
                backgroundColor: 'transparent',
                boxShadow: 'none',
              }
            }}
            muiSearchTextFieldProps={{
              placeholder: 'Rechercher...',
              variant: 'outlined',
              size: 'small',
            }}
            muiTableBodyCellProps={{
              sx: {
                borderBottom: "1px solid rgba(255,255,255,0.12)", // séparation lignes
              },
            }}
            muiTableHeadCellProps={{
              sx: {
                borderBottom: "1px solid rgba(255,255,255, 0.6)",
              },
            }}
          />
        </div>
      </ThemeProvider>
    </div>
  );
};

export default ListOfCoins;
