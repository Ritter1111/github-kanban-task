import { Input, Space } from 'antd';
import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchUrl } from '../../store/slices/searchSlice';
import { BASE_GIT_URL } from '../../utils/consts';

const { Search } = Input;

export const SearchBar = () => {
  const [searchString, setSearchString] = useState<string>('');
  const dispatch = useDispatch();

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setSearchString(target.value);
  };

  const onSearch = (string: string) => {
    const formettedSearchUrl = formatSearchString(string);
    dispatch(setSearchUrl(formettedSearchUrl));
  };

  const formatSearchString = (url: string) => {
    const urlArray = url.split(BASE_GIT_URL);
    return urlArray[urlArray.length - 1];
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
