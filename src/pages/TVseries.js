import NavBar from "../components/NavBar/NavBar";
import SearchBar from "../components/SearchBar/SearchBar";
import VideosBox from "../components/VideosBox/VideosBox";

function TVseries() {
  return (
    <>
      <NavBar />
      <main>
        <SearchBar inputPlaceholder={"Search for TV series"} />
        <VideosBox page={"TV Series"} />
      </main>
    </>
  );
}

export default TVseries;
