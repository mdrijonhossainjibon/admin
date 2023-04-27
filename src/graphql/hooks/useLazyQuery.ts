import { gql, QueryHookOptions } from "@apollo/client";
import { useLazyQuery as useApolloLazyQuery } from "@apollo/client/react/hooks/useLazyQuery";
import { useErrorContext } from "../../components/context/error-context";

const useLazyQuery = <TData = any, TVariables = Record<string, any>>(
  queryGql: ReturnType<typeof gql>,
  options?: QueryHookOptions<TData, TVariables>
) => {
  const [query, ...restTuple] = useApolloLazyQuery<TData, TVariables>(queryGql, options);
  const { handleApolloError } = useErrorContext();

  const errorHandledQuery = async (customOptions?: QueryHookOptions<TData, TVariables>) => {
    try {
      await query(customOptions || options);
    } catch (err) {
      handleApolloError(err);
    }
  };

  return [errorHandledQuery, ...restTuple] as const;
};

export { useLazyQuery };
