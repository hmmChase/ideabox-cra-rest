import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as thunk from '../../thunks';
import './IdeaCard.css';

export class IdeaCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prevIdea: this.props.idea,
      nextIdea: this.props.idea
    };
  }

  handleInputIdeaCard = event => {
    this.setState(
      { nextIdea: event.target.innerText },
      async () =>
        await this.props.dispatchUpdateIdea(
          this.props.id,
          this.state.nextIdea,
          this.props.stateIdeas
        )
    );
  };

  handleClickDeleteBtn = event => {
    event.target.disabled = true;
    this.props.dispatchDeleteIdea(this.props.id, this.props.stateIdeas);
  };

  render() {
    return (
      <li className="IdeaCard">
        <div className="ideaCardContent">
          <button
            className="deleteBtn"
            onClick={event => this.handleClickDeleteBtn(event)}
          >
            X
          </button>
          <p
            className="ideaCardText"
            contentEditable={true}
            suppressContentEditableWarning={true}
            onInput={event => this.handleInputIdeaCard(event)}
          >
            {this.state.prevIdea}
          </p>
        </div>
      </li>
    );
  }
}

export const mapStateToProps = state => ({
  stateIdeas: state.ideas
});

export const mapDispatchToProps = dispatch => ({
  dispatchUpdateIdea: (ideaID, nextIdea, ideas) =>
    dispatch(thunk.updateIdea(ideaID, nextIdea, ideas)),
  dispatchDeleteIdea: (ideaID, ideas) =>
    dispatch(thunk.deleteIdea(ideaID, ideas))
});

IdeaCard.propTypes = {
  id: PropTypes.number.isRequired,
  idea: PropTypes.string.isRequired,
  stateIdeas: PropTypes.array.isRequired,
  created_at: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
  dispatchDeleteIdea: PropTypes.func.isRequired,
  dispatchUpdateIdea: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IdeaCard);
