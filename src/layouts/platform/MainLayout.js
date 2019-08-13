
import React from 'react'
import { connect } from 'dva/index'
import classnames from 'classnames'
import { MenuList } from './menu';
import Header from './header'
import Footer from './footer'
import Sider from './sider'
import styles from './main.less'
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';



class App extends React.Component {
    componentDidMount() {
    //   this.props.dispatch({ type: 'app/loadAllTag' })
    //   this.props.dispatch({ type: 'app/loadAllColumns' })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { login } = nextProps.main
        if (login) {
            clearInterval(this.interval)
            this.interval = null
        }
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval)
        }
    }

    render() {
        const { children, dispatch, location, main } = this.props
        const { login, user, siderFold, darkTheme, isNavbar, menuPopoverVisible } = main // qrUuid
        // const loginProps = {
        //   qrUuid,
        // }
        const headerProps = {
            user,
            siderFold,
            location,
            isNavbar,
            menuPopoverVisible,
            switchMenuPopover() {
                dispatch({ type: 'app/switchMenuPopver' })
            },

            logout() {
                dispatch({ type: 'app/logout' })
            },

            switchSider() {
                dispatch({ type: 'app/switchSider' })
            },
        }
        const siderProps = {
            siderFold,
            darkTheme,
            location,
            changeTheme() {
                dispatch({ type: 'app/changeTheme' })
            },
            tags: user.roles,
        }
        // const hostname = window.location.hostname

        return ( // eslint-disable-line
          <LocaleProvider locale={zhCN}>
            <div className={classnames(styles.layout, { [styles.fold]: isNavbar ? false : siderFold }, { [styles.withnavbar]: isNavbar })}>
                {
                    !isNavbar ? <aside
                        className={classnames(styles.sider, { [styles.light]: !!darkTheme })}
                    >
                        <Sider {...siderProps} />
                    </aside> : ''
                }
                <div
                    className={
                        classnames({ [styles.main]: !!styles.main, 'sfy-main': true })
                    }
                >
                    <Header {...headerProps} />
                    {/* <Bread location={location} /> */}
                    <div className={styles.container}>
                        <div className={styles.content}>
                            <ContentTitle title={MenuList.find(m => m.key === location.pathname)['name']} />
                            {children}
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
          </LocaleProvider>
        )
    }
}

const ContentTitle = ({ title }) => <h1>{title}</h1>


export default connect(({ main }) => ({ main }))(App)
