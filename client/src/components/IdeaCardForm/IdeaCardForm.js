import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as thunk from '../../thunks';
import './IdeaCardForm.css';
import ideaboxImg from '../../assets/images/ideabox.png';

export class IdeaCardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idea: '',
      isSubmitDisabled: true
    };
  }

  canSubmit = () => {
    if (this.state.idea === '') {
      this.setState({ isSubmitDisabled: true });
    } else {
      this.setState({ isSubmitDisabled: false });
    }
  };

  handleChangeIdeaInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => this.canSubmit());
  };

  handleSubmitIdeaForm = async event => {
    event.preventDefault();
    this.setState({ isSubmitDisabled: true });
    await this.props.dispatchAddIdea(this.state.idea);
    this.setState({ idea: '' }, () => this.canSubmit());
  };

  render() {
    return (
      <form
        className="IdeaCardForm"
        onSubmit={event => this.handleSubmitIdeaForm(event)}>
        <img src={ideaboxImg} alt="ideabox" />
        <textarea
          className="IdeaCardInput"
          name="idea"
          type="text"
          placeholder="What's on your mind?"
          value={this.state.idea}
          onChange={event => this.handleChangeIdeaInput(event)}
        />
        <button type="submit" disabled={this.state.isSubmitDisabled}>
          Add Idea
        </button>
      </form>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  dispatchAddIdea: idea => dispatch(thunk.addIdea(idea))
});

IdeaCardForm.propTypes = {
  dispatchAddIdea: PropTypes.func.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(IdeaCardForm);
