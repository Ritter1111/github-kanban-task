import { Input, Space } from 'antd';
import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchUrl } from '../../store/slices/searchSlice';
import { extractRepoName } from '../../utils/extractRepoName';

export const SearchBar = () => {
  const [searchString, setSearchString] = useState<string>('');
  const dispatch = useDispatch();
  const { Search } = Input;

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setSearchString(target.value);
  };

  const onSearch = (string: string) => {
    const formettedSearchUrl = extractRepoName(string);
    dispatch(setSearchUrl(formettedSearchUrl));
  };

  return (
    <Space
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px',
      }}
    >
      <Search
        placeholder="Enter repo URL"
        onSearch={onSearch}
        style={{ width: '90vw', margin: '10px' }}
        enterButton="Load Issues"
        onInput={(e) => handleInputChange(e)}
        value={searchString}
      />
    </Space>
  );
};
