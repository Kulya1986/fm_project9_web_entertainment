import React, { useLayoutEffect, useRef, useState } from "react";
import VideoItem from "../VideoItem/VideoItem";
import "./Trending.css";

export default function Trending({ videosData, bookmarkClick }) {
  const carouselEl = useRef(null);
  const [translateEnd, setTranslateEnd] = useState("");

  useLayoutEffect(() => {
    const containerWidth = carouselEl.current.clientWidth;
    const animationEndPoint = containerWidth - 2510 - 36;
    setTranslateEnd(`${animationEndPoint}px`);
  }, [videosData]);

  return (
    <section>
      <h2>Trending</h2>
      <div className="trending-list" ref={carouselEl}>
        <div
          id="trending-list-holder"
          style={
            translateEnd
              ? {
                  "--translateEnd": translateEnd,
                  animation:
                    "carousel 40s ease-in-out 1s infinite alternate forwards",
                }
              : null
          }
        >
          {videosData.map((item, index) => (
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
      </div>
    </section>
  );
}
