/**
 * @author drcus
 * @email 603684240@qq.com
 * @version  1.0.0
 * @description
 */
import { Component } from 'react';
import { Layout } from 'antd';
import MyFooter from './Footer';
import styles from './index.less';

const {
    Footer, Content,
} = Layout;
class Index extends Component {
    render() {
        const { children } = this.props;
        return (
            <Layout className={styles.container}>
                <Content className={styles.content}>
                    {children}
                </Content>
                <Footer>
                    <MyFooter />
                </Footer>
            </Layout>
        );
    }
}
export default Index;