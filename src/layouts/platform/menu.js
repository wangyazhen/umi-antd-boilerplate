import React from 'react'
import { Menu, Icon } from 'antd'
import Link from 'umi/link'

export const MenuList = [
  {key: '/', name: '首页', icon: 'dashboard'},
  {key: '/login', name: '登录'},
  {key: '/user', name: '用户管理', icon: 'user'},
];

function fixedMenu() {
  return MenuList.map(item => (
      <Menu.Item key={item.key}>
        <Link to={item.key}>
          {item.icon ? <Icon type={item.icon} /> : ''}
          {item.name}
        </Link>
      </Menu.Item>
  ))
}

function Menus({ siderFold, location, isNavbar, handleClickNavMenu }) {
  const menuItems = fixedMenu()
  return (
    <Menu
      mode={siderFold ? 'vertical' : 'inline'}
      theme={'dark'}

      onClick={handleClickNavMenu}
      defaultOpenKeys={isNavbar ? menuItems.map(item => item.key) : []}
      defaultSelectedKeys={[location.pathname.split('/')[location.pathname.split('/').length - 1] || 'reference']}
    >
      {menuItems}
    </Menu>
  )
}

export default Menus
