import { Boards } from '../Boards/Boards';
import { RepoInfo } from '../RepoInfo/RepoInfo';
import { SearchBar } from '../SearchBar/SearchBar';

function App() {
  return (
    <>
      <SearchBar />
      <RepoInfo />
      <Boards />
    </>
  );
}

export default App;
