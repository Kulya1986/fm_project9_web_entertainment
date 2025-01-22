import React from "react";
import VideoItem from "../VideoItem/VideoItem";
import "./VideosBox.css";
import { useEntertainment } from "../../contexts/EntertainmentContext";

export default function VideosBox() {
  const {
    entertainmentData,
    searchQuery,
    searchResultData,
    page,
    sectionTitle,
  } = useEntertainment();

  const videosData = searchQuery.length
    ? searchResultData
    : page === "Home"
    ? entertainmentData
    : page === "Movies" || page === "TV Series"
    ? entertainmentData.filter(
        (item) => item.category.toLowerCase() === page.toLowerCase()
      )
    : entertainmentData.filter((item) => item.isBookmarked);
  return (
    <section>
      {page !== "Bookmarked" ||
      (page === "Bookmarked" && searchQuery.length) ? (
        <>
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
        </>
      ) : (
        <>
          <h2>Bookmarked Movies</h2>
          <div className="videos-list">
            {videosData.filter((item) => item.category === "Movies").length > 0
              ? videosData
                  .filter((item) => item.category === "Movies")
                  .map((item, index) => (
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
              : "No bookmarked videos in Movies"}
          </div>
          <h2>Bookmarked TV Series</h2>
          <div className="videos-list">
            {videosData.filter((item) => item.category === "TV Series").length >
            0
              ? videosData
                  .filter((item) => item.category === "TV Series")
                  .map((item, index) => (
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
              : "No bookmarked videos in TV Series"}
          </div>
        </>
      )}
    </section>
  );
}
