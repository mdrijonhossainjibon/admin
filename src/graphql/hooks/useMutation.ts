import {
  gql,
  MutationHookOptions,
  useMutation as useApolloMutation,
  // MutationFunctionOptions,
  ApolloError,
  ApolloCache,
} from "@apollo/client";
import { useErrorContext } from "../../components/context/error-context";
import { message } from "antd";

interface CustomMutationHookOptions<TData, TVariables> extends MutationHookOptions<TData, TVariables> {
  successMessage?: string;
  invalidateCache?: boolean;
}

const useMutation = <TData = any, TVariables = Record<string, any>>(
  mutationGql: ReturnType<typeof gql>,
  options?: CustomMutationHookOptions<TData, TVariables>
) => {
  const { handleApolloError } = useErrorContext();

  const onCompleted = async (data: TData) => {
    if (options?.onCompleted) {
      await options.onCompleted(data);
    }

    if (options?.successMessage) {
      message.success(options.successMessage);
    }
  };

  const onError = (error: ApolloError) => {
    if (options?.onError) {
      options.onError(error);
    }

    handleApolloError(error);
  };

  const handleCache = (cache: ApolloCache<TData>) => {
    if (options?.invalidateCache !== false) {
      cache.reset();
    }
  };

  return useApolloMutation<TData, TVariables>(mutationGql, {
    ...options,
    onCompleted,
    onError,
    update: handleCache,
  });
};

export { useMutation };
