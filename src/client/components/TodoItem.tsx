import { Todo } from '@src/types/todo-type';
import { CheckIcon } from '../icons/CheckIcon';
import EyeIcon from '../icons/EyeIcon';
import { useConfirmStore } from '../hooks/confirm-store';
import clsx from 'clsx';
import { FormattedDate, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

type Props = {
    index: number,
    todo: Todo
}

export const TodoItem = ({ index, todo }: Props) => {

    const intl = useIntl();

    const { showConfirm } = useConfirmStore();

    return (
        <>
            <tr className={clsx(todo.done && "task-done")}>
                <td>{index + 1} </td>
                <td>
                    <span>{todo.task}</span>
                    <em><FormattedDate value={new Date(todo.createdAt)} /></em>
                </td>
                <td>
                    <div className="action">
                        <button className="btn btn-primary" onClick={() => showConfirm(todo)}>
                            <CheckIcon />
                        </button>
                        <Link to={"/detail/" + todo._id} className="btn btn-secondary">
                            <EyeIcon />
                        </Link>
                    </div>
                </td>
            </tr>
        </>
    )
}
