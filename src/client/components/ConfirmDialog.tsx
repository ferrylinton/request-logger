import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';
import { useConfirmStore } from '@src/client/hooks/confirm-store';
import { Todo } from '@src/types/todo-type';

type Props = {
    message: string,
    okHandler: (todo?: Todo) => void
}

export const ConfirmDialog = ({ message, okHandler }: Props) => {

    const { todo, show, hideConfirm } = useConfirmStore();

    return (
        <div className={clsx("confirm", show && "show")}>
            <div className="confirm-content">
                <p>{message}</p>
                <section>
                    <button className="btn btn-secondary" onClick={() => hideConfirm()}>
                        <FormattedMessage id="cancel" />
                    </button>
                    <button className="btn btn-primary" onClick={() => okHandler(todo)}>
                        <FormattedMessage id="ok" />
                    </button>
                </section>
            </div>
        </div>
    )
}