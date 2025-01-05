import React from "react";
import VideoItem from "../VideoItem/VideoItem";
import "./VideosBox.css";

export default function VideosBox({
  sectionTitle,
  videosData,
  bookmarkClick,
  searchQuery,
}) {
  return (
    <section>
      <h2>
        {sectionTitle === "Home"
          ? "Recommended for you"
          : sectionTitle === "search"
          ? `Found ${videosData.length} results for '${searchQuery}'`
          : sectionTitle}
      </h2>
      <div className="videos-list">
        {videosData.map((item, index) => (
          <VideoItem
            key={index}
            title={item.title}
            category={item.category}
            year={item.category}
            rating={item.rating}
            isBookmarked={item.isBookmarked}
            thumbnails={item.thumbnail.regular}
            bookmarkClick={bookmarkClick}
          />
        ))}
      </div>
    </section>
  );
}
