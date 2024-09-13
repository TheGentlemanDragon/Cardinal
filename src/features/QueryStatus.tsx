import { UseQueryResult } from "@tanstack/react-query";
import { Children, ReactNode } from "preact/compat";

type Props = {
  children: ReactNode;

  /** Tanstack Query object */
  query: UseQueryResult<unknown, Error>;

  /** Provided query data is considered 'empty' when method is true */
  isEmpty: (arg: any) => boolean;
};

export const Loading = ({ children }) => <>{children}</>;

export const Error = ({ children }) => <>{children}</>;

export const Empty = ({ children }) => <>{children}</>;

export const Success = ({ children }) => <>{children}</>;

/**
 * Given a Tanstack Query and children for each state, render the child matching
 * the current state of the query
 */
export const QueryStatus = ({ children, isEmpty, query }: Props) => {
  let content = null;

  // Loop through children and find the matching status component
  Children.forEach(children, (child) => {
    // @ts-expect-error: children have a type prop with the component object
    if (query.isLoading && child.type === Loading) {
      content = child;
    }

    // @ts-expect-error
    if (query.isError && child.type === Error) {
      content = child;
    }

    // @ts-expect-error
    if (query.isSuccess && isEmpty(query.data) && child.type === Empty) {
      content = child;
    }

    // @ts-expect-error
    if (query.isSuccess && !isEmpty(query.data) && child.type === Success) {
      content = child;
    }
  });

  return <>{content}</>;
};
