import { ColumnsState, GridContent } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import React, { useRef, useState } from 'react';
import { queryJobsList } from './api';
import type { ItemJob, TableListPagination } from './typings';

const QueueList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<ItemJob>[] = [
    {
      title: 'Job ID',
      dataIndex: 'id',
    },
    {
      title: 'Queue',
      dataIndex: 'queue',
    },
    {
      title: 'CPU',
      tip: 'Used | Requested',
      dataIndex: 'cpu',
      renderText: (cpu: { used: number; requested: number }) => `${cpu.used} | ${cpu.requested}`,
    },
    {
      title: 'Memory',
      tip: 'Real used | Virtual used | Requested (GB)',
      dataIndex: 'memory',
      renderText: (memory: { real_used: number; virtual_used: number; requested: number }) =>
        `${memory.real_used} | ${memory.virtual_used} | ${memory.requested}`,
    },
    {
      title: 'Time',
      tip: 'Time used | Walltime (H:M)',
      dataIndex: 'time',
      renderText: (time: { used: number; wall_time: number }) => `${time.used} | ${time.wall_time}`,
    },
    {
      title: 'Time left',
      dataIndex: 'time_left',
      renderText: (time_left: number) => `${time_left}`,
    },
    {
      title: 'Queued at time',
      dataIndex: 'queued_at_time',
      valueType: 'dateTime',
    },
    {
      title: 'Started at time',
      dataIndex: 'started_at_time',
      valueType: 'dateTime',
    },
    {
      title: 'Wait time',
      dataIndex: 'wait_time',
    },
    {
      title: 'State',
      dataIndex: 'job_state',
    },
    {
      title: 'Host',
      dataIndex: 'exec_host',
    },
  ];

  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({
    queued_at_time: {
      show: false,
    },
    started_at_time: {
      show: false,
    },
  });
  return (
    <GridContent style={{ marginTop: '25px' }}>
      <ProTable<ItemJob, TableListPagination>
        actionRef={actionRef}
        rowKey="id"
        search={false}
        request={queryJobsList}
        columns={columns}
        // options={{
        //   search: true,
        // }}
        columnsState={{
          value: columnsStateMap,
          onChange: setColumnsStateMap,
        }}
      />
    </GridContent>
  );
};

export default QueueList;
