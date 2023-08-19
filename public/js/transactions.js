//Notes (just disregard):
//transaction object has the following fields: {category, amount, dateOfTransaction, userId}
//also has these optional fields: {transactionInfo, receiptFilename, pathOfFilename, userComments}

//todo: check for duplicate transactionId
const updateForm = document.getElementById("updateForm"); // For now, assumed form ID to be 'updateTransactionForm'
//const createTransactionForm = document.getElementById("createTransactionForm");

console.log('hei')

// Event listeners for update.handlebars form:
updateForm.addEventListener("submit", async (event) => {
    if(!validateUpdateForm()){
        event.preventDefault();
    }
});

// Client side validations for transaction update.handlebars
function validateUpdateForm() {
    const noticeEl = document.querySelector(".notice");

    // Get values from the update form
    const amount = parseFloat(document.getElementById("transactionAmount").value);
    const date = document.getElementById("transactionDate").value.trim();
    const category = document.getElementById("updateSelector").value.trim();

    // Check if any (of the required) values are empty, if so noticeEl.innerHTML = user
    if (!amount || !date || !category) {
        noticeEl.innerHTML = "Please fill out all fields";
        return false;
    }

    // Check type of values
    if (typeof category !== 'string') {
        noticeEl.innerHTML = "Please enter a valid category"; // Validate category is a string
        return false;
    }
    if (isNaN(amount) || amount <= 0) { // Validate amount is a number
        noticeEl.innerHTML = "Please enter a valid amount";
        return false;
    }
    if (typeof date !== 'string') {
        noticeEl.innerHTML = "Please enter a valid date"; // Validate date is a string
        return false;
    }

    // Optional fields from the update form
    const transactionInfo = document.getElementById("transactionInfo").value.trim();
    const receiptFilename = document.getElementById("receiptFilename").value.trim();
    const pathOfFilename = document.getElementById("pathOfFilename").value.trim();
    const userComments = document.getElementById("userComments").value.trim();

    // Check types of optional field values
    if (transactionInfo || receiptFilename || pathOfFilename || userComments) {
        if (typeof transactionInfo !== 'string') {
            noticeEl.innerHTML = "Please enter valid transaction info"; // Validate transactionInfo is a string
            return false;
        }

        if (typeof receiptFilename !== 'string') {
            noticeEl.innerHTML = "Please enter a valid receiptFilename"; // Validate receiptFilename is a string
            return false;
        }

        if (typeof pathOfFilename !== 'string') {
            noticeEl.innerHTML = "Please enter a valid pathOfFilename"; // Validate pathOfFilename is a string
            return false;
        }

        if (typeof userComments !== 'string') {
            noticeEl.innerHTML = "Please enter a valid comment"; // Validate userComments is a string
            return false;
        }
    }

    // Validate date is in correct format
    if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        noticeEl.innerHTML = "Please enter a valid date";
        return false;
    }

    // Validate category is one of the 5 options
    if (!['Income', 'Savings', 'Expenditure', 'Retirement', 'Investment'].includes(category)) {
        noticeEl.innerHTML = "Invalid category value";
        return false;
    }

    // Do we need to do this? => TODO: Validate that amount doesn't exceed 3 decimal places (ex. don't accept $10.859)

    return true; // Validation passed and form can be submitted
}