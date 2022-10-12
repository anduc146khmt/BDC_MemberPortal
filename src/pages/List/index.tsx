import { PageContainer } from '@ant-design/pro-components';
import { Radio } from 'antd';
import React, { Suspense } from 'react';
import JobsList from './component/JobsList';
import NodesList from './component/NodesList';
import QueuesList from './component/QueuesList';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const Dashboard: React.FC = () => {
  const [selected, setSelected] = React.useState('nodes');

  const onChange = (event: any) => {
    setSelected(event.target.value);
  };
  return (
    <PageContainer title={false}>
      <RadioGroup value={selected} onChange={onChange}>
        <RadioButton value="nodes">Nodes</RadioButton>
        <RadioButton value="queues">Queues</RadioButton>
        <RadioButton value="jobs">Jobs</RadioButton>
      </RadioGroup>
      <Suspense fallback={null}>
        {selected === 'nodes' && <NodesList />}
        {selected === 'queues' && <QueuesList />}
        {selected === 'jobs' && <JobsList />}
      </Suspense>
    </PageContainer>
  );
};

export default Dashboard;
