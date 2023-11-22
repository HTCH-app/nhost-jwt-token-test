import { Allow } from "@/auth";
import { GetServerSidePropsContext } from "next";
import { useSignOut, getNhostSession, useUserData, useAuthenticationStatus, useUserDisplayName } from "@nhost/nextjs";
import { useProjectsList } from "@/hooks/use-projects-list";
import { useReceivedInvites } from "@/hooks/use-recieved-invites";
import Link from "next/link";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const nhostSession = await getNhostSession({
    subdomain: 'local',
  }, context);

  return {
    props: {
      nhostSession,
    },
  };
}


function Home() {
  const { signOut } = useSignOut();
  const { data } = useProjectsList();
  const { invites } = useReceivedInvites();
  const userName = useUserDisplayName();

  return (
    <div
      className="flex min-h-screen flex-col items-center gap-4 p-24"
    >
      <div className="flex flex-col gap-2 fixed top-6 right-6 z-20">
        <p>{userName}</p>
        <button
          onClick={() => signOut()}
        >
          sign out</button>
      </div>
      <h2>
        Projects
      </h2>

      <ul>
        {data?.projects?.map((project: any) => (
          <li key={project.id}>
            <Link href={`/${project.id}`}>
              {project.name}
            </Link>
          </li>
        ))}
      </ul>

      <h2>Invites</h2>
      <ul>
        {invites.map((invite: any) => (
          <li key={invite.id}>
            {invite.inviter_name} invites you to collaborate on: {invite.project_name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Allow(Home, ['user', 'anonymous'])
