import React from 'react';
import { Card, Col, Row } from 'antd';

const Dashboard = () => (
  <>
  
    <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#1890ff' }}>{} Dashboard</h1>
    <Row gutter={16} justify="center">
      <Col span={8}>
        <Card title="Card 1" variant="borderless" style={{ backgroundColor: '#e6f7ff' }}>
          Card content
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Card 2" variant="borderless" style={{ backgroundColor: '#e6f7ff' }}>
          Card content
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Card 3" variant="borderless" style={{ backgroundColor: '#e6f7ff' }}>
          Card content
        </Card>
      </Col>
    </Row>

    {/* Bottom Row - 4 Cards (2x2 Layout) */}
    <Row gutter={16} justify="center" style={{ marginTop: 16 }}>
      <Col span={12}>
        <Card title="Card 4" variant="borderless" style={{ backgroundColor: '#f9f0ff' }}>
          Card content
        </Card>
      </Col>
      <Col span={12}>
        <Card title="Card 5" variant="borderless" style={{ backgroundColor: '#f9f0ff' }}>
          Card content
        </Card>
      </Col>
    </Row>

    <Row gutter={16} justify="center" style={{ marginTop: 16 }}>
      <Col span={12}>
        <Card title="Card 6" variant="borderless" style={{ backgroundColor: '#f9f0ff' }}>
          Card content
        </Card>
      </Col>
      <Col span={12}>
        <Card title="Card 7" variant="borderless" style={{ backgroundColor: '#f9f0ff' }}>
          Card content
        </Card>
      </Col>
    </Row>
  </>
);

export default Dashboard;
