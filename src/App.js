import React from "react";

import { Draggable, Droppable } from "react-drag-and-drop";

import { objects1, objects2 } from "./data.js";

const MyCanvas = ({ list }) => {
  return (
    <div
      width={300}
      height={300}
      style={{
        position: "relative",
      }}
    >
      {list.map(({ Color, ID, Position }) => (
        <Draggable
          type="appointment"
          data={ID}
          key={ID}
          style={{
            position: "absolute",
            left: Position.x,
            top: Position.y,
            width: 20,
            height: 20,
            background: Color,
            borderRadius: "0.5em",
          }}
        ></Draggable>
      ))}
    </div>
  );
};

const DraggableList = ({ list }) => {
  return (
    <div
      style={{
        fontSize: "1rem",
      }}
    >
      <div
        style={{
          color: "gray",
          marginLeft: 8,
          paddingLeft: 5,
        }}
      >
        Color
      </div>
      {list.map(({ Color, ID }) => (
        <Draggable type="item" data={ID} key={ID}>
          <div
            style={{
              marginTop: 4,
              borderBottom: 0,
              borderTop: 0,
              borderRight: 0,
              borderLeft: 8,
              borderColor: "gray",
              borderStyle: "solid",
              paddingLeft: 5,
            }}
          >
            {Color}
          </div>
        </Draggable>
      ))}
    </div>
  );
};

function App() {
  const [list1, setList1] = React.useState(objects1);
  const [list2, setList2] = React.useState(objects2);

  const onAppointmentDrop = (data) => {
    const index = list1.findIndex(
      (item) => item.ID === parseInt(data.appointment, 10)
    );
    if (index >= -1) {
      setList2([...list2, list1[index]]);
      const newList1 = [...list1];
      newList1.splice(index, 1);
      setList1(newList1);
    }
  };

  const onItemDrop = (data) => {
    const index = list2.findIndex(
      (item) => item.ID === parseInt(data.item, 10)
    );
    if (index >= -1) {
      setList1([
        ...list1,
        {
          ...list2[index],
          Position: {
            x: 20,
            y: 20,
          },
        },
      ]);
      const newList2 = [...list2];
      newList2.splice(index, 1);
      setList2(newList2);
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "300px 1fr",
      }}
    >
      <div>
        <Droppable
          types={["item"]}
          onDrop={onItemDrop}
          style={{
            width: 300,
            height: 300,
          }}
        >
          <MyCanvas list={list1} />
        </Droppable>
      </div>
      <div>
        <Droppable types={["appointment"]} onDrop={onAppointmentDrop}>
          <DraggableList list={list2} />
        </Droppable>
      </div>
    </div>
  );
}

export default App;

/*
          <DataGrid
          id="dataGrid"
          dataSource={store}
          keyExpr="ID"
          defaultColumns={columns}
          showBorders={true}
        >
          <RowDragging
            group={draggingGroupName}
            onAdd={onAdd}
            onRemove={onRemove}
            onDrop={onRowDrop}
          />
        </DataGrid> 
*/
