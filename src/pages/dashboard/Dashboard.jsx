import * as React from 'react';
import { Auth } from 'aws-amplify';
import { withRouter, useHistory } from 'react-router-dom';
import { Layout, Menu, notification } from 'antd';
// import { ClickParam } from 'antd/lib/menu';

/** App Theme */

/** App Constatns */
import { AUTH_USER_TOKEN_KEY } from '../../utils/constants';

const DashBoardContainer = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const history = useHistory();
  const handleLogout = async () => {
    try {
      await Auth.signOut({ global: true }).then(() => {
        localStorage.removeItem(AUTH_USER_TOKEN_KEY);
        history.push('/signin');
      });
    } catch (err) {
      notification.error({ message: err.message });
    }
  };

  return (
    <Layout className="cover" id="app-header">
      <Layout.Sider
        className="cover"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <span>Home</span>
          </Menu.Item>
          <Menu.Item key="2">
            <span>Settings</span>
          </Menu.Item>
          <Menu.Item key="3">
            <button type="button" onClick={(event) => handleLogout(event)}>
              Logout
            </button>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout>
        <Layout.Header style={{ background: 'white', padding: 0 }} />
        <Layout.Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: 'white',
            minHeight: 280,
          }}
        >
          <div className="text-center">
            <h1>Hello world</h1>
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default withRouter(DashBoardContainer);
