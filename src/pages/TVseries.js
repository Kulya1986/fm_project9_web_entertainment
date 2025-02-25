import Loader from "../components/Loader/Loader";
import NavBar from "../components/NavBar/NavBar";
import SearchBar from "../components/SearchBar/SearchBar";
import VideosBox from "../components/VideosBox/VideosBox";
import { useEntertainment } from "../contexts/EntertainmentContext";

function TVseries() {
  const { isLoading, error } = useEntertainment();
  return (
    <>
      <NavBar />
      <main>
        <SearchBar inputPlaceholder={"Search for TV series"} />
        {isLoading ? (
          <Loader />
        ) : error.length > 0 ? (
          <h3>{error}</h3>
        ) : (
          <VideosBox page={"TV Series"} />
        )}
      </main>
    </>
  );
}

export default TVseries;
