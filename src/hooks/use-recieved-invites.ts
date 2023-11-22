import { gql, useSubscription } from "@apollo/client";
import { useUserEmail } from "@nhost/react";
import { useMemo } from "react";

const RECEIVED_INVITES_SUB = gql(`
 subscription ReceivedInvites($email: String) {
    invites(where: { email: { _eq: $email } }, order_by: { created_at: desc }) {
      id
      inviter_name
      project_id
      project_name
      email
      created_at
      role_id
    }
  }
`);

export const useReceivedInvites = () => {
  const email = useUserEmail();
  const { data, loading } = useSubscription(RECEIVED_INVITES_SUB, {
    variables: { email },
  });

  const invites = useMemo(
    () => data?.invites ?? [],
    [data?.invites]
  );

  return { invites, isLoading: loading };
};
