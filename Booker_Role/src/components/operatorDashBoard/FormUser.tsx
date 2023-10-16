import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import React from 'react';
import { Avatar, List, Space } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';

const data = Array.from({ length: 23 }).map((_, i) => ({
  href: 'https://ant.design',
  title: `ant design part ${i}`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const FormUser: React.FC = () => {
  return (
    <div>
      <h1>List Form </h1>
      <List
  style={{border:'2px solid'}}
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 3,
      
    }}
    
    dataSource={data}
    
    renderItem={(item) => (
      
      
      <List.Item
        
        
        
        key={item.title}
       
        extra={
          <img
            width={320}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
      
    )}
  />
    </div>
  )
};

export default FormUser;