// 除Header以外的所有部分
import React, { useCallback, useState } from 'react';

import { Layout, } from "antd";
const { Content, Sider } = Layout;
import Left_aside from './left_side/left_aside'
import Right_aside from './right_aside';
import Meta2dContainer from './meta2d';

function Aside(props) {

  const [current_property, setCurrentProperty] = useState('从服务器获取模型');
  const [current_object, setCurrentObject] = useState('undefined');
  const [current_object_properties, setCurrentObjectProperties] = useState([]);
  const [edit_info, setEditInfo] = useState('右键点击要修改的模块');
  const [cur_right_side_tab, setCurRightSideTab] = useState('prop');

  const handleClick = (i) => {
    setCurrentProperty(i);
  }

  const update_current_object = (key, title, data, info) => {
    setCurrentObject(key);
    setCurrentObjectProperties(info);
  }

  const set_edit_info = (v) => {
    console.log('meta2d.store.active', meta2d.store.active);
    setEditInfo(v);
  }

  const set_cur_right_side_tab = (key) => {
    setCurRightSideTab(key);
  }

  const render_left_aside = (i) => {
    return (
      <Left_aside 
        global_theme={props.global_theme}
        value={current_property} 
        current_object={current_object} 
        onClick={(i) => handleClick(i)}
        update_current_object={(key,title,data,info) => update_current_object(key,title,data,info)}
        address={props.address}
        setAddress={props.setAddress}
      />
    )
  }

  const render_right_aside = (i) => {
    return (
        <Right_aside 
          global_theme={props.global_theme}
          value={current_property} 
          current_object={current_object} 
          current_object_properties={current_object_properties}
          info={edit_info}
          cur_right_side_tab={cur_right_side_tab}
          set_cur_right_side_tab={(key) => set_cur_right_side_tab(key)}
          address={props.address}
          setAddress={props.setAddress}
        />
    )
  };

  return (
    <>
      <Layout>
        {render_left_aside(0)}
        <Meta2dContainer 
          global_theme={props.global_theme}
          stay={true}
          info={edit_info}
          set_info={(v) => set_edit_info(v)}
          cur_right_side_tab={cur_right_side_tab}
          set_cur_right_side_tab={(key) => set_cur_right_side_tab(key)}
        />
        {render_right_aside(0)}
      </Layout>
    </>
  )

};

export default Aside;

