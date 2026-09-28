/**
 * MoveItem_Transaction.js
 *
 * Moves one item from one position to another. Undo is the same move in reverse.
 */
import { jsTPS_Transaction } from '../lib/jsTPS.js';

export class MoveItem_Transaction extends jsTPS_Transaction {
    #operations;
    #fromIndex;
    #toIndex;

    /**
     * @param {Object} operations the list operations handed out by CurrentListContext
     * @param {number} fromIndex where the item was
     * @param {number} toIndex where it went
     */
    constructor(operations, fromIndex, toIndex) {
        super();
        this.#operations = operations;
        this.#fromIndex = fromIndex;
        this.#toIndex = toIndex;
    }

    doTransaction() {
        this.#operations.moveItem(this.#fromIndex, this.#toIndex);
    }

    undoTransaction() {
        this.#operations.moveItem(this.#toIndex, this.#fromIndex);
    }

    toString() {
        return `MoveItem_Transaction(${this.#fromIndex} -> ${this.#toIndex})`;
    }
}
