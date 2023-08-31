import { faker } from "@faker-js/faker";
import { FC } from "react";
import { ITodo } from "../../../models/ITodo";
import './Todo.css';


interface TodoProps {
    todo: ITodo
}

export const Todo: FC<TodoProps> = ({ todo }) => {
    const startDate = faker.date.anytime().toLocaleString("en-US",
        { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })
    const endDate = faker.date.anytime().toLocaleString("en-US",
        { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })

    return (
        <div className="todo">
            <div className="todo__card">
                <div className="todo__header">
                    <input className="todo__checked" type="checkbox" checked={todo.completed} readOnly />
                    {todo.title}
                </div>
                <div className="todo__date">
                    <span>
                        {startDate}
                    </span>
                    <span>
                        {endDate}
                    </span>
                </div>
                <div className="todo__description">
                    {faker.lorem.text()}
                </div>
                <div className="todo__footer">
                    <div className="todo__tags">
                        <div className="todo__first__tag">
                            {faker.person.firstName()}
                        </div>
                        <div className="todo__second__tag">
                            {faker.person.firstName()}
                        </div>
                    </div>

                    <img
                        className="todo__user__img"
                        src="https://memepedia.ru/wp-content/uploads/2023/08/tramp-v-tjurme.jpg"
                        alt="user"
                    />
                </div>
            </div>
        </div>
    )
}