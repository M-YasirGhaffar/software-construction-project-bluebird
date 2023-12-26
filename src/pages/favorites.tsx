import DashboardLayout from "@/components/DashboardLayout";
import MovieGrid, { MovieRowSkeleton } from "@/components/MovieGrid";
import { api } from "@/utils/api";
import { type GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Error from "next/error";

/**
 * Favorite Component
 *
 * This component represents the page displaying a user's favorite movies.
 *
 * @returns {React.Component} - The rendered Favorite component.
 */
function Favorite() {
  // Fetch favorite movies using the useQuery hook from the API
  const { data: movies, error, isLoading } = api.favorite.get.useQuery();

  return (
    <DashboardLayout>
      {/* Display an error message if there's an error */}
      {error && (
        <Error
          statusCode={error.data?.httpStatus ?? 500}
          title={error.message}
        />
      )}

      <section className="container my-10">
        {/* Display a loading skeleton while data is being fetched */}
        {isLoading ? (
          <MovieRowSkeleton amount={18} />
        ) : (
          // Display the list of favorite movies if available
          movies && <MovieGrid movies={movies} title="Favorites" />
        )}
      </section>
    </DashboardLayout>
  );
}

export default Favorite;

/**
 * Get Server-Side Props Function
 *
 * This function is used to check if the user is authenticated.
 * If not authenticated, it redirects the user to the sign-in page.
 *
 * @param {GetServerSidePropsContext} context - The context object for the server-side rendering.
 * @returns {Object} - The server-side props, including the user session.
 */
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Retrieve the user session using the getSession function from next-auth
  const session = await getSession(context);

  // If the user is not authenticated, redirect to the sign-in page
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  // If the user is authenticated, pass the session as props
  return {
    props: { session },
  };
}
