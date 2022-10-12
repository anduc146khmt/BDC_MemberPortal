import type { ColumnsState, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { GridContent, ProDescriptions } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Drawer } from 'antd';
import { isBoolean, isString } from 'lodash';
import React, { useRef, useState } from 'react';
import type { ItemJob } from '../JobsList/typings';
import { queryQueueJobsList, queryQueuesList } from './api';
import type { ItemQueue, TableListPagination } from './typings';

const QueueList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<ItemQueue>();

  const columns: ProColumns<ItemQueue>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: 'Enabled',
      dataIndex: 'enabled',
      valueEnum: {
        false: {
          text: 'No',
          status: 'Error',
        },
        true: {
          text: 'Yes',
          status: 'Success',
        },
      },
      filters: true,
      onFilter(value, record) {
        if (isString(value)) {
          let compareVal;
          if (value === 'true') compareVal = true;
          else compareVal = false;
          return record.enabled === compareVal;
        } else if (isBoolean(value)) {
          return record.enabled === value;
        } else return false;
      },
    },
    {
      title: 'Max CPUs',
      dataIndex: 'max_CPU',
      renderText: (val: number) => (val ? `${val}` : '-'),
    },
    {
      title: 'Max Memory',
      dataIndex: 'max_memory',
      renderText: (val: number) => (val ? `${val} GB` : '-'),
    },
    {
      title: 'Max Walltime',
      dataIndex: 'max_walltime',
      renderText: (val: number) => (val ? `${val} s` : '-'),
    },
    {
      title: 'Max run',
      dataIndex: 'max_run',
      renderText: (val: number) => (val ? `${val}` : '-'),
    },
    {
      title: 'Job running',
      dataIndex: 'job_running',
    },
    {
      title: 'Job state',
      dataIndex: 'job_state',
      renderText: (val?: { q: number; r: number }) => `Q = ${val?.q || '-'}, R = ${val?.r || '-'}`,
    },
  ];

  const columnsJobOfQueue: ProColumns<ItemJob>[] = [
    {
      title: 'Job ID',
      dataIndex: 'id',
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
      <ProTable<ItemQueue, TableListPagination>
        actionRef={actionRef}
        // rowKey="name"
        search={false}
        request={queryQueuesList}
        columns={columns}
      />
      <Drawer
        width={800}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        <ProDescriptions<ItemQueue>
          column={2}
          title={currentRow?.name}
          request={async () => ({
            data: currentRow || {},
          })}
          params={{
            id: currentRow?.name,
          }}
          columns={columns as ProDescriptionsItemProps<ItemQueue>[]}
        />
        <ProTable<ItemJob, TableListPagination>
          actionRef={actionRef}
          rowKey="key"
          search={false}
          request={queryQueueJobsList}
          columns={columnsJobOfQueue}
          columnsState={{
            value: columnsStateMap,
            onChange: setColumnsStateMap,
          }}
        />
      </Drawer>
    </GridContent>
  );
};

export default QueueList;
