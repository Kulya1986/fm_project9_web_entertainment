import NavBar from "../components/NavBar/NavBar";
import SearchBar from "../components/SearchBar/SearchBar";
import VideosBox from "../components/VideosBox/VideosBox";
import { useEntertainment } from "../contexts/EntertainmentContext";
import { useUser } from "../contexts/UserContext";

function Bookmarked() {
  const { searchQuery } = useEntertainment();
  const { bookmarked } = useUser();

  return (
    <>
      <NavBar />
      <main>
        <SearchBar inputPlaceholder={"Search for bookmarked shows"} />
        {bookmarked.length > 0 ? (
          searchQuery ? (
            <VideosBox page="Bookmarked" />
          ) : (
            <>
              <VideosBox page="Bookmarked" section="Movies" />
              <VideosBox page="Bookmarked" section="TV Series" />
            </>
          )
        ) : (
          <h3>No bookmarked videos yet</h3>
        )}
      </main>
    </>
  );
}

export default Bookmarked;
