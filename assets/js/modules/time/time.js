/**
 * Sleeps for specified number of milliseconds
 * @param {number} ms The amount of time to sleep for in milliseconds
 * @return {Promise}
 */
function sleep(ms) {
    if (ms === 0) {
        return;
    }

    return new Promise(resolve => setTimeout(resolve, ms));
}

export { sleep }
