import React from "react";
import VideoItem from "../VideoItem/VideoItem";
import "./Trending.css";

export default function Trending({ videosData, bookmarkClick }) {
  const trendingVideos = videosData.slice(0, 5);

  return (
    <section>
      <h2>Trending</h2>
      <div className="trending-list">
        {trendingVideos.map((item, index) => (
          <VideoItem
            key={index}
            title={item.title}
            category={item.category}
            year={item.category}
            rating={item.rating}
            isBookmarked={item.isBookmarked}
            thumbnails={item.thumbnail.trending}
            bookmarkClick={bookmarkClick}
            trending={true}
          />
        ))}
      </div>
    </section>
  );
}
