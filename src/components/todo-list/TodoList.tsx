import axios from "axios";
import { useEffect, useState } from "react";
import { ITodo } from "../../models/ITodo";
import { Error } from "../UI/Error";
import { Loader } from "../UI/Loader";
import { Todo } from "../UI/todo/Todo";
import './TodoList.css';


export const TodoList = () => {
    const [todos, setTodos] = useState<ITodo[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null)
    const [totalCount, setTotalCount] = useState<number>(0)

    const [page, setPage] = useState<number>(1)
    const limit = 10

    const fetchData = () => {
        if (page > 1 && page * limit > totalCount) return;

        setIsLoading(true)
        axios.get("https://jsonplaceholder.typicode.com/todos",
            {
                params: {
                    _page: page,
                    _limit: limit
                }
            })
            .then(({ data, headers }) => {
                setPage(prevPage => prevPage + 1);
                setTodos(prevData => [...prevData, ...data])
                setTotalCount(headers["x-total-count"])
            })
            .catch((err) => setError(err))
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleScroll = () => {
        const container = document.getElementById('scroll-container');
        if (container) {
            const isAtBottom =
                container.scrollTop + container.clientHeight >= container.scrollHeight;
            if (isAtBottom && !isLoading) {
                fetchData();
            }
        }
    };

    useEffect(() => {
        const container = document.getElementById('scroll-container');
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => {
                container.removeEventListener('scroll', handleScroll);
            };
        }
    }, [isLoading]);

    if (error !== null)
        return <Error />

    if (isLoading && totalCount === 0)
        return <Loader />

    return (
        <div className="container">
            <div className="info">
                <span className="day">Today</span>

                <div className="add__and__count">
                    <div className="add">+</div>
                    <span className="count">{todos.length}</span>
                </div>
            </div>
            <div
                id="scroll-container"
                className="todos__list"
            >
                {
                    todos.map(todo => (
                        <Todo key={todo.id} todo={todo} />
                    ))
                }
            </div>
        </div>
    )
}