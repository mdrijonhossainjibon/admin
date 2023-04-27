import React, { useEffect, useState } from "react";
import { DoubleLeftOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { gql, NetworkStatus, QueryResult } from "@apollo/client";
import { QueryHookOptions, useQuery } from "./useQuery";
import { useTranslation } from "react-i18next";
import { Button, Pagination, Space } from "antd";

interface PaginatedQueryHookOptions<TData, TVariables> extends QueryHookOptions<TData, TVariables> {
  /** Data limit */
  limit: number;

  /** Location of paginated list in data object */
  list: (data: TData) => any[];

  /** Limit variable name
   * @default "limit" */
  limitVar?: keyof TVariables;

  /** Page variable name
   * @default "page" */
  pageVar?: keyof TVariables;
  total?: (data: TData) => number;
}

interface PaginatedQueryResult<TData, TVariables> extends QueryResult<TData, TVariables> {
  /** Pagination component to handle data  */
  PaginationComponent: React.FC;
}

const FIRST_PAGE = 1;
const START_LIMIT = 10;

export const usePaginatedQuery = <TData, TVariables>(
  queryGql: ReturnType<typeof gql>,
  options: PaginatedQueryHookOptions<TData, TVariables>
): PaginatedQueryResult<TData, TVariables> => {
  const [page, setPage] = useState(FIRST_PAGE);
  const [limit, setLimit] = useState(START_LIMIT);

  const LIMIT_VARIABLE = options.limitVar || "limit";
  const PAGE_VARIABLE = options.pageVar || "page";
  const { t } = useTranslation();

  // inject pagination fields into variables
  const _injectPagination = (variables?: TVariables): TVariables =>
    ({
      ...variables,
      [LIMIT_VARIABLE]: limit,
      [PAGE_VARIABLE]: page,
    } as TVariables);

  // go to first page if variables change
  useEffect(() => {
    setPage(FIRST_PAGE);
    setLimit(START_LIMIT);
  }, [JSON.stringify(options.variables)]);

  // reset polling on page change
  useEffect(() => {
    _resetPolling();
  }, [page]);

  const _hasNextPage = () => {
    return _getList().length >= options.limit;
  };

  const _resetPolling = () => {
    query.stopPolling();
    if (options?.pollInterval) query.startPolling(options.pollInterval);
  };

  const _loadPage = (page: number) => {
    setPage(page);
  };

  const _getList = (): ReturnType<typeof options.list> => {
    if (query.data && Object.keys(query.data).length) {
      return options.list(query.data);
    }

    return [];
  };

  const _getTotal = (): number => {
    if (query.data && Object.keys(query.data).length) {
      const total = options.total && options.total(query.data);
      if (total) {
        return total;
      }
    }
    return 0;
  };

  const _changeOption = (page: number, limit: number | undefined) => {
    if (typeof limit === "number") {
      setLimit(limit);
    }
    setPage(page);
  };

  const query = useQuery<TData, TVariables>(queryGql, {
    ...options,
    variables: _injectPagination(options.variables),
  });

  const refetch = (variables?: TVariables) => {
    _resetPolling();
    return query.refetch(_injectPagination(variables));
  };

  const PaginationComponent = () => {
    // dont disable pagination arrows when polling
    const loading = query.loading && query.networkStatus !== NetworkStatus.poll;

    return (
      <Space className="setter-pagination">
        {_getTotal() !== 0 ? (
          <Pagination
            total={_getTotal()}
            current={page}
            showSizeChanger
            disabled={loading}
            showQuickJumper
            pageSize={limit}
            showTotal={(total) => `${t("setter.pagination.total")} ${total} ${t("setter.pagination.items")}`}
            onChange={_changeOption}
          />
        ) : (
          <React.Fragment>
            <Button
              disabled={page <= FIRST_PAGE || loading}
              icon={<DoubleLeftOutlined />}
              onClick={() => _loadPage(FIRST_PAGE)}
            />
            <Button
              icon={<LeftOutlined />}
              disabled={page <= FIRST_PAGE || loading}
              onClick={() => _loadPage(page - 1)}
            />
            <span>{page}</span>
            <Button
              icon={<RightOutlined />}
              disabled={!_hasNextPage() || loading}
              onClick={() => _loadPage(page + 1)}
            />
          </React.Fragment>
        )}
      </Space>
    );
  };

  return {
    ...query,
    refetch,
    PaginationComponent,
  };
};
