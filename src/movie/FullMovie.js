import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Details from "./Details";
import ReviewList from "./ReviewList";
import TheaterList from "./TheaterList";
import { deleteReview, readMovie, updateReview } from "../utils/api";
import ErrorAlert from "../shared/ErrorAlert";

function FullMovie() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMovie(movieId);
  }, [movieId]);

  function loadMovie(movieId) {
    setError(null);
    const abortController = new AbortController();
    readMovie(movieId, abortController.signal).then(setMovie).catch(setError);
    return () => abortController.abort();
  }

  function deleteReviewHandler({ movie_id: movieId, review_id: reviewId }) {
    let confirmDelete = window.confirm(
      "Are you sure you want to delete this review?  It cannot be undone!"
    );

    if (confirmDelete) {
      deleteReview(reviewId).then(() => loadMovie(movieId));
    }
  }

  function updateScoreHandler(
    // destructure review_id and movie_id from the review object that gets passed in on click.  set movie_id from useParams()
    { movie_id: movieId, review_id: reviewId },
    score,
    critic_id,
    movie_id
  ) {
    // update review based on passed in id and destructured incoming data from on click in Review.js
    updateReview(reviewId, { score, critic_id, movie_id }).then(() =>
      loadMovie(movieId)
    );
  }

  return (
    <div className="container">
      <ErrorAlert error={error} />
      <section className="row mt-4">
        <article className="col-sm-12 col-md-6 col-lg-3">
          <img
            alt={`${movie.title} Poster`}
            className="rounded"
            src={movie.image_url}
            style={{ width: "100%" }}
          />
        </article>
        <aside className="col-sm-12 col-md-6 col-lg-9">
          <Details movie={movie} />
          <TheaterList theaters={movie.theaters} />
          <ReviewList
            reviews={movie.reviews}
            deleteReview={deleteReviewHandler}
            updateScoreHandler={updateScoreHandler}
          />
        </aside>
      </section>
    </div>
  );
}

export default FullMovie;
