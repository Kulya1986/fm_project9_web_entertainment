import NavBar from "../components/NavBar/NavBar";
import SearchBar from "../components/SearchBar/SearchBar";
import Trending from "../components/Trending/Trending";
import VideosBox from "../components/VideosBox/VideosBox";
import { useEntertainment } from "../contexts/EntertainmentContext";

function Homepage() {
  const { searchQuery } = useEntertainment();
  return (
    <>
      <NavBar />
      <main>
        <SearchBar inputPlaceholder={"Search for movies or TV series"} />
        {searchQuery.length === 0 && <Trending />}
        <VideosBox page={"Home"} />
      </main>
    </>
  );
}

export default Homepage;
