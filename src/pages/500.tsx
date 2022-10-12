import { history } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';

const InternalServerErrorPage: React.FC = () => (
  <Result
    status="500"
    title="500"
    style={{
      background: 'none',
    }}
    subTitle="Sorry, the server is reporting an error."
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        Back Home
      </Button>
    }
  />
);

export default InternalServerErrorPage;
