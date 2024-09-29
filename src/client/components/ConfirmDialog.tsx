import { useConfirmStore } from '@src/client/hooks/confirm-store';
import * as todoService from "@src/client/services/todo-service";
import clsx from 'clsx';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useAlertStore } from '../hooks/alert-store';

export const ConfirmDialog = () => {

    const intl = useIntl();

    const navigate = useNavigate();

    const { showAlert } = useAlertStore();

    const { isDelete, message, todo, show, hideConfirm } = useConfirmStore();

    const okHandler = async () => {
        try {
            if (isDelete) {
                await todoService.deleteById(todo?.id as string);
                showAlert(intl.formatMessage({ id: "dataIsDeleted" }, { task: todo?.task }) as string)
            } else {
                await todoService.update(todo?.id as string);
                showAlert(intl.formatMessage({ id: "dataIsUpdated" }, { task: todo?.task }) as string)
            }

            hideConfirm();
            navigate("/", { replace: true });
        } catch (error: any) {
            console.log(error);
            hideConfirm();
            showAlert(error.response.data.message, "danger");
        }
    }

    return (
        <div className={clsx("confirm", show && "show")}>
            <div className="confirm-content">
                <p>{message}</p>
                <section>
                    <button className="btn btn-secondary" onClick={() => hideConfirm()}>
                        <FormattedMessage id="cancel" />
                    </button>
                    <button className="btn btn-primary" onClick={() => okHandler()}>
                        <FormattedMessage id="ok" />
                    </button>
                </section>
            </div>
        </div>
    )
}