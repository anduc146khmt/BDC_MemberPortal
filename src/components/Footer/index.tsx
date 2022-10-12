import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none'
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'AI Scheduling Portal',
          title: 'Member Portal',
          href: 'https://jira.hpcc.vn/secure/PortfolioPlanView.jspa?id=12&sid=12#backlog',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://git.hpcc.vn/projects/LVDHAISCHEDPORTAL',
          blankTarget: true,
        },
        {
          key: 'High Performance Computing Lab',
          title: 'HPC Lab',
          href: 'https://hpcc.vn/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
