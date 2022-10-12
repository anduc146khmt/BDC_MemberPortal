import { Card, Input, List, Progress, Radio } from 'antd';
import type { FC } from 'react';
import { useState } from 'react';

import { SyncOutlined } from '@ant-design/icons';
import { GridContent } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { queryNodeList } from './api';
import styles from './style.less';
import type { ItemNode } from './typings';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

const ListContent = ({ data: { detail, cpu_gpu, memory, jobs } }: { data: ItemNode }) => {
  const cpuUsage = (cpu_gpu.used / cpu_gpu.total) * 100;
  const memoryUsage = (memory.used / memory.total) * 100;
  const cpuUsageColor = cpuUsage > 75 ? '#FF4D4F' : '#48A7FF';
  const memoryUsageColor = memoryUsage > 75 ? '#FF4D4F' : '#48A7FF';
  return (
    <div className={styles.listContent}>
      <div className={styles.listContentItem}>
        <span>{detail.status}</span>
        <br />
        <span>{detail.comment}</span>
      </div>
      <div className={styles.listContentItem}>
        <span style={{ color: '#1fc5c5' }}>Jobs: </span>
        <span style={{ fontWeight: 'bold' }}>{jobs}</span>
      </div>
      <div className={styles.listContentItem}>
        <span style={{ marginRight: '10px', color: '#1fc5c5' }}>CPU & GPU</span>
        <Progress
          strokeColor={cpuUsageColor}
          percent={cpuUsage}
          strokeWidth={6}
          style={{ width: 180 }}
        />
      </div>
      <div className={styles.listContentItem}>
        <span style={{ marginRight: '10px', color: '#1fc5c5' }}>Memory</span>

        <Progress
          strokeColor={memoryUsageColor}
          percent={memoryUsage}
          strokeWidth={6}
          style={{ width: 180 }}
        />
      </div>
    </div>
  );
};

export const BasicList: FC = () => {
  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 5,
  };

  const [refresh, setRefresh] = useState(false);

  const { data, loading } = useRequest(
    () => {
      return queryNodeList();
    },
    { refreshDeps: [refresh] },
  );

  const extraContent = (
    <div className={styles.extraContent}>
      <RadioGroup defaultValue="all">
        <RadioButton value="all">All</RadioButton>
        <RadioButton value="progress">In Progress</RadioButton>
        <RadioButton value="waiting">Waiting</RadioButton>
      </RadioGroup>
      <Search
        className={styles.extraContentSearch}
        placeholder="Still not working"
        onSearch={() => ({})}
      />
      <SyncOutlined
        style={{ marginLeft: '15px', marginRight: '30px' }}
        onClick={() => setRefresh(!refresh)}
      />
    </div>
  );

  return (
    <div>
      <GridContent>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <List
              size="large"
              rowKey="node"
              loading={loading}
              pagination={paginationProps}
              dataSource={data}
              renderItem={(item) => {
                return (
                  <List.Item>
                    <List.Item.Meta title={<span style={{ fontSize: '16px' }}>{item.node}</span>} />
                    <ListContent data={item} />
                  </List.Item>
                );
              }}
            />
          </Card>
        </div>
      </GridContent>
    </div>
  );
};

export default BasicList;
