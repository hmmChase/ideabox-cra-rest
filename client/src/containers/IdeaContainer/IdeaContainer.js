import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IdeaCard from '../../components/IdeaCard/IdeaCard';
import Error from '../../components/Error/Error';
import Loader from '../../components/Loader/Loader';
import * as thunk from '../../thunks';
import './IdeaContainer.css';

export class IdeaContainer extends Component {
  componentDidMount = () => this.getIdeas();

  getIdeas = () => {
    const { id } = this.props;
    return id
      ? this.props.dispatchGetIdeas(`/api/v1/ideas/${id}`)
      : this.props.dispatchGetIdeas('/api/v1/ideas');
  };

  displayIdeaCards = () =>
    this.props.stateIdeas
      .map(idea => <IdeaCard key={'ideaCard' + idea.id} {...idea} />)
      .sort((a, b) => b.props.id - a.props.id);

  render() {
    return (
      <section className="IdeaContainer">
        {this.props.stateHasErrored ? (
          <Error />
        ) : this.props.stateIsLoading ? (
          <Loader />
        ) : (
          <ul>{this.displayIdeaCards()}</ul>
        )}
      </section>
    );
  }
}

export const mapStateToProps = state => ({
  stateIsLoading: state.isLoading,
  stateHasErrored: state.hasErrored,
  stateIdeas: state.ideas
});

export const mapDispatchToProps = dispatch => ({
  dispatchGetIdeas: url => dispatch(thunk.getIdeas(url))
});

IdeaContainer.propTypes = {
  id: PropTypes.number,
  stateIsLoading: PropTypes.bool.isRequired,
  stateHasErrored: PropTypes.bool.isRequired,
  stateIdeas: PropTypes.array.isRequired,
  dispatchGetIdeas: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IdeaContainer);
