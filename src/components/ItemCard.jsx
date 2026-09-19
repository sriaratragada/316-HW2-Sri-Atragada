/**
 * ItemCard.jsx
 *
 * One row in the list screen: the item's fields in a grid, duplicate and delete
 * buttons on the right, and draggable so the user can reorder.
 */
import { DateUtil } from '../common/DateUtil.js';
import IconButton, { DELETE_GLYPH, DUPLICATE_GLYPH } from './IconButton.jsx';

const PRIORITY_BORDER = {
    High: 'border-l-priority-high',
    Medium: 'border-l-priority-medium',
    Low: 'border-l-priority-low'
};

const PRIORITY_TEXT = {
    High: 'text-priority-high',
    Medium: 'text-priority-medium',
    Low: 'text-priority-low'
};

export default function ItemCard({
    item,
    index,
    dropClass = '',
    onEdit,
    onDuplicate,
    onDelete,
    onDragStart,
    onDragEnd
}) {
    const completedSuffix = item.completed ? ', completed' : '';
    const ariaLabel = `Edit the item ${item.description}${completedSuffix}`;

    function handleKeyDown(event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        onEdit();
    }

    return (
        <li
            className={`item-card item-grid mt-2.5 items-center gap-3 rounded-card
                        border-l-[0.3125rem] bg-sbu-white px-[0.875rem] py-2.5 shadow-card
                        first:mt-0 ${PRIORITY_BORDER[item.priority]} ${dropClass}
                        ${item.completed ? 'item-completed' : ''}`}
            data-index={index}
            draggable
            role="button"
            tabIndex={0}
            aria-label={ariaLabel}
            onClick={onEdit}
            onKeyDown={handleKeyDown}
            onDragStart={(event) => onDragStart(index, event)}
            onDragEnd={onDragEnd}>

            <span className="area-handle cursor-grab text-grey-500 select-none" aria-hidden="true">
                ⠿
            </span>

            <span className={`item-description area-description item-description-cell min-w-0 truncate
                              font-semibold ${item.completed ? 'line-through text-grey-500' : ''}`}>
                {item.description}
            </span>

            <span className="area-entered text-center text-[0.875rem] tabular-nums text-grey-700">
                {DateUtil.format(item.dateEntered)}
            </span>

            <span className={`area-priority text-center text-[0.875rem] font-semibold
                              ${PRIORITY_TEXT[item.priority]}`}>
                {item.priority}
            </span>

            <span className="area-target text-center text-[0.875rem] tabular-nums text-grey-700">
                {DateUtil.format(item.targetDate)}
            </span>

            <span className="area-completed text-center text-[0.875rem] font-semibold
                              text-completed-mark">
                {item.completed ? '✓' : ''}
            </span>

            <div className="area-actions flex justify-end gap-1">
                <IconButton
                    action="duplicate-item"
                    label={`Duplicate the item ${item.description}`}
                    glyph={DUPLICATE_GLYPH}
                    onClick={onDuplicate} />
                <IconButton
                    action="delete-item"
                    label={`Delete the item ${item.description}`}
                    glyph={DELETE_GLYPH}
                    danger
                    onClick={onDelete} />
            </div>
        </li>
    );
}
