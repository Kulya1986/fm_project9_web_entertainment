import NavBar from "../components/NavBar/NavBar";
import SearchBar from "../components/SearchBar/SearchBar";
import VideosBox from "../components/VideosBox/VideosBox";

function Movies() {
  return (
    <>
      <NavBar />
      <main>
        <SearchBar inputPlaceholder={"Search for movies"} />
        <VideosBox page={"Movies"} />
      </main>
    </>
  );
}

export default Movies;
