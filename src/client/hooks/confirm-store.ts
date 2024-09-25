import { Todo } from '@src/types/todo-type';
import { create } from 'zustand';

interface ConfirmState {
    todo?: Todo,
    show: boolean,
    showConfirm: (todo: Todo) => void,
    hideConfirm: () => void
}

export const useConfirmStore = create<ConfirmState>((set) => ({
    show: false,
    showConfirm: (todo: Todo) => {
        set(() => ({ show: true, todo }));
    },
    hideConfirm: () => {
        set(() => ({ show: false }));
    }
}));