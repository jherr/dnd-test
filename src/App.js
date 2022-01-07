import React from "react";

import DataGrid, { RowDragging } from "devextreme-react/data-grid";
import ArrayStore from "devextreme/data/array_store";

import { objects1, objects2 } from "./data.js";

const columns = ["Color"];
const draggingGroupName = "appointmentsGroup";

const w = 20;
const h = 20;

const store = new ArrayStore({
  data: objects2,
  key: "ID"
});

const MyCanvas = () => {
  return (
    <div width={300} height={300}>
      {objects1.map(({ Color, ID, Position }) => (
        <div
          key={ID}
          style={{
            position: "absolute",
            left: Position.x,
            top: Position.y,
            width: w,
            height: h,
            background: Color
          }}
        ></div>
      ))}
    </div>
  );
};

function App() {
  const [list, setList] = React.useState(objects1);

  const onAdd = React.useCallback(
    (e) => {
      const index = list.indexOf(e.fromData);

      if (index >= 0) {
        var newList = JSON.parse(JSON.stringify(list));
        newList.splice(index, 1);
        setList(newList);

        store.push([
          {
            type: "insert",
            data: e.itemData,
            index: e.toIndex
          }
        ]);
      }
    },
    [list]
  );

  const onRemove = React.useCallback(
    (e) => {
      if (e.fromIndex >= 0) {
        var newList = JSON.parse(JSON.stringify(list));
        newList.push(e.itemData);
        setList(newList);

        store.push([
          {
            type: "remove",
            key: e.itemData.ID
          }
        ]);
      }
    },
    [list]
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row"
      }}
    >
      <MyCanvas />
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
        />
      </DataGrid>
    </div>
  );
}

export default App;
