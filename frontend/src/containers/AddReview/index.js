import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { baseUrl } from '../../store/constants';
import StarRating from '../../components/Starrating';

function AddReview(props) {
    const restID = props.match.params.id;
  const { push } = useHistory();
  const [rating, setRating] = useState(null);
  const [formState, setFormState] = useState({});

  const onChangeHandler = (e) => {
    const key = e.currentTarget.name;
    setFormState({
      ...formState,
      [key]: e.currentTarget.value,
    });
  };

  const onChangeRating = (rating) => {
      setRating(rating);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const requiredFields = document.querySelectorAll('.required');

    let requiredFieldsOK = true;

    requiredFields.forEach((field) => {
      if (!field.value) {
        field.nextElementSibling.style.opacity = '1';
        requiredFieldsOK = false;
      } else {
        field.nextElementSibling.style.opacity = '0';
      }
    });

    if (!rating) {
      document.querySelector('.star-rating-wrapper .error').style.opacity = '1';
    } else {
      document.querySelector('.star-rating-wrapper .error').style.opacity = '1';
    }

    if (requiredFieldsOK && rating) {
      const form = new FormData();

      console.log('send new review');

      for (const [key, value] of Object.entries(formState)) {
        form.append(key, value);
      }
      form.append('rating', rating);
      const config = {
        method: 'POST',
        headers: new Headers({
          Authorization: `Bearer ${props.currentUser.accessToken}`,
        }),
        body: form,
      };

      const loginResponse = fetch(baseUrl + 'reviews/new/'+ restID + '/', config)
        .then((res) => {
            if (res.ok) {
                push('/restaurant-detail/'+ restID + '/')
            }
            return res.json()
        })
        .then((data) => {
          console.log(data);
        })
        .catch((response) => {
          return;
        });
    }
  };
  return (
    <form id="add-review" onSubmit={(e) => onSubmitHandler(e)}>
      <div className="form-review-wrapper">
        <div className="star-rating-wrapper">
          <div className="star-rating-div">
            <label htmlFor="rating"></label>
            <StarRating
              id="rating"
              name="rating"
              className="ratingStars"
              onChangeRating={onChangeRating}
              ratingFromAddReview={rating}
              readOnly={false}
            />
            <span>Select your rating</span>
          </div>
        <p className="error">Please add rating</p>
        </div>
        <div className="textarea-wrapper">
          <label htmlFor="text_content"></label>
          <textarea
            id="text_content"
            className="required"
            name="text_content"
            cols="100"
            placeholder="Your review helps others learn about great local businesses.
            Please don't review this business if you received a freebie for writing this review, or if you're connected in any way to the owner or employees."
            onChange={(e) => onChangeHandler(e)}
          ></textarea>
          <p className="error">This field is required</p>
        </div>
      </div>

      <button className="btn" type="submit">
        Submit
      </button>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  };
};
const connection = connect(mapStateToProps);
const ConnectedAddReview = connection(AddReview);

export default ConnectedAddReview;
