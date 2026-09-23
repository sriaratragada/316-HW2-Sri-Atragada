/**
 * DeleteItem_Transaction.js
 *
 * Removes one item from the list. The item is captured at construction time so
 * undo can put back the very same object, at the very same index.
 */
import { jsTPS_Transaction } from '../lib/jsTPS.js';

export class DeleteItem_Transaction extends jsTPS_Transaction {
    #operations;
    #index;
    #item;

    /**
     * @param {Object} operations the list operations handed out by CurrentListContext
     * @param {number} index which item was deleted
     * @param {Object} item the item that was removed
     */
    constructor(operations, index, item) {
        super();
        this.#operations = operations;
        this.#index = index;
        this.#item = item;
    }

    doTransaction() {
        this.#operations.removeItemAt(this.#index);
    }

    undoTransaction() {
        this.#operations.addItem(this.#item, this.#index);
    }

    toString() {
        return `DeleteItem_Transaction(index ${this.#index})`;
    }
}
