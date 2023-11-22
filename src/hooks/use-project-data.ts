import { gql, useQuery } from "@apollo/client";

export const PROJECT_DATA = gql`
  query ProjectData($projectId: bpchar!) {
  project: projects_by_pk(id: $projectId) {
    id
    name
    created_at
    updated_at
  }
}

`;

export const useProjectsData = (projectId: string) => {
  const { data, loading, error } = useQuery(PROJECT_DATA, {
    variables: {
      projectId
    }
  });

  return {
    data: data?.project,
    isLoading: loading,
    error,
  };
};