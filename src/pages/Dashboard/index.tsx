import PageLoading from '@/components/PageLoading';
import { Line, Progress } from '@ant-design/charts';
import { InfoCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Card, Col, Row, Tooltip } from 'antd';
import moment from 'moment';
import { Suspense } from 'react';
import { ChartCard, Field } from './components/Charts';
import Trend from './components/Trend';
import styles from './style.less';

const topColResponsiveProps = {
  xs: 24,
  sm: 24,
  md: 8,
  lg: 8,
  xl: 8,
  style: { marginBottom: 24 },
};

const StatisticChart = ({
  loading,
  systemStatisticData,
}: {
  loading: boolean;
  systemStatisticData: any[];
}) => (
  <Card loading={loading} className={styles.offlineCard} bordered={false} style={{ marginTop: 32 }}>
    {'Line Chart'}
    <div style={{ padding: '0 24px' }}>
      <Line
        height={400}
        data={systemStatisticData}
        xField="date"
        yField="value"
        seriesField="type"
        slider={{
          start: 0,
          end: 1,
        }}
        legend={{
          position: 'top',
        }}
        animation={{
          appear: {
            animation: 'path-in',
            duration: 3000,
          },
          update: {
            animation: 'path-in',
            duration: 2000,
          },
        }}
      />
    </div>
  </Card>
);

const systemStatisticData: any[] = [];
for (let i = 0; i < 10; i += 1) {
  const date = moment(new Date().getTime() + 1000 * 60 * 30 * i).format('HH:mm');
  systemStatisticData.push({
    date,
    type: 'CPU/GPU',
    value: Math.floor(Math.random() * 100),
  });
  systemStatisticData.push({
    date,
    type: 'Memory',
    value: Math.floor(Math.random() * 100),
  });
}

const SystemDetailRow = ({ loading, visitData }: { loading: boolean; visitData: number[] }) => {
  const intl = useIntl();
  console.log(visitData ? visitData[0] : 0);
  return (
    <PageContainer title={false}>
      <Suspense fallback={<PageLoading />}>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              loading={loading}
              bordered={false}
              title={intl.formatMessage({
                id: 'dashboard.system.cpu.title',
              })}
              action={
                <Tooltip
                  title={intl.formatMessage({
                    id: 'dashboard.system.cpu.tooltip',
                  })}
                >
                  <InfoCircleOutlined />
                </Tooltip>
              }
              total="50%"
              footer={
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  <Field
                    label={intl.formatMessage({
                      id: 'dashboard.system.current',
                    })}
                    style={{ marginRight: 40 }}
                    value={50}
                  />
                  <Field
                    label={intl.formatMessage({
                      id: 'dashboard.system.max',
                    })}
                    value={70}
                    unit={intl.formatMessage({
                      id: 'dashboard.system.unit.core',
                    })}
                  />
                </div>
              }
              contentHeight={46}
            >
              <Progress
                height={46}
                percent={0.5}
                color="#13C2C2"
                {...{ size: 8, marker: { value: 0.8, style: { stroke: '#13C2C2' } } }}
              />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              loading={loading}
              bordered={false}
              title={intl.formatMessage({
                id: 'dashboard.system.memory.title',
              })}
              action={
                <Tooltip
                  title={intl.formatMessage({
                    id: 'dashboard.system.memory.tooltip',
                  })}
                >
                  <InfoCircleOutlined />
                </Tooltip>
              }
              total="22%"
              footer={
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  <Field
                    label={intl.formatMessage({
                      id: 'dashboard.system.current',
                    })}
                    style={{ marginRight: 40 }}
                    value={1770}
                  />
                  <Field
                    label={intl.formatMessage({
                      id: 'dashboard.system.max',
                    })}
                    value={7740}
                    unit={intl.formatMessage({
                      id: 'dashboard.system.unit.gb',
                    })}
                  />
                </div>
              }
              contentHeight={46}
            >
              <Progress
                height={46}
                percent={0.22}
                color="#13C2C2"
                {...{ size: 8, marker: { value: 0.8, style: { stroke: '#13C2C2' } } }}
              />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="Current jobs running"
              action={
                <Tooltip title="Current jobs running">
                  <InfoCircleOutlined />
                </Tooltip>
              }
              loading={loading}
              total={() => <>43</>}
              footer={<Field label="Max" value={25} />}
              contentHeight={46}
            >
              <Trend flag="up" style={{ marginRight: 16 }}>
                Increase
                <span className={styles.trendText}>12%</span>
              </Trend>
              <Trend flag="down">
                Decrease
                <span className={styles.trendText}>11%</span>
              </Trend>
            </ChartCard>
          </Col>
        </Row>
      </Suspense>
      <Suspense fallback={null}>
        <StatisticChart loading={loading} systemStatisticData={systemStatisticData} />
      </Suspense>
    </PageContainer>
  );
};

export default SystemDetailRow;
