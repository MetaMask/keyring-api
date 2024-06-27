"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitSnapKeyringEvent = void 0;
/**
 * Emit a keyring event from a snap.
 *
 * @param snap - The global snap object.
 * @param event - The event name.
 * @param data - The event data.
 */
async function emitSnapKeyringEvent(snap, event, data) {
    await snap.request({
        method: 'snap_manageAccounts',
        params: {
            method: event,
            params: { ...data },
        },
    });
}
exports.emitSnapKeyringEvent = emitSnapKeyringEvent;
//# sourceMappingURL=snap-utils.js.map