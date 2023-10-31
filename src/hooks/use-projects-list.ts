import { gql, useQuery } from "@apollo/client";

export const PROJECT_LIST = gql`
  query ProjectList {
    projects(
      where: { is_in_trash: { _neq: true } }
      order_by: { created_at: desc }
    ) {
      id
      name
    }
  }
`;

export const useProjectsList = () => {
  const { data, loading, error } = useQuery(PROJECT_LIST);

  return {
    data,
    isLoading: loading,
    error,
  };
};