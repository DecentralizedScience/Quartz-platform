import logo from './logo.svg';
import './App.css';
import { useQuery, gql } from "@apollo/client";

const POSTS_QUERY = gql`
  query {
    posts {
      id
      content
      author
    }
  }
`;

function App() {
  const { data, loading } = useQuery(POSTS_QUERY);

  if (loading) {
    return <div>Loading....</div>;
  }

  console.log("data: ", data);

  return (
    <div className="App">
      Hello React!
    </div>
  )
}

export default App;
