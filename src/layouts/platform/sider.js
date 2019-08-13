import React from 'react'
import { Icon, Switch } from 'antd'
import styles from './main.less'
import Menus from './menu'


function Sider({ siderFold, darkTheme, location, changeTheme, tags }) {
  const menusProps = {
    siderFold,
    darkTheme,
    location,
    tags,
    handleClickNavMenu: (e) => {
      document.title = `财联社-${e.domEvent.target.innerText}`;
    }
  }
  return (
    <div>
      <div className={styles.logo}>
         <img src="https://www.yazhen.me/static/header_logo-c01997c4d501caa683edb6bc03603027.png" />
        {siderFold ? '' : <span>AntD Pro</span>}
      </div>
      <Menus {...menusProps} />
       {!siderFold ? <div className={styles.switchtheme}>
       <span><Icon type='bulb' />切换主题</span>
       <Switch onChange={changeTheme} defaultChecked={darkTheme} checkedChildren='黑' unCheckedChildren='白' />
       </div> : ''}
    </div>
  )
}
export default Sider
