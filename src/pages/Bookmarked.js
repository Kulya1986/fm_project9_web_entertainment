import NavBar from "../components/NavBar/NavBar";
import SearchBar from "../components/SearchBar/SearchBar";
import VideosBox from "../components/VideosBox/VideosBox";
import { useEntertainment } from "../contexts/EntertainmentContext";

function Bookmarked() {
  const { searchQuery } = useEntertainment();
  return (
    <>
      <NavBar />
      <main>
        <SearchBar inputPlaceholder={"Search for bookmarked shows"} />
        {searchQuery ? (
          <VideosBox page="Bookmarked" />
        ) : (
          <>
            <VideosBox page="Bookmarked" section="Movies" />
            <VideosBox page="Bookmarked" section="TV Series" />
          </>
        )}
      </main>
    </>
  );
}

export default Bookmarked;
