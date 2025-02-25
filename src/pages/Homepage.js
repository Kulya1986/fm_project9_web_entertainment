import Loader from "../components/Loader/Loader";
import NavBar from "../components/NavBar/NavBar";
import SearchBar from "../components/SearchBar/SearchBar";
import Trending from "../components/Trending/Trending";
import VideosBox from "../components/VideosBox/VideosBox";
import { useEntertainment } from "../contexts/EntertainmentContext";

function Homepage() {
  const { searchQuery, isLoading, error } = useEntertainment();
  return (
    <>
      <NavBar />
      <main>
        <SearchBar inputPlaceholder={"Search for movies or TV series"} />
        {isLoading ? (
          <Loader />
        ) : error.length > 0 ? (
          <h3>{error}</h3>
        ) : (
          <>
            {searchQuery.length === 0 && <Trending />}
            <VideosBox page={"Home"} />
          </>
        )}
      </main>
    </>
  );
}

export default Homepage;
