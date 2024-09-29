import * as todoService from "@src/client/services/todo-service";
import { Todo } from '@src/types/todo-type';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';
import { TodoItem } from '../components/TodoItem';

export const HomePage = () => {

    const location = useLocation();

    const [todoes, setTodoes] = useState<Todo[]>();

    const [total, setTotal] = useState<number>(0);

    const loadTodoes = () => {
        todoService.find()
            .then(({ status, data }) => {
                if (status === 200) {
                    setTotal(data.total);
                    setTodoes(data.todoes);
                }
            }).catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        loadTodoes();
    }, [location]);

    return (
        <>
            <div className="todo-list-toolbar">
                <div className="total">
                    <FormattedMessage id="total" values={{ total }} />
                </div>
                <Link to={"/add"} className="btn btn-primary">
                    <FormattedMessage id="newTask" />
                </Link>
            </div>
            <div className="todo-list">
                <table>
                    <tbody>
                        {
                            todoes && todoes.map((todo, index) => {
                                return <TodoItem
                                    key={index}
                                    index={index}
                                    todo={todo}
                                />
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
