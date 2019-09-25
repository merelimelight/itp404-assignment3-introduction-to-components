import React from 'react';
import './App.css';
import Loading from './Loading';
import { getPosts } from './RedditApi';
import SearchForm from './SearchForm';
import RedditCard from './RedditCard';

class App extends React.Component
{
  constructor ()
  {
    super();

    this.state = {
      posts: [],
      loading: false,
      searchArray: [],
      counterNum: 0
    };
  }

  handleSearch = async (searchValue) => {

    this.setState({ loading: true });

    let [posts] = await Promise.all([
      getPosts(searchValue)
    ]);

    this.setState(oldState => ({searchArray: [searchValue, ...oldState.searchArray]}));

    this.setState({ posts, loading: false });
  }

  countClicks = () => {
    this.setState(oldState => ({counterNum: oldState.counterNum + 1}));
  }

  applyPreviousSearch = async (searchValue) => {
    this.setState({ loading: true });

    let [posts] = await Promise.all([
      getPosts(searchValue)
    ]);

    this.setState({ posts, loading: false });
  }

  render()
  {
    return (
      <div>

        <div id = "counter">

          <h1> {this.state.counterNum} </h1>

        </div>

        <SearchForm onSearch = {this.handleSearch} />
        {this.state.loading && <Loading />}

        <div id = "searchList">

          {this.state.searchArray.map((term) => {
            return (
              <button type="button" onClick={this.applyPreviousSearch.bind(this, term)}>
                {term}
              </button>
              );
            }
          )}

        </div>

        <div onClick={this.countClicks} >
          {this.state.posts.map((post) => {
            return <RedditCard post={post} key={post.id} onClick/>
          })}
        </div>

      </div>
    );
  }
}

export default App;
