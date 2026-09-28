/**
 * RenameList_Transaction.js
 *
 * Records one rename of the open list: the name it had before and the name it
 * has after.
 */
import { jsTPS_Transaction } from '../lib/jsTPS.js';

export class RenameList_Transaction extends jsTPS_Transaction {
    #operations;
    #oldName;
    #newName;

    /**
     * @param {Object} operations the list operations handed out by CurrentListContext
     * @param {string} oldName the name before the rename
     * @param {string} newName the name after the rename
     */
    constructor(operations, oldName, newName) {
        super();
        this.#operations = operations;
        this.#oldName = oldName;
        this.#newName = newName;
    }

    doTransaction() {
        this.#operations.setName(this.#newName);
    }

    undoTransaction() {
        this.#operations.setName(this.#oldName);
    }

    toString() {
        return `RenameList_Transaction("${this.#oldName}" -> "${this.#newName}")`;
    }
}
