import { Flex, Row } from 'antd';
import { useGetReposInfoQuery } from '../../store/api/api';
import { BASE_GIT_URL } from '../../utils/consts';
import { FaStar } from 'react-icons/fa';
import { formatStartCount } from '../../utils/formatStarsCount';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { parseGitAndRepoNames } from '../../utils/parseGitAndRepoNames';
import Spinner from '../Spinner/Spinner';

export const RepoInfo = () => {
  const searchUrl = useSelector((state: RootState) => state.search.url);
  const { data, isFetching } = useGetReposInfoQuery(searchUrl);

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <Row style={{ gap: '15px', marginBottom: '10px' }}>
      {data && (
        <div>
          <a
            target="_blank"
            href={`${BASE_GIT_URL}/${parseGitAndRepoNames(data.full_name).gitName}`}
          >
            {parseGitAndRepoNames(data.full_name).gitName}
          </a>
          &nbsp;&gt;&nbsp;
          <a
            target="_blank"
            href={`${BASE_GIT_URL}/${parseGitAndRepoNames(data.full_name).fullName}`}
          >
            {parseGitAndRepoNames(data.full_name).repoName}
          </a>
        </div>
      )}
      <Flex style={{ alignItems: 'center', gap: '5px' }}>
        <FaStar /> {data && formatStartCount(data.stargazers_count)} stars
      </Flex>
    </Row>
  );
};
