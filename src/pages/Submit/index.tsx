import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, message, Popover, Row } from 'antd';

import { ProFormDigit, ProFormTextArea } from '@ant-design/pro-components';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { history, useModel } from '@umijs/max';
import type { FC } from 'react';
import { useState } from 'react';
import styles from './style.less';

type InternalNamePath = (string | number)[];

const fieldLabels = {
  jobName: 'Name',
  requestQueue: 'Queue',
  requestNodes: 'Number of node',
  requestCpuTime: 'CPU time',
  email: 'Email notify',
  defaultWt: 'Default walltime',
  estimatedWt: 'Estimated walltime',
  command: 'Command',
};

interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const SubmitForm: FC<Record<string, any>> = () => {
  const { initialState } = useModel('@@initialState');

  const [error, setError] = useState<ErrorField[]>([]);

  const [readOnly, setReadOnly] = useState<boolean>(false);

  const [predicted, setPredicted] = useState<boolean>(false);

  const [defaultWalltime, setDefaultWalltime] = useState<number>(0);

  const [name, setName] = useState<string>('');
  const [queue, setQueue] = useState<string>('');
  const [nodes, setNodes] = useState<number>(1);
  const [cpuTime, setCpuTime] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  const [estimatedWalltime, setEstimatedWalltime] = useState<number>(0);
  const [command, setCommand] = useState<string>('');

  console.log(estimatedWalltime);

  const getErrorInfo = (errors: ErrorField[]) => {
    const errorCount = errors.filter((item) => item.errors.length > 0).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = (fieldKey: string) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = errors.map((err) => {
      if (!err || err.errors.length === 0) {
        return null;
      }
      const key = err.name[0] as string;
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <CloseCircleOutlined className={styles.errorIcon} />
          <div className={styles.errorMessage}>{err.errors[0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="Error list"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={(trigger: HTMLElement) => {
            if (trigger && trigger.parentNode) {
              return trigger.parentNode as HTMLElement;
            }
            return trigger;
          }}
        >
          <CloseCircleOutlined />
        </Popover>
        {errorCount}
      </span>
    );
  };

  const onValuesChange = (changedValues: any) => {
    console.log(changedValues);
    if (changedValues.name) {
      setName(changedValues.name);
    } else if (changedValues.queue) {
      setQueue(changedValues.queue);
    } else if (changedValues.nodes) {
      setNodes(changedValues.nodes);
    } else if (changedValues.cpuTime) {
      setCpuTime(changedValues.cpuTime);
    } else if (changedValues.walltime) {
      setEstimatedWalltime(changedValues.walltime);
    } else if (changedValues.email) {
      setEmail(changedValues.email);
    } else if (changedValues.command) {
      setCommand(changedValues.command);
    }
  };
  const onFinish = async (values: Record<string, any>) => {
    console.log(values);
    setError([]);
    await waitTime(2000);
    message.success('Run job success');
    history.push('/analysis');
  };

  const onFinishFailed = (errorInfo: any) => {
    setError(errorInfo.errorFields);
  };

  const onReset = () => {
    setReadOnly(false);
  };

  const [loadings, setLoadings] = useState<boolean[]>([]);

  const enterLoading = (index: number) => {
    setPredicted(true);
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
    setDefaultWalltime(200);
  };

  const script = `# Declare a name for this job \n
    #PBS -N ${name} \n
    # Request the queue and node \n
    #PBS -q $ {${queue} ? ${queue} : 'serial'} \n
    #PBS -l nodes=${nodes} \n
    # Request cpu time \n
    #PBS -l cput=${cpuTime}
    #PBS -m bea \n
    # Specify your email address \n
    #PBS -M ${email} \n
    ${command} \n
    exit 0`;

  return (
    <ProForm
      layout="vertical"
      hideRequiredMark
      submitter={{
        render: (_props, dom) => {
          return (
            <FooterToolbar>
              {getErrorInfo(error)}
              {dom}
            </FooterToolbar>
          );
        },
        // searchConfig: {
        //   submitText: intl.formatMessage({
        //     id: 'pages.login.submit',
        //   }),
        // },
      }}
      initialValues={{}}
      onFinish={onFinish}
      onReset={onReset}
      onFinishFailed={onFinishFailed}
      onValuesChange={onValuesChange}
    >
      <PageContainer title={false}>
        {predicted && (
          <Card title="Estimate walltime" className={styles.walltimeCard} bordered={false}>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <ProFormDigit
                  readonly={true}
                  label={fieldLabels.defaultWt}
                  name="default_waltime"
                  initialValue={defaultWalltime}
                  fieldProps={{
                    style: {
                      width: '100%',
                    },
                  }}
                />
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <ProFormDigit
                  label={fieldLabels.estimatedWt}
                  name="walltime"
                  rules={[{ required: true, message: 'Input your walltime estimate' }]}
                  placeholder="Input your walltime estimate"
                  fieldProps={{
                    style: {
                      width: '100%',
                    },
                  }}
                />
              </Col>
            </Row>
          </Card>
        )}
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card title="PBS Config" className={styles.card} bordered={false}>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <ProFormText
                    readonly={readOnly}
                    label={fieldLabels.jobName}
                    name="name"
                    rules={[{ required: true, message: 'Input your job name' }]}
                    initialValue="test"
                    placeholder="Input your job name"
                  />
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <ProFormSelect
                    readonly={readOnly}
                    label={fieldLabels.requestQueue}
                    name="queue"
                    rules={[{ required: true, message: '请选择' }]}
                    initialValue="serial"
                    options={[
                      {
                        label: 'Default',
                        value: 'serial',
                      },
                      {
                        label: 'Node 1',
                        value: 'node1',
                      },
                      {
                        label: 'Node 2',
                        value: 'node2',
                      },
                    ]}
                  />
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <ProFormDigit
                    readonly={readOnly}
                    label={fieldLabels.requestNodes}
                    name="nodes"
                    rules={[{ required: true, message: 'Input request nodes number' }]}
                    placeholder="Input request nodes number"
                    initialValue={1}
                  />
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <ProFormDigit
                    readonly={readOnly}
                    label={fieldLabels.requestCpuTime}
                    name="cput"
                    rules={[{ required: true, message: 'Not empty' }]}
                    placeholder="Input request cpu time"
                    fieldProps={{
                      style: {
                        width: '100%',
                      },
                    }}
                  />
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <ProFormText
                    readonly={readOnly}
                    label={fieldLabels.email}
                    name="email"
                    rules={[{ required: true, message: 'Input your email to get notify' }]}
                    placeholder="Input your email to get notify"
                    initialValue={initialState?.currentUser?.email}
                  />
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xl={14} lg={14} md={14} sm={24} xs={24}>
                  <ProFormTextArea
                    readonly={readOnly}
                    label={fieldLabels.command}
                    name="command"
                    rules={[{ required: true, message: 'Input your command' }]}
                    placeholder="Input your command"
                  />
                </Col>
              </Row>
              <Button type="primary" loading={loadings[1]} onClick={() => enterLoading(1)}>
                Predict
              </Button>
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card title="Script generated" className={styles.card} bordered={false}>
              {/* <p>
                # Declare a name for this job <br />
                #PBS -N ${name} <br />
                # Request the queue and node <br />
                #PBS -q $ {queue ? queue : 'serial'} <br />
                #PBS -l nodes=${nodes} <br />
                # Request cpu time <br />
                #PBS -l cput=${cpuTime}
                #PBS -m bea <br />
                # Specify your email address <br />
                #PBS -M ${email} <br />
                # Specify the execute directory <br />
                cd $PBS_O_WORKDIR <br />
                {command} <br />
                exit 0
              </p> */}
              {script}
            </Card>
          </Col>
        </Row>
      </PageContainer>
    </ProForm>
  );
};

export default SubmitForm;
