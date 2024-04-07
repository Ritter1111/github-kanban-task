import { ToastContainer } from 'react-toastify';
import { Boards } from '../Boards/Boards';
import { RepoInfo } from '../RepoInfo/RepoInfo';
import { SearchBar } from '../SearchBar/SearchBar';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <SearchBar />
      <RepoInfo />
      <Boards />
      <ToastContainer />
    </>
  );
}

export default App;
