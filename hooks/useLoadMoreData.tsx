import { useCallback, useState } from 'react';
import useErrorHandler, { ErrorResponse } from './useErrorHandler';

interface UseLoadMoreDataInterface<TData = unknown, TFilters = unknown> {
  fetchInitialData: (filters?: TFilters) => Promise<TData[]>;
  fetchPaginatedData: (filters?: TFilters, page?: number) => Promise<TData[]>;
  fetchTotalCount?: (filters?: TFilters) => Promise<number>;
  filters?: TFilters;
}

export const useLoadMoreData = <TData, TFilters = unknown>({
  fetchInitialData,
  fetchPaginatedData,
  fetchTotalCount,
  filters,
}: UseLoadMoreDataInterface<TData, TFilters>) => {

  const { handleError } = useErrorHandler();
  const [data, setData] = useState<TData[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isButtonLoading, setButtonIsLoading] = useState(false);
  const [total, setTotal] = useState<number | null>(null);

  const handleResetData = useCallback(async () => {
    setIsLoading(true);
    try {
      const initialData = await fetchInitialData(filters);
      setData(initialData);
      setPage(1);

      if (fetchTotalCount) {
        const totalCount = await fetchTotalCount(filters);
        setTotal(totalCount);
      }
    } catch (error) {
      handleError(error as ErrorResponse);
    } finally {
      setIsLoading(false);
    }
  }, [fetchInitialData, fetchTotalCount, filters, handleError]);

  /*   }, [fetchInitialData, fetchTotalCount, filters, handleError]);
 */

  const handleLoadMore = useCallback(async () => {
    setButtonIsLoading(true);
    try {
      const nextPage = page + 1;
      const moreData = await fetchPaginatedData(filters, nextPage);
      setData((prevData) => [...prevData, ...moreData]);
      setPage(nextPage);
    } catch (error) {
      handleError(error as ErrorResponse);
    } finally {
      setButtonIsLoading(false);
    }
  }, [fetchPaginatedData, filters, page, handleError]);

  return {
    data,
    isLoading,
    isButtonLoading,
    total,
    handleResetData,
    handleLoadMore,
  };
};
