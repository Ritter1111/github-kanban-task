import { Spin } from 'antd';

const Spinner = () => {
  return (
    <div
      data-testid="loader"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default Spinner;
