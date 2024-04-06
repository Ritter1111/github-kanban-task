import { Input, Space } from 'antd';
import { FormEvent, useState } from 'react';

export const SearchBar = () => {
  const { Search } = Input;
  const [searchString, setSearchString] = useState<string>('');

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setSearchString(target.value);
  };

  const onSearch = (string: string) => {
    setSearchString(string);
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
