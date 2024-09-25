import React, { ChangeEvent, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, replace, useNavigate } from 'react-router-dom';
import * as todoService from "@src/client/services/todo-service";
import { AxiosError } from 'axios';

export const AddFormPage = () => {

  const intl = useIntl();

  const navigate = useNavigate();

  const [task, setTask] = useState<string>('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTask(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    todoService.create(task)
      .then(({ status, data }) => {
        if (status === 201) {
          navigate("/", { replace: true });
        }
      }).catch((error: AxiosError) => {
        console.log(error);
      });

    setTask('');
  };

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit}
        noValidate
        autoComplete='off'
        className="todo-form">

        <div className="form-group">
          <label><FormattedMessage id="task" /></label>
          <input
            type="text"
            placeholder={intl.formatMessage({ id: 'task' })}
            name='task'
            value={task}
            autoComplete='off'
            autoFocus
            onChange={handleChange} />
        </div>
        <section className="buttons">
          <Link to={"/"} className="btn btn-secondary">
            <FormattedMessage id="back" />
          </Link>
          <button type="submit" className="btn btn-primary">
            <FormattedMessage id="save" />
          </button>
        </section>

      </form>
    </div>
  )
}
