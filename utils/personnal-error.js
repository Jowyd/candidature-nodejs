function PersonnalError(message, error) {
    this.message = message;
    this.error = error;
}

function getCustomResMessage(message, error) {

    function getStackMessage(messages, e) {
        if (e.message) {
            messages.push(e.message);
        }
        if (e.error) {
            return getStackMessage(messages, e.error);
        }
        return messages;
    }
    return getStackMessage( [message], error);
}

module.exports = {PersonnalError, getCustomResMessage};
