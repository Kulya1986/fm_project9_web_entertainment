import React from "react";
import CategoryMovie from "./../../assets/icon-category-movie.svg";
import CategoryTV from "./../../assets/icon-category-tv.svg";
import Play from "./../../assets/icon-play.svg";
import useImage from "./../../useImage";
import "./VideoItem.css";
import { useEntertainment } from "../../contexts/EntertainmentContext";

export default function VideoItem({
  title,
  category,
  year,
  rating,
  isBookmarked,
  thumbnails,
  trending = false,
}) {
  const imgPath = thumbnails.large.slice(9);
  const { image } = useImage(imgPath);
  const { handleBookmarkClick } = useEntertainment();

  return (
    <div className={`video-item ${trending ? "trend-item" : ""}`}>
      <div className="video-item-thumb">
        <img src={image} alt={title} />
        <div className="bookmark-bg" onClick={() => handleBookmarkClick(title)}>
          <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
              stroke="#FFF"
              strokeWidth="1.5"
              fill={isBookmarked ? "#FFF" : "none"}
            />
          </svg>
        </div>
        <button type="button" className={`${trending ? "trend-play" : ""}`}>
          <img src={Play} alt="play video" />
          <h5>Play</h5>
        </button>
      </div>
      <div className={`video-item-info ${trending ? "trend-info" : ""}`}>
        <p>
          <span className="small">{`${year}`}</span>
          <span> &sdot; </span>
          <img
            src={category === "Movie" ? CategoryMovie : CategoryTV}
            alt="Video type"
          />
          <span> {category}</span>
          <span> &sdot; </span>
          <span> {rating}</span>
        </p>
      </div>
      <h5 className={`video-item-title ${trending ? "trend-title" : ""}`}>
        {title}
      </h5>
    </div>
  );
}
