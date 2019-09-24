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
      searchValue: ''
    };
  }

  handleSearch = async (searchValue) => {

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

        <SearchForm onSearch = {this.handleSearch} />
        {this.state.loading && <Loading />}

        <p></p>

        <div>
          {this.state.posts.map((post) => {
            return <RedditCard post={post} key={post.id}/>
          })}
        </div>
      </div>
    );
  }
}

export default App;
