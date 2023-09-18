import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { combineReducers } from "redux";
import Header from './components/Header';
import styled, { keyframes } from 'styled-components';

const Content=styled.div`
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family:  arial; 
  
 
`
const Form = styled.form`
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px; /* Ancho del formulario */
`;

const Button = styled.button`
  background-color: #007bff; /* Color inicial del botón */
  color: white;
  border: none;
  padding: 10px 15px;
  margin: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s; /* Animación de fading */

  &:hover {
    background-color: black; /* Cambia al fondo negro en hover */
    color: white; /* Cambia el color del texto a blanco en hover */
  }
`;

const ButtonCompo= styled.div`
background-color: black; /* Color inicial del botón */
color: white;
border: none;
padding: 10px 15px;
margin: 5px;
`;



export const asyncMiddelware = (store) => (next) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch, store.getState);
  }
  return next(action);
};

export const fetchThunk = () => async (dispatch) => {
  dispatch({ type: "todos/pending" });
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    const todos = data.slice(0, 10);
    dispatch({ type: "todos/fulfilled", payload: todos });
  } catch (e) {
    dispatch({ type: "todos/error", error: e.message });
  }
};

export const filterReducer = (state = "all", action) => {
  switch (action.type) {
    case "filter/set":
      return action.payload;
    default:
      return state;
  }
};

const initialFetching = { loading: "idle", error: null };
export const fetchingReducer = (state = initialFetching, action) => {
  switch (action.type) {
    case "todos/pending":
      return { ...state, loading: "pending" };
    case "todos/fulfilled":
      return { ...state, loading: "succeeded" };
    case "todos/error":
      return { error: action.error, loading: "rejected" };
    default:
      return state;
  }
};

export const todosReducer = (state = [], action) => {
  switch (action.type) {
    case "todos/fulfilled":
      return action.payload;
    case "todo/add":
      return state.concat({ ...action.payload });
    case "todo/complete":
      const newTodos = state.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      return newTodos;
    default:
      return state;
  }
};

export const reducer = combineReducers({
  todos: combineReducers({
    entities: todosReducer,
    status: fetchingReducer,
  }),
  filter: filterReducer,
});

const selectTodos = (state) => {
  const { todos: { entities }, filter } = state;

  if (filter === "complete") {
    return entities.filter((todo) => todo.completed);
  }

  if (filter === "incomplete") {
    return entities.filter((todo) => !todo.completed);
  }

  return entities;
};

const selectStatus = (state) => state.todos.status;

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  return (
    <li
      style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      onClick={() => dispatch({ type: "todo/complete", payload: todo })}
    >
      {todo.title}
    </li>
  );
};

const App = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const status = useSelector(selectStatus);

  const submit = (e) => {
    e.preventDefault();
    if (!value.trim()) {
      return;
    }
    const id = Math.random().toString(36);
    const todo = { title: value, completed: false, id };
    dispatch({ type: "todo/add", payload: todo });
    setValue("");
  };

  return (
    <Content>
      <Header />
      <Form onSubmit={submit}>
        <label> Introduzce un nombre para tarea y pulsa intro</label>
        <br/>
        <input value={value} onChange={(e) => setValue(e.target.value)} />
      </Form>

      <ButtonCompo>

      <Button onClick={() => dispatch({ type: "filter/set", payload: "all" })}>
        Mostrar todos
      </Button>
      <Button
        onClick={() => dispatch({ type: "filter/set", payload: "complete" })}
      >
        Completados
      </Button>
      <Button
        onClick={() => dispatch({ type: "filter/set", payload: "incomplete" })}
      >
        Incompletos
      </Button>
      <Button onClick={() => dispatch(fetchThunk())}> Fecth</Button>
      
      </ButtonCompo>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>

    </Content>
  );
};

export default App;
