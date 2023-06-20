/*
 * @Description: 
 */

import { Divider, Menu, Switch, Breadcrumb,  theme, Layout, Slider, } from 'antd';
import { Button, Dropdown , Form, Input} from 'antd';
import React, { useEffect, useState, useRef } from 'react';

import Sider from 'antd/es/layout/Sider';
import { ConfigProvider } from 'antd';  
const { Content } = Layout;

const Meta2dContainer = (props) => {
  const [test_list, set_test_list] = useState('')
  const [test_info, setTest_info] = useState('设置')
  const [first, set_first] = useState(true)
  const [stay, setStay] = useState(true)
  const [pos_x, setPosX] = useState(0.1)
  const [test, setTest] = useState(0.1)
  const [pos_y, setPosY] = useState(0.1)
  const items_navs = [
    {
      key:'1',
      label: 'test'
    }
  ];

  const pos_x_Ref = useRef(0); // 设置初值
  pos_x_Ref.current = pos_x;
  const pos_y_Ref = useRef(0); // 设置初值
  pos_y_Ref.current = pos_y;

  // 右键菜单


  const showContextMenu = (e, client_rect) => { 
    // 右键模型之后，显示接口，并提供添加接口的功能
    const pen = meta2d.store.active[0];
    console.log('ok', e, client_rect);

    props.set_cur_right_side_tab('edit');
    const onFinish = (res) => {
      setPosX(res.pos_x);
      setPosY(res.pos_y);
      console.log('res',res, pos_x_Ref.current, pos_y_Ref.current );

      // todo 接口中文名字的长度以及高度问题，高度不够，长度需要*2
      const new_interface = {
        name: 'interface_part',
        text: 'interface test',
        width: 10,
        height: 15,
      }

      const w = res.name.length * 9;
      const h = 15;
      new_interface.text = res.name;
      new_interface.width = w;
      new_interface.x = pen.x + pen.width * pos_x_Ref.current - w/2;
      new_interface.y = pen.y + pen.height * pos_y_Ref.current - h/2;
      console.log('here1', new_interface,pen);
      meta2d.pushChildren(pen, [new_interface]);
      console.log('here2', new_interface,pen);
      // window.meta2d.addPen(pen_text);
      meta2d.render();
      meta2d.inactive();
      meta2d.store.active[0] = pen;
      showContextMenu(e, client_rect);
    }
    const onFinishFailed = () => {}
    const lists = (
      (meta2d.store.active == 0) ? '请右键点击组件' :
      <>
        {
        }
        <div> 接口：</div> <hr />
        {
        }

        <Form id='myForm'
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="接口"
            name="name"
            rules={[{ required: true, message: '请输入完整' }]}
          >
            <Input id='test' placeholder="输入接口名字" />
          </Form.Item>
          <Form.Item
            label="x坐标"
            name="pos_x"
            rules={[{ required: true, message: '请输入完整' }]}
          >
            <Input id='x' placeholder="相对坐标please" />
          </Form.Item>
          <Form.Item
            label="y坐标"
            name="pos_y"
            rules={[{ required: true, message: '请输入完整' }]}
          >
            <Input id='y' placeholder="相对坐标please" />
          </Form.Item>
        </Form>

        <Button form="myForm" key="submit" htmlType="submit">
          添加接口
        </Button>
      </>
    )
    console.log('lists', lists)
  };

  const item_navs = [
    {
      label: 
        <p onClick={() => meta2d.fitView()} 
         className={'vertical-text'}
        >
          自适应界面
        </p> , 
      key: '1',
    }, {
      label: 
        <p onClick={() => meta2d.centerView()} >
          居中显示
        </p> ,
      key: '2',
    }, {
      label: 
        <p onClick={() => meta2d.toggleAnchorMode()} >
            添加锚点
        </p> ,
      key: '3',
    }, {
      label: 
        <p onClick={() => meta2d.downloadPng('test.png')} >
          生成 png 图像
        </p> ,
      key: '4',
    }, {
      label: 
        <p onClick={() => { } } >
        </p>,
      key: '5',
    }, {
      label: 
        <p onClick={() => 
          {
          }
        } >
          调整画布
        </p> ,
      key: 'resize'
    }, {
      label: 

        <p onClick={() => { } } >
          {test_info}
        </p> ,
      key: 'test_options'
    }, {
      label: <p onClick={ () => { }}> 网格开关</p>,
      key: 'grid-set',
    }, 
    {
      label: <Slider defaultValue={30} 
        onChange={(value) => { }}
      />,
      key: 'gridSize'
    }, 
    {
      label: <>
        拓扑层级
        </>,
      key: 'topo'
    }, 
    {
      label: <>
        待定
        </>,
      key: 'remain'
    }, 
  ]

  const [collapsed, setCollapsed] = useState(true);
  return (
    <>
    <Sider width={150} 
      theme={props.global_theme}
      collapsible 
      collapsed={collapsed} 
      onCollapse={(value) => setCollapsed(value) }
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
      style={{ 
          'height': 'calc(100vh - 64px)',
          left: 0,
      }}
    >
    <ConfigProvider
        theme={{
          algorithm: props.global_theme == 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
          token: {
          },
        }}
      >
    <Menu theme={'light'} 
    defaultSelectedKeys={['主界面']} items={item_navs} selectable={false}
    />
    </ConfigProvider>
  </Sider>
    <Content 
      onMouseOver={() => setStay(true)}
    >
      <div id="meta2d11"
        style={{
          'height': 'calc(100vh - 64px)',
          'width': '72vw',
          'background-color': `${props.global_theme == 'light' ? 'rgb(244,244,244)' : 'rgb(11,11,11)'}`
        }}
      >
      </div>
    </Content>
</>
  );
};

export default Meta2dContainer;