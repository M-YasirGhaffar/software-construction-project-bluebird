import DashboardLayout from "@/components/DashboardLayout";
import DiscoverGrid from "@/components/DiscoverGrid";
import { getList, movieSectionTypes } from "@/utils/GetMovieData";
import type MovieDB from "node-themoviedb";

/**
 * Dashboard Component
 *
 * This component represents the main dashboard page.
 *
 * @param {Object} props - Component properties.
 * @param {MovieDB.Responses.Movie.GetDetails[]} props.nowPlaying - List of currently playing movies.
 * @param {MovieDB.Responses.Movie.GetDetails[]} props.upcoming - List of upcoming movies.
 * @param {MovieDB.Responses.Movie.GetDetails[]} props.popular - List of popular movies.
 * @param {MovieDB.Responses.Movie.GetDetails[]} props.topRated - List of top-rated movies.
 * @returns {React.Component} - The rendered Dashboard component.
 */
function Dashboard({
  nowPlaying,
  upcoming,
  popular,
  topRated,
}: {
  nowPlaying: MovieDB.Responses.Movie.GetDetails[];
  upcoming: MovieDB.Responses.Movie.GetDetails[];
  popular: MovieDB.Responses.Movie.GetDetails[];
  topRated: MovieDB.Responses.Movie.GetDetails[];
}) {
  return (
    <DashboardLayout>
      {/* Display DiscoverGrid for Now Playing movies */}
      <DiscoverGrid movies={nowPlaying} type="NOWPLAYING" />

      {/* Display DiscoverGrid for Upcoming movies */}
      <DiscoverGrid movies={upcoming} type="UPCOMING" />

      {/* Display DiscoverGrid for Popular movies */}
      <DiscoverGrid movies={popular} type="POPULAR" />

      {/* Display DiscoverGrid for Top Rated movies */}
      <DiscoverGrid movies={topRated} type="TOPRATED" />
    </section>
  </DashboardLayout>
  );
}

/**
 * Get Static Props Function
 *
 * This function is used to pre-fetch data for the Dashboard component during static generation.
 *
 * @returns {Promise<Object>} - An object containing the movie lists for different sections.
 */
export async function getStaticProps() {
  // Fetch movie lists for different sections
  const promises = movieSectionTypes.map((type) => getList({ type, page: 1 }));
  const [nowPlaying, upcoming, popular, topRated] = await Promise.all(promises);

  return {
    props: {
      nowPlaying,
      upcoming,
      popular,
      topRated,
    },
    revalidate: 60 * 60 * 6, // 6 hours
  };
}

// Export the Dashboard component as the default export
export default Dashboard;
