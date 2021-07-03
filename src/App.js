import React, { useState, useEffect } from 'react';
import { Form, Card, Image, Icon } from 'semantic-ui-react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [userName, setUsername] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [repos, setRepos] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/users/example')
      .then(res => res.json())
      .then(data => {
        setData(data);
      });
  }, []);
  const setData = ({ name, login, followers, following, public_repos, avatar_url }) => {
    setName(name);
    setUsername(login);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
  }

  const handleSearch = (e) => {
    setUserInput(e.target.value);
  }

  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
    .then(res => res.json())   // doubt
    .then(data => {
      if(data.message) {
        setError(data.message);
      } else {
        setData(data);
        setError(null);   // doubt cleared: error will be null and so card will be displayed
      }
    })
  }

  return (
    <div className="App">
      <div className="navbar">Search for user stats</div>
      <div className="search">
        <Form onSubmit={handleSubmit} >
          <Form.Group>
            <Form.Input palceholder="Enter username" name="github user" onChange={handleSearch} />
            <Form.Button content="Search" />
          </Form.Group>
        </Form>
      </div>
      { error ? (<h1 align="center"> User {error}. Register <a href="https://github.com">here</a> </h1>) : (
        <div className="card">
          <Card>
            <Image src={ avatar } wrapped ui={false} />
            <Card.Content>
              <Card.Header>Name: { name }</Card.Header>
              <Card.Header>Username: { userName }</Card.Header>
            </Card.Content>
            <Card.Content extra>
              <a href={`https://github.com/${userName}`}>
                <Icon name='user' />
                {followers} Followers
              </a>
            </Card.Content>
            <Card.Content extra>
              <a href={`https://github.com/${userName}`}>
                <Icon name='user' />
                {repos} Repositories
              </a>
            </Card.Content>
            <Card.Content extra>
              <a href={`https://github.com/${userName}`}>
                <Icon name='user' />
                {following} Following
              </a>
            </Card.Content>
          </Card>
        </div>
      ) }
    </div>
  );
}

export default App;
