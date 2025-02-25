import React from "react";
import VideoItem from "../VideoItem/VideoItem";
import "./VideosBox.css";
import { useEntertainment } from "../../contexts/EntertainmentContext";
import { useUser } from "../../contexts/UserContext";

export default function VideosBox({ page, section }) {
  const { entertainmentData, searchQuery, searchResultData, error } =
    useEntertainment();
  const { bookmarked } = useUser();

  const pageData = searchQuery.length ? searchResultData : entertainmentData;
  const videosData =
    page === "Home"
      ? pageData
      : page === "Bookmarked" && section === "Movies"
      ? pageData.filter(
          (item) =>
            bookmarked.includes(item.videoID) && item.category === "Movies"
        )
      : page === "Bookmarked" && section === "TV Series"
      ? pageData.filter(
          (item) =>
            bookmarked.includes(item.videoID) && item.category === "TV Series"
        )
      : page === "Movies" || page === "TV Series"
      ? pageData.filter(
          (item) => item.category.toLowerCase() === page.toLowerCase()
        )
      : page === "Bookmarked"
      ? pageData.filter((item) => bookmarked.includes(item.videoID))
      : pageData;

  const sectionTitle = searchQuery.length
    ? `Found ${videosData.length} results for '${searchQuery}'`
    : page === "Home"
    ? "Recommended for you"
    : section
    ? `${page} ${section}`
    : page;
  return (
    <section>
      <h2>{sectionTitle}</h2>
      <div className="videos-list">
        {videosData.length > 0
          ? videosData.map((item, index) => (
              <VideoItem
                key={item.videoID}
                videoID={item.videoID}
                title={item.title}
                category={item.category}
                year={item.year}
                rating={item.rating}
                thumbnails={item.thumbnail.regular}
              />
            ))
          : !searchQuery.length
          ? error
          : ""}
      </div>
    </section>
  );
}
