import { history } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';

const NotAuthorizedPage: React.FC = () => (
  <Result
    status="403"
    title="403"
    style={{
      background: 'none',
    }}
    subTitle="Sorry, you don't have access to this page."
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        Back Home
      </Button>
    }
  />
);

export default NotAuthorizedPage;
