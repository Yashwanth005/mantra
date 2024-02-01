import React, { useState } from 'react';
import { DatePicker, Table } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const App = () => {
  const [data, setData] = useState([]);

  
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <DatePicker defaultValue={text} disabledDate={(current) => current && current < moment().endOf('day')} />,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a>Edit</a>
          <a>Delete</a>
        </span>
      ),
    },
  ];

  const onDragEnd = (result) => {
   
  };

  return (
    <div>
      <DatePicker defaultValue={moment()} disabledDate={(current) => current && current < moment().endOf('day')} />
      <Table dataSource={data} columns={columns} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="items">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {data.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      {item.title}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
