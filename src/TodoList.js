import React, { useState, useEffect } from "react";

export default function TodoList() {
  // Add a redo button to restore a task which is accidently marked as Done;
  // Add a search bar to search tasks

  // task is used to store new task content
  const [task, setTask] = useState("");
  // items store all tasks while itemShow store filtered tasks
  const [items, setItems] = useState([]);
  const [itemShow, setItemShow] = useState([]);
  // filterItemBtn stores filter types
  const [filterItemBtn, setFilterItemBtn] = useState("");
  // inCompleteNum stores incomplete task number
  const [inCompleteNum, setInCompleteNum] = useState(0);

  useEffect(() => {
    let newList = items.filter((i) => {
      return i.isDone === false;
    });
    setInCompleteNum(newList.length);
  }, [items, itemShow]);

  // filter buttons
  function showAllBtn() {
    setItemShow(items);
    setFilterItemBtn("All");
  }
  function showIncompleteBtn() {
    let newList = items.filter((i) => {
      return i.isDone === false;
    });
    setItemShow(newList);
    setFilterItemBtn("Incomplete");
  }
  function showCompleteBtn() {
    let newList = items.filter((i) => {
      return i.isDone === "Done";
    });
    setItemShow(newList);
    setFilterItemBtn("Done");
  }
  // todos
  function handleInput(e) {
    if (task.length !== 0) {
      let newTask = {
        content: task,
        prevValue: "",
        key: Date.now(),
        isEdit: false,
        isDone: false
      };
      setItems(items.concat(newTask));
      setItemShow(itemShow.concat(newTask));
      setTask("");
    }

    e.preventDefault();
  }
  function handleTask(item) {
    return (
      <li key={item.key}>
        <input
          className="taskname"
          value={item.content}
          style={{ display: item.isEdit === true ? "inline-block" : "none" }}
          type="text"
          onChange={(e, key) => handleChange(e, item.key)}></input>
        <button
          className="taskname"
          onClick={(key) => completeMark(item.key)}
          style={{
            textDecoration: item.isDone === "Done" ? "line-through" : "none",
            display: item.isEdit === false ? "inline-block" : "none"
          }}>
          {item.content}
        </button>

        <button
          disabled={item.isDone === "Done" ? true : false}
          style={{ display: item.isEdit === true ? "none" : "inline-block" }}
          onClick={(key) => handleEdit(item.key)}>
          Edit
        </button>

        <button
          style={{ display: item.isEdit === false ? "none" : "inline-block" }}
          onClick={(key) => handleSave(item.key)}>
          Save
        </button>

        <button
          style={{ display: item.isEdit === false ? "none" : "inline-block" }}
          onClick={(key) => handleCancel(item.key)}>
          Cancel
        </button>

        <button onClick={(e, key) => handleDelete(e, item.key)}>Delete</button>
        <button
          disabled={item.isDone === false ? true : false}
          style={{ backgroundColor: "rgba(255, 189, 110, 0.8)" }}
          onClick={(e, key) => handleRedo(e, item.key)}>
          Redo
        </button>
      </li>
    );
  }
  // change existing task content
  function handleChange(e, key) {
    let newListShow = itemShow.filter((i) => {
      if (i.key === key) {
        i.content = e.target.value;
      }
      return i;
    });
    setItemShow(newListShow);
  }
  // operate on each existing task
  function completeMark(key) {
    let newList = itemShow.filter((i) => {
      if (i.key === key) {
        i.isDone = "Done";
      }
      return i;
    });
    setItemShow(newList);
  }
  function handleEdit(key) {
    let newListShow = itemShow.filter((i) => {
      if (i.key === key) {
        i.isEdit = true;
        i.prevValue = i.content;
      }
      return i;
    });
    setItemShow(newListShow);
  }
  function handleSave(key) {
    let newListShow = itemShow.filter((i) => {
      if (i.key === key) {
        i.prevValue = "";
        i.isEdit = false;
      }
      return i;
    });
    setItemShow(newListShow);
  }
  function handleCancel(key) {
    let newListShow = itemShow.filter((i) => {
      if (i.key === key) {
        i.content = i.prevValue;
        i.prevValue = "";
        i.isEdit = false;
      }
      return i;
    });
    setItemShow(newListShow);
  }
  function handleDelete(e, key) {
    let newList = items.filter((i) => {
      return i.key !== key;
    });
    let newListShow = itemShow.filter((i) => {
      return i.key !== key;
    });
    setItems(newList);
    setItemShow(newListShow);
    e.preventDefault();
  }
  function handleRedo(e, key) {
    let newListShow = itemShow.filter((i) => {
      if (i.key === key) {
        i.isDone = false;
      }
      return i;
    });
    setItemShow(newListShow);
  }

  // search todos
  function showSearched(e) {
    let filteredItems = items.filter((item) => {
      if (
        e.target.value === "" ||
        item.content.toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        return item;
      }
      return null;
    });

    setItemShow(filteredItems);
  }
  return (
    <div>
      {/* enter tasks */}
      <form
        onSubmit={(e) => {
          handleInput(e);
        }}>
        <input
          placeholder="Enter a new task here"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}></input>
        <input type="submit" value="Add"></input>
      </form>
      {/* filter buttons */}
      <div>
        <button
          style={{
            backgroundColor:
              filterItemBtn === "All" ? "red" : "rgba(125, 213, 155, 0.8)"
          }}
          className="filterBtn"
          onClick={() => showAllBtn()}>
          All
        </button>

        <button
          style={{
            backgroundColor:
              filterItemBtn === "Incomplete"
                ? "red"
                : "rgba(125, 213, 155, 0.8)"
          }}
          className="filterBtn"
          onClick={() => showIncompleteBtn()}>
          Incomplete
        </button>

        <button
          style={{
            backgroundColor:
              filterItemBtn === "Done" ? "red" : "rgba(125, 213, 155, 0.8)"
          }}
          className="filterBtn"
          onClick={() => showCompleteBtn()}>
          Done
        </button>
      </div>
      {/* display tasks based on condition */}
      <ul className="theList">{itemShow.map((item) => handleTask(item))}</ul>
      {/* search bar and status message*/}
      <form onSubmit={(e) => e.preventDefault()} className="searchBar">
        <input
          type="search"
          placeholder={
            items.length > 0 ? "Search a task here" : "No todos here..."
          }
          onChange={(e) => showSearched(e)}
        />
        <span className="task-counter">
          <i>{inCompleteNum}</i> remaining out of <b>{items.length}</b> tasks
        </span>
      </form>
    </div>
  );
}
