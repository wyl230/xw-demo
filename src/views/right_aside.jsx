import React, { useCallback, useEffect } from 'react';
import { icons, interfaces } from '../utils/data';
import { hardware_properties } from '../utils/data';
import { component_properties, components } from '../utils/data';
import { Button, Modal, Popover, Tabs } from 'antd';
import { Avatar, List, Skeleton } from 'antd';
import { Card } from 'antd';
import {useState } from 'react';
import { Col, Row } from 'antd';
// import Animate from 'rc-animate';
import QueueAnim from 'rc-queue-anim';
import { ConfigProvider } from 'antd';

// use imgs
// import logo from "../assets/images/hya.png"
// <img src={logo} alt="" />
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme, Input } from 'antd';
const { Search } = Input;

const { Panel } = Collapse;

const text = `待定 `;

import { Layout, } from "antd";
const { Sider } = Layout;



const Right_aside = (props) => {
  // panel
  const [back, setBack] = useState(true);
  // useEffect(() => {
  //   set
  // }, [show]);
  useEffect(() => {
    setShow(false);
    // setShow(true);
    setTimeout(() => { setShow(true); }, 100);
  }, [props]);

  const { token } = theme.useToken();

  const panelStyle = {
    marginBottom: 4,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };
  // panel end

  const handleSubmit = (event) => {
    event.preventDefault();

    const search_items = event.target.elements.search_items.value;

    alert(search_items);
  }

  const onSearch = () => {};
  const [collapsed, setCollapsed] = useState(false);


  const [show, setShow] = useState(true);
  const onClick = () => { setShow(!show); }
  const item = [
    {
      name: '名称',
      description: '描述...'
    }
  ];

  const show_properties = () => {
    console.log(props.current_object_properties, 'test')
    return ([
    <p key='test'> 测试属性: {props.value} </p> , 
    <hr key='1hr'/>,
    <p key='testob'> key: {props.current_object} </p>, 
    <hr key='2hr'/> , 
    <div key='whole'>
      {props.current_object_properties.map((item) => {
        return (
          <div key={item}>
            <p key={item}>{item}</p>
            <hr />
          </div>
        )
      })}
    </div>
    ,
    <Input
      addonBefore="硬件功能"
      id='1' placeholder="输入..." />,
    <Input 
      addonBefore="硬件性能"
      id='2' placeholder="输入..." />,
    <hr />,

    hardware_properties.map((property) => {
      return (
        <>
          <p key={property}>{property}： ...</p> 
          <hr />
        </>
      )
    }) 
    ,
    <p key='text'>{text}</p > // only show once
  ])};

  const show_list = () => { 
    return ([
      <div key={'test'}>
        <List
          className="property-list"
          // loading={initLoading}
          itemLayout="horizontal"
          // loadMore={loadMore}
          // dataSource={list}
          style={{ 
            'padding-left': '8%'
          }}
          dataSource={item}
          renderItem={(item) => (
            <List.Item>
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  title={<a href="https://ant.design">{item.name}</a>}
                  description={item.description}
                />
              </Skeleton>
            </List.Item>
          )}
          /> 
      </div>, 
    ])
  }

  const tab_items = [
    {
      key: 'prop',
      label: <> 属性 </>,
      children: 
      <>
        <QueueAnim className="demo-content">
          { show ?  show_list() : null }
        </QueueAnim>

        <form onSubmit={handleSubmit}>
          <div className='search-bar_right'>
            <Search placeholder="搜索组件..." onSearch={onSearch} enterButton />
          </div>
        </form>

      <ConfigProvider
        theme={{
          algorithm: props.global_theme == 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
          token: {
            // colorPrimary: '#00b96b', // green
            // colorPrimary: '#1890ff', // blue
          },
        }}
      >
        <Collapse 
          bordered={false}
          defaultActiveKey={['1']}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          // style={{ background: token.colorBgContainer }}
        >
          <Panel header="硬件模型属性展示" key="1" style={panelStyle}
          >
            <QueueAnim 
              duration={100} interval={10}
              forcedReplay={true}
              className="demo-content"
            >
              {show ? show_properties() : null}
            </QueueAnim>
          </Panel>
          <Panel header="组件模型属性展示" key="2" style={panelStyle}>
            {
              component_properties.map((property) => {
                return (
                  <>
                    <p>{property}： ...</p> 
                    <hr />
                  </>
                )
              })
            }
            <p>{text}</p >
          </Panel>
          <Panel header="模型属性展示 3" key="3" style={panelStyle}>
            <p>{text}</p>
          </Panel>
        </Collapse>
      </ConfigProvider>
      </>
    }, 
    {
      key: 'edit',
      label: <> 修改模型 </>,
      children:
        <>
          <div
            style={{
              'text-align': 'center',
              overflow: 'auto',
            }}
          >
            <Button type="primary" onClick={() => {
              const data = meta2d.store.active[0]
              const json = JSON.stringify(data, undefined, 4);

              const requestOptions = {
                  method: 'POST',
                  headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                  },
                  body: json
              };
              fetch(props.address.ip_address, requestOptions)
              // fetch('http://162.105.85.214:8000/test_interface', requestOptions)
                  .then(response => response.json())
                  .then(data => {
                    console.log('get', data);
                  });
            }}
            >保存模型及接口</Button>
            {
              // todo 这里要提交json给后端
            }
            <p>{props.info}</p>
            <Card className='for_pad_margin'
              title={'提示'}
            > 如果要保存模型，最好确保此时画布中只有一个模块
            </Card>
            <br /> <br /> <br /> <br /> <br /> 
            {/* todo 这里因为插入了props.info，导致滚动不能滚动到底，所以加了几个break */}
          </div>
        </>
    }, 
  ]

  return (
    <ConfigProvider
      theme={{
        // algorithm: theme.darkAlgorithm,
        token: {
          // colorPrimary: '#00b96b', // green
          // colorPrimary: '#1890ff', // blue
        },
      }}
    >
    <Sider theme={props.global_theme} 
      // style={{
      //   height: '10%',
      //   overflow: 'auto',
      // }}
      // width={200} 
      style={{ 
          overflow: 'auto',
          // height: '89.6vh',
          // height: '89.6vh',
          height: 'calc(100vh - 64px)',
          // position: 'fixed',
          left: 0,
      }}
      className='right_aside' 
      collapsible 
      collapsed={collapsed} onCollapse={
        (value) => {
          setCollapsed(value);
          setShow(!value);
        }
      }
      
    >

      <ConfigProvider
        theme={{
          algorithm: props.global_theme == 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
          token: {
            // colorPrimary: '#00b96b', // green
            // colorPrimary: '#1890ff', // blue
          },
        }}
      >
      <Tabs id='tabs'
        defaultActiveKey="1"
        centered
        items={tab_items}
        onChange={(key) => {
          console.log(key);
          // setCur_tab(key);
          props.set_cur_right_side_tab(key);
        }}
        activeKey={props.cur_right_side_tab}
      />
    </ConfigProvider>
    </Sider> 
    </ConfigProvider>
  );
};

export default Right_aside;



