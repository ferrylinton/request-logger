import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as todoService from "@src/client/services/todo-service";
import { Todo } from '@src/types/todo-type';
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import { useConfirmStore } from '../hooks/confirm-store';
import { ConfirmDialog } from '../components/ConfirmDialog';

export const DetailPage = () => {

  const intl = useIntl();

  const navigate = useNavigate();

  const { hideConfirm, showConfirm } = useConfirmStore();

  const { id } = useParams();

  const [todo, setTodo] = useState<Todo | null>(null);

  const deleteDataMessage = intl.formatMessage({ id: "deleteData" });

  useEffect(() => {
    loadTodo(id);
  }, [id]);

  const okHandler = async (todo?: Todo) => {
    hideConfirm();
    if (todo) {
      await todoService.deleteById(todo.id as string);
      navigate("/")
    }
  }

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

  const isDone = (done: boolean) => {
    return intl.formatMessage({ id: done ? "yes" : "no" });
  }

  return (
    <>
      <div className="container">
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
          {todo && <button type="button" className="btn btn-danger" onClick={() => showConfirm(todo)}>
            <FormattedMessage id="delete" />
          </button>}

        </section>

      </div>
      <ConfirmDialog message={deleteDataMessage} okHandler={okHandler} />
    </>
  )
}
