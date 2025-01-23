import React from "react";
import VideoItem from "../VideoItem/VideoItem";
import "./VideosBox.css";
import { useEntertainment } from "../../contexts/EntertainmentContext";

export default function VideosBox({ page, section }) {
  const { entertainmentData, searchQuery, searchResultData } =
    useEntertainment();

  const pageData = searchQuery.length ? searchResultData : entertainmentData;
  const videosData =
    page === "Home"
      ? pageData
      : page === "Bookmarked" && section === "Movies"
      ? pageData.filter(
          (item) => item.isBookmarked && item.category === "Movies"
        )
      : page === "Bookmarked" && section === "TV Series"
      ? pageData.filter(
          (item) => item.isBookmarked && item.category === "TV Series"
        )
      : page === "Movies" || page === "TV Series"
      ? pageData.filter(
          (item) => item.category.toLowerCase() === page.toLowerCase()
        )
      : page === "Bookmarked"
      ? pageData.filter((item) => item.isBookmarked)
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
                key={index}
                title={item.title}
                category={item.category}
                year={item.category}
                rating={item.rating}
                isBookmarked={item.isBookmarked}
                thumbnails={item.thumbnail.regular}
              />
            ))
          : !searchQuery.length
          ? "No videos to display"
          : ""}
      </div>
    </section>
  );
}
