import React, { useState } from 'react';
import { Button, Table, Input } from 'antd';

const Departments = () => {
  console.log('Departments');
  // Employee Data
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', empId: 'EMP001', department: 'HR' },
    { id: 2, name: 'Jane Smith', empId: 'EMP002', department: 'Finance' },
    { id: 3, name: 'Mike Johnson', empId: 'EMP003', department: 'IT' },
    { id: 4, name: 'Emily Davis', empId: 'EMP004', department: 'Marketing' },
  ]);

  // Search State
  const [searchText, setSearchText] = useState('');

  // Handle Search
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Table Columns
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Employee ID', dataIndex: 'empId', key: 'empId' },
    { title: 'Department', dataIndex: 'department', key: 'department' },
  ];

  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '10px' }}>
      {/* Top Section: Search & Add Employee */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        {/* Left: Search Input */}
        <Input
          placeholder="Search Employee"
          style={{ width: '300px' }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {/* Right: Add Employee Button */}
        <Button type="primary">+ Add Employee</Button>
      </div>

      {/* Employee Table */}
      <Table dataSource={filteredEmployees} columns={columns} rowKey="id" />
    </div>
  );
};

export default Departments;
