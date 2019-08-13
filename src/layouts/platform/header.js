import React from 'react'
import { Menu, Icon, Popover } from 'antd'
import styles from './main.less'
import Menus from './menu'

const SubMenu = Menu.SubMenu
function Header({ user, logout, switchSider, siderFold, isNavbar, menuPopoverVisible, location, switchMenuPopover }) {
  const handleClickMenu = e => e.key === 'logout' && logout()
  const menusProps = {
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
  }
  return (
    <div className={styles.header}>
      {isNavbar
        ? <Popover placement="bottomLeft" onVisibleChange={switchMenuPopover} visible={menuPopoverVisible} overlayClassName={styles.popovermenu} trigger="click" content={<Menus {...menusProps} />}>
          <div className={styles.siderbutton}>
            <Icon type="bars" />
          </div>
        </Popover>
        : <div className={styles.siderbutton} onClick={switchSider}>
          <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
        </div>}
      <Menu className="header-menu" mode="horizontal" onClick={handleClickMenu}>
        <SubMenu
          style={{
            float: 'right',
          }}
          title={< span>
            <img style={{width:25,height:25,marginRight:8 }} src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"/>
            {user.username || '我是传奇'} </span>}
        >
          <Menu.Item key="user">
            <Icon type="user" /> 个人中心
          </Menu.Item>
          <Menu.Item key="edit">
            <Icon type="edit" /> 个人设置
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="logout" onClick={this.props.logout}>
            <Icon type="logout" /> 注销
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  )
}
export default Header
