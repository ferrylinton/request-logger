import * as todoService from "@src/client/services/todo-service";
import { Todo } from '@src/types/todo-type';
import { useEffect, useState } from 'react';
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import { Link, useParams } from 'react-router-dom';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { useConfirmStore } from '../hooks/confirm-store';

export const DetailPage = () => {

  const intl = useIntl();

  const { showConfirm } = useConfirmStore();

  const { id } = useParams();

  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    loadTodo(id);
  }, [id]);

  const loadTodo = (id: string | undefined) => {
    todoService.findById(id as string)
      .then(({ status, data }) => {
        if (status === 200) {
          console.log(data);
          setTodo(data);
        }
      }).catch(error => {
        console.log(error);
      });
  }

  const onClickDelete = () => {
    if (todo) {
      showConfirm(intl.formatMessage({ id: "deleteData" }), todo, true);
    }
  }

  return (
    <>
      {todo && <div className="todo-detail">
        <table>
          <tbody>
            <tr>
              <th><FormattedMessage id="id" /></th>
              <td>{todo.id}</td>
            </tr>
            <tr>
              <th><FormattedMessage id="task" /></th>
              <td className="break">{todo.task}</td>
            </tr>
            <tr>
              <th><FormattedMessage id="done" /></th>
              <td>{intl.formatMessage({ id: todo.done ? "yes" : "no" })}</td>
            </tr>
            <tr>
              <th><FormattedMessage id="createdAt" /></th>
              <td><FormattedDate value={new Date(todo.createdAt)} /></td>
            </tr>
            <tr>
              <th><FormattedMessage id="updatedAt" /></th>
              <td>{todo.updatedAt ? intl.formatDate(todo.updatedAt) : '-'}</td>
            </tr>
          </tbody>
        </table>
      </div>}

      <section className="buttons">
        <Link to={"/"} className='btn btn-secondary'>
          <FormattedMessage id="back" />
        </Link>
        {todo && <button type="button" className="btn btn-danger" onClick={onClickDelete}>
          <FormattedMessage id="delete" />
        </button>}

      </section>

    </>
  )
}
