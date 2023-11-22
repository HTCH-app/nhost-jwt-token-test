import { Allow } from "@/auth";
import { GetServerSidePropsContext } from "next";
import { useSignOut, getNhostSession, useUserData, useAuthenticationStatus, useUserDisplayName } from "@nhost/nextjs";
import { useRouter } from "next/router";
import { useProjectsData } from "@/hooks/use-project-data";

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


function Project() {
  const { signOut } = useSignOut();
  const router = useRouter();
  const userName = useUserDisplayName();
  const { projectId } = router.query;
  const { data: project } = useProjectsData(projectId as string);

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
        Project page
      </h2>

      <div className="max-w-[400px]">
        {JSON.stringify(project)}
      </div>
    </div>
  )
}

export default Allow(Project, ['user', 'anonymous'])
