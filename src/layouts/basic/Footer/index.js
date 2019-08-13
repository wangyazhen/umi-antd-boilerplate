
import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '../../components/GlobalFooter';

const { Footer } = Layout;

const copyright = "2019 drcus 王亚振"

const FooterView = () => (
    <Footer style={{ padding: 0 }}>
        <GlobalFooter
              links={[
                {
                  key: 'UmiJS 首页',
                  title: 'UmiJS 首页',
                  href: 'https://umijs.org/zh/',
                  blankTarget: true,
                },
                {
                  key: 'github',
                  title: <Icon type="github" />,
                  href: 'https://github.com/wangyazhen',
                  blankTarget: true,
                },
                {
                  key: 'Ant Design',
                  title: 'Ant Design',
                  href: 'https://ant.design',
                  blankTarget: true,
                },
              ]}
            copyright={
                <Fragment>
                    Copyright <Icon type="copyright" /> {copyright}
                </Fragment>
            }
        />
    </Footer>
);
export default FooterView;
