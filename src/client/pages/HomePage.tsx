import * as todoService from "@src/client/services/todo-service";
import { Todo } from '@src/types/todo-type';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { TodoItem } from '../components/TodoItem';
import { useConfirmStore } from "../hooks/confirm-store";
import { useAuthStore } from "../hooks/auth-store";

export const HomePage = () => {

    const intl = useIntl();

    const { token } = useAuthStore();

    const { hideConfirm } = useConfirmStore();

    const [todoes, setTodoes] = useState<Todo[]>();

    const [total, setTotal] = useState<number>(0);

    const updateDataMessage = intl.formatMessage({ id: "updateData" });

    const loadTodoes = () => {
        todoService.find()
            .then(({ status, data }) => {
                if (status === 200) {
                    setTotal(data.length);
                    setTodoes(data);
                }
            }).catch(error => {
                console.log(error);
            });
    }

    const okHandler = async (todo?: Todo) => {
        hideConfirm();
        if(todo){
            await todoService.update(todo.id as string)
        }
        
        loadTodoes();
    }

    useEffect(() => {
        loadTodoes();
    }, []);

    return (
        <>
            <div className="container">
                <div className="todo-list-toolbar">
                    <div className="total">
                        <FormattedMessage id="total"
                            values={{
                                total
                            }} />
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
            </div>
            <ConfirmDialog message={updateDataMessage} okHandler={okHandler} />
        </>
    )
}
