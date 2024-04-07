import { Flex, Row } from 'antd';
import { useGetReposInfoQuery } from '../../store/api/api';
import { BASE_GIT_URL } from '../../utils/consts';
import { FaStar } from 'react-icons/fa';
import { formatStartCount } from '../../utils/formatStarsCount';

export const RepoInfo = () => {
  const { data } = useGetReposInfoQuery('facebook/react');

  const formatRepoName = (fullName: string, baseUrl: string) => {
    const gitPathArray = fullName.split('/');
    const gitName = gitPathArray[0];
    const repoName = gitPathArray[1];

    return (
      <span>
        <a target="_blank" href={`${baseUrl}/${gitName}`}>
          {gitName}
        </a>
        &nbsp;&gt;&nbsp;
        <a target="_blank" href={`${baseUrl}/${gitName}/${repoName}`}>
          {repoName}
        </a>
      </span>
    );
  };

  return (
    <Row style={{ gap: '15px', marginBottom: '10px' }}>
      <div>{data && formatRepoName(data?.full_name, BASE_GIT_URL)}</div>
      <Flex style={{ alignItems: 'center', gap: '5px' }}>
        <FaStar /> {data && formatStartCount(data?.stargazers_count)} stars
      </Flex>
    </Row>
  );
};
