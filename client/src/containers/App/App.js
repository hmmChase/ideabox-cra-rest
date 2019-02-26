import React from 'react';
import { Route, Switch } from 'react-router-dom';
import IdeaCardForm from '../../components/IdeaCardForm/IdeaCardForm';
import IdeaContainer from '../IdeaContainer/IdeaContainer';
import './App.css';

const App = () => (
  <main className="App">
    <header className="App-header">
      <h1>IdeaBox</h1>
      <IdeaCardForm />
    </header>
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <div>
            <IdeaContainer />
          </div>
        )}
      />
      <Route exact path="/ideas" component={IdeaContainer} />
      <Route
        path="/ideas/:id"
        render={({ match }) => <IdeaContainer id={parseInt(match.params.id)} />}
      />
    </Switch>
  </main>
);

export default App;
