import React from "react";
import { markdown } from "markdown";

const scoreButtonStyle = {
  padding: "0 0px 5px 5px",
};

function Review({ review, deleteReview, updateScoreHandler }) {
  const handleIncreaseClick = () => {
    const score = review.score + 1;
    if (score > 5) return;
    updateScoreHandler(review, score, review.critic_id, review.movie_id);
  };

  const handleDecreaseClick = () => {
    const score = review.score - 1;
    if (score < 1) return;
    updateScoreHandler(review, score, review.critic_id, review.movie_id);
  };

  const { critic } = review;

  return (
    <section className="border p-4 mb-4">
      <h4>
        {critic.preferred_name} {critic.surname}
        <small> of {critic.organization_name}</small>
      </h4>
      <p
        dangerouslySetInnerHTML={{ __html: markdown.toHTML(review.content) }}
      />
      <p>
        <strong>Rating:</strong> {review.score}
        <button
          className="btn btn-link"
          style={scoreButtonStyle}
          onClick={() => handleIncreaseClick()}
        >
          ↑
        </button>
        <button
          className="btn btn-link"
          style={scoreButtonStyle}
          onClick={() => handleDecreaseClick()}
        >
          ↓
        </button>
      </p>

      <button className="btn btn-danger" onClick={() => deleteReview(review)}>
        Delete Review
      </button>
    </section>
  );
}

export default Review;
