import { useState } from "react";
import "./App.css";

class ToDoBlock {
  title: string;
  priority: string;
  category: string;
  completed: boolean;

  constructor(title: string, priority: string, category: string, completed: boolean = false) {
    this.title = title;
    this.priority = priority;
    this.category = category;
    this.completed = completed;
  }
}

// 子コンポーネント: 入力フォーム
function TitleInput({value, onChange}: {value: string; onChange: (v: string) => void;}) {
  return (
    <input
      placeholder="タスク名"
      style={{borderBottomRightRadius: 0, borderTopRightRadius: 0}}
      type=""
      value={value} // 親の state を反映
      onChange={(e) => onChange(e.target.value)} // 親の setState を呼ぶ
    />
  );
}

// 子コンポーネント: ボタン
function AddBtn({ doTitle, option1, option2, list, setDoList }: { doTitle: string, option1: string, option2: string, list: ToDoBlock[], setDoList: (v: ToDoBlock[]) => void;}) {
  const submit = () => {
    setDoList([...list, new ToDoBlock(doTitle, option1, option2)]); // 配列をコピーして新しい要素を追加
  };
  return <button style={{borderBottomLeftRadius: 0, borderTopLeftRadius: 0}} onClick={submit}>追加</button>;
}

// 子コンポーネント: ラジオ
function TaskOption1({ selected, onChange }: { selected: string; onChange: (v: string) => void }) {
  return <div>
          Priority:
          {["高", "中", "低"].map((level) => (
            <label key={level}>
              <input
                type="radio"
                value={level}
                checked={selected === level}
                onChange={(e) => onChange(e.target.value)}
              />
              {level}
            </label>
          ))}
        </div>;
}

function TaskOption2({value, onChange}: {value: string; onChange: (v: string) => void;}) {
  return <label>
          Category
          <select
            value={value} // 選択状態を state で管理
            onChange={(e) => onChange(e.target.value)} // 変更時に更新
          >
            <option value="仕事">仕事</option>
            <option value="趣味">趣味</option>
            <option value="買い物">買い物</option>
          </select>
        </label>;
}

function DoListViewer({list, setDoList, filter}: {list: ToDoBlock[]; setDoList: (v: ToDoBlock[]) => void; filter: string; }) {
  return <ul>
          {list.filter(data => {
            if (filter == "All") return true;
            else if (filter == "Done") return data.completed;
            else return !data.completed;
          }).map((data: ToDoBlock, index) => {
            console.log(data)
            return <li className={`DoListItem ${data.completed ? "active" : "inactive"}`}>
              <input type="checkbox" checked={data.completed} onChange={(e) => {
                const newList = [...list];
                newList[index] = new ToDoBlock(data.title, data.priority, data.category, e.target.checked);
                setDoList(newList);
              }}/>
              <span style={{backgroundColor: data.priority == "低" ? "rgb(30, 255, 150)" : data.priority == "中" ? "rgb(238, 218, 0)" : "rgb(238, 24, 0)"}}>{data.priority}</span>
              <h4>{data.title}</h4>
              <p>{data.category}</p>
              <button onClick={
                () => {
                  setDoList(list.filter((_, i) => i !== index)); // index 以外を残す
                }
              }>×</button>
            </li>;
          })}
        </ul>;
}

function FilterOptions({ selected, onChange }: { selected: string; onChange: (v: string) => void }) {
  return <div>
          {["All", "ToDo", "Done"].map((level) => (
            <label key={level}>
              <input
                type="radio"
                value={level}
                checked={selected === level}
                onChange={(e) => onChange(e.target.value)}
              />
              {level}
            </label>
          ))}
        </div>;
}

function App() {
  const [doTitle, setDoTitle] = useState("");
  const [option1, setOption1] = useState("高");
  const [option2, setOption2] = useState("仕事");
  const [ToDoList, setToDoList] = useState<ToDoBlock[]>([]);
  const [filter, setFilter] = useState("All");
  return (
    <>
      <h1>ToDo App</h1>
      <div>
        <TitleInput value={doTitle} onChange={setDoTitle} />
        <AddBtn doTitle={doTitle} option1={option1} option2={option2} list={ToDoList} setDoList={setToDoList} />
      </div>
      <div>
        <TaskOption1 selected={option1} onChange={setOption1} />
        <TaskOption2 value={option2} onChange={setOption2} />
      </div>
      <div>
        <FilterOptions selected={filter} onChange={setFilter} />
        <DoListViewer list={ToDoList} setDoList={setToDoList} filter={filter} />
      </div>
    </>
  );
}

export default App;