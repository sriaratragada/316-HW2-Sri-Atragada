/**
 * AddItem_Transaction.js
 *
 * Adds one item at the end of the list. The item is built once, before this
 * transaction is ever run, so redo puts back the same item with the same id.
 */
import { jsTPS_Transaction } from '../lib/jsTPS.js';

export class AddItem_Transaction extends jsTPS_Transaction {
    #operations;
    #item;
    #index;

    /**
     * @param {Object} operations the list operations handed out by CurrentListContext
     * @param {Object} item the item to add, already made
     * @param {number} index where the item belongs
     */
    constructor(operations, item, index) {
        super();
        this.#operations = operations;
        this.#item = item;
        this.#index = index;
    }

    doTransaction() {
        this.#operations.addItem(this.#item, this.#index);
    }

    undoTransaction() {
        this.#operations.removeItemAt(this.#index);
    }

    toString() {
        return `AddItem_Transaction(index ${this.#index})`;
    }
}
