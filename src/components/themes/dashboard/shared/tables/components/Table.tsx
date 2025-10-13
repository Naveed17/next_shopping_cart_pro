'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

export interface Column<T = any> {
  key: string;
  title: string;
  dataIndex?: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  sortKey?: string; // Custom sort key for complex columns
}

export interface TableProps<T = any> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  rowKey?: string | ((record: T) => string);
  className?: string;
  emptyText?: string;
  hoverable?: boolean;
  defaultSort?: { key: string; order: 'asc' | 'desc' };
  pagination?: {
    pageSize?: number;
    showSizeChanger?: boolean;
    pageSizeOptions?: number[];
  };
}

const Table = <T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  rowKey = 'id',
  className = '',
  emptyText = 'No data available',
  hoverable = true,
  defaultSort,
  pagination,
}: TableProps<T>) => {
  const [sortBy, setSortBy] = React.useState<string>(defaultSort?.key || '');
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>(defaultSort?.order || 'asc');
  const [sortedData, setSortedData] = React.useState<T[]>(data);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(pagination?.pageSize || 10);
  const getRowKey = (record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return record[rowKey] || index.toString();
  };

  const handleSort = (columnKey: string) => {
    const newOrder = sortBy === columnKey && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortBy(columnKey);
    setSortOrder(newOrder);

    const column = columns.find(col => col.key === columnKey);
    const sortKey = column?.sortKey || column?.dataIndex || columnKey;

    const sorted = [...data].sort((a, b) => {
      let aValue: unknown;
      let bValue: unknown;

      // Get values based on sortKey or nested property
      if (sortKey.includes('.')) {
        aValue = sortKey.split('.').reduce((obj, key) => obj?.[key], a);
        bValue = sortKey.split('.').reduce((obj, key) => obj?.[key], b);
      } else {
        aValue = a[sortKey as keyof T];
        bValue = b[sortKey as keyof T];
      }

      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      // String comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return newOrder === 'asc'
          ? aValue.toLowerCase().localeCompare(bValue.toLowerCase())
          : bValue.toLowerCase().localeCompare(aValue.toLowerCase());
      }

      // Numeric comparison
      if (newOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setSortedData(sorted);
  };

  React.useEffect(() => {
    setSortedData(data);
    setCurrentPage(1);
  }, [data]);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = pagination ? sortedData.slice(startIndex, endIndex) : sortedData;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  const renderCell = (column: Column<T>, record: T, index: number) => {
    if (column.render) {
      return column.render(record[column.dataIndex || column.key], record, index);
    }
    return record[column.dataIndex || column.key];
  };

  const getSortIcon = (columnKey: string) => {
    if (sortBy !== columnKey) {
      return <ChevronUp className="h-4 w-4 text-gray-300" />;
    }
    return sortOrder === 'asc'
      ? <ChevronUp className="h-4 w-4 text-blue-600" />
      : <ChevronDown className="h-4 w-4 text-blue-600" />;
  };

  if (loading) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}>
        <div className="animate-pulse">
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4">
            <div className="flex space-x-4">
              {columns.map((_, index) => (
                <div key={index} className="h-4 bg-gray-200 dark:bg-gray-600 rounded flex-1"></div>
              ))}
            </div>
          </div>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
              <div className="flex space-x-4">
                {columns.map((_, colIndex) => (
                  <div key={colIndex} className="h-4 bg-gray-100 dark:bg-gray-700 rounded flex-1"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${column.sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 select-none' : ''
                    }`}
                  style={{
                    width: column.width,
                    textAlign: column.align || 'left'
                  }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.title}</span>
                    {column.sortable && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              paginatedData.map((record, index) => (
                <motion.tr
                  key={getRowKey(record, index)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`${hoverable ? 'hover:bg-gray-50 dark:hover:bg-gray-700' : ''
                    } transition-colors`}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                      style={{ textAlign: column.align || 'left' }}
                    >
                      {renderCell(column, record, index)}
                    </td>
                  ))}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {pagination && sortedData.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Showing {startIndex + 1} to {Math.min(endIndex, sortedData.length)} of {sortedData.length} entries</span>
            {pagination.showSizeChanger && (
              <select
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="ml-4 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                {(pagination.pageSizeOptions || [10, 20, 50]).map(size => (
                  <option key={size} value={size}>{size} per page</option>
                ))}
              </select>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + Math.max(1, currentPage - 2);
              if (page > totalPages) return null;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded text-sm ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;