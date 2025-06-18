import { useContext, useEffect } from 'react'
import { TodoContext } from '../contexts/todo-context';

export const ClickOutside = () => {

    const { editItemId, inputRef, resetEdit } = useContext(TodoContext);


    useEffect(() => {
        const handleClickOutside = (e) => {
            e.stopPropagation();
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                resetEdit();
            }
        };

        if (editItemId) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [editItemId, resetEdit, inputRef]);
}
export default ClickOutside;