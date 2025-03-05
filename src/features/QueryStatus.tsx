import { UseQueryResult } from "@tanstack/react-query";
import { Children, ReactNode } from "preact/compat";
import { stubFalse } from "../lib/utils";

type Props = {
  children: ReactNode;

  /** Tanstack Query object */
  query: UseQueryResult<unknown, Error>;

  /** Provided query data is considered 'empty' when method is true */
  isEmpty?: (arg: any) => boolean;
};

/**
 * Given a Tanstack Query and children for each state, render the child matching
 * the current state of the query
 */
export const QueryStatus = ({
  children,
  isEmpty = stubFalse,
  query,
}: Props) => {
  let content = null;

  // Loop through children and find the matching status component
  Children.forEach(children, (child) => {
    if (
      (query.isLoading || query.isPending) &&
      // @ts-expect-error: children have a type prop with the component object
      child.type === QueryStatus.Loading
    ) {
      content = child;
    }

    // @ts-expect-error
    if (query.isError && child.type === QueryStatus.Error) {
      content = child;
    }

    if (
      query.isSuccess &&
      isEmpty(query.data) &&
      // @ts-expect-error
      child.type === QueryStatus.Empty
    ) {
      content = child;
    }

    if (
      query.isSuccess &&
      !isEmpty(query.data) &&
      // @ts-expect-error
      child.type === QueryStatus.Success
    ) {
      content = child;
    }
  });

  return <>{content}</>;
};

QueryStatus.Loading = ({ children }) => <>{children}</>;

QueryStatus.Error = ({ children }) => <>{children}</>;

QueryStatus.Empty = ({ children }) => <>{children}</>;

QueryStatus.Success = ({ children }) => <>{children}</>;
