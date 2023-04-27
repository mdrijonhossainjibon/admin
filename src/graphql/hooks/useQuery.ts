import { gql, QueryHookOptions as ApolloQueryHookOptions, useQuery as useApolloQuery } from "@apollo/client";
import { useErrorContext } from "../../components/context/error-context";
import { useEffect } from "react";

export interface QueryHookOptions<TData, TVariables> extends ApolloQueryHookOptions<TData, TVariables> {
  hideError?: boolean;
}

const useQuery = <TData = any, TVariables = Record<string, any>>(
  queryGql: ReturnType<typeof gql>,
  options?: QueryHookOptions<TData, TVariables>
) => {
  const queryResult = useApolloQuery<TData, TVariables>(queryGql, options);
  const { handleApolloError } = useErrorContext();
  
  useEffect(() => {
    if (queryResult.error && !options?.hideError) {
      handleApolloError(queryResult.error);
    }
  }, [queryResult.error]);

  return queryResult;
};

export { useQuery };
