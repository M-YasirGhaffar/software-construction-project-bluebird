import { type GetServerSidePropsContext } from "next";
import { type Session } from "next-auth";
import { getSession } from "next-auth/react";
import Head from "next/head";

/**
 * Home Component
 *
 * This component represents the home page.
 * If the user is authenticated, it redirects to the dashboard; otherwise, it redirects to the sign-in page.
 *
 * @param {Object} session - The user session object.
 * @returns {React.Component} - The rendered Home component.
 */
export default function Home({ session }: { session: Session }) {
  return (
    <>
      <Head>
        <title>BlueBird Movie App</title>
        <meta
          name="description"
          content="Solution for Full Stack Developer Assignment"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {/* Display a message based on whether the user is authenticated or not */}
        {session?.user ? "Redirecting to the dashboard..." : "Redirecting to the Sign-in page..."}
      </main>
    </>
  );
}

/**
 * Get Server-Side Props Function
 *
 * This function is used to check if the user is authenticated.
 * If authenticated, it redirects to the dashboard; otherwise, it redirects to the sign-in page.
 *
 * @param {GetServerSidePropsContext} context - The context object for the server-side rendering.
 * @returns {Object} - The server-side props, including the user session.
 */
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Retrieve the user session using the getSession function from next-auth
  const session = await getSession(context);

  // If the user is authenticated, redirect to the dashboard
  if (session?.user) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  // If the user is not authenticated, redirect to the sign-in page
  return {
    redirect: {
      destination: "/signin",
      permanent: false,
    },
  };
}
