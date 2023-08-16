//Notes (just disregard):
//transaction object has the following fields: {category, amount, dateOfTransaction, userId}
//also has these optional fields: {transactionInfo, receiptFilename, pathOfFilename, userComments}

//todo: check for duplicate transactionId
const updateTransactionForm = document.getElementById("updateTransactionForm"); // For now, assumed form ID to be 'updateTransactionForm'
//const createTransactionForm = document.getElementById("createTransactionForm");



// Event listeners for update.handlebars form:
updateTransactionForm.addEventListener("submit", async (event) => {
    if (!validateUpdateForm()) {  // If form validation fails, prevent form submission
        event.preventDefault();
    }
});

// Client side validations for tranasaction update.handlebars
function validateUpdateForm() {

    // Get values from the update form
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("dateOfTransaction").value;
    const category = document.getElementById("category").value;
    const userId = document.getElementById("userId").value;

    // Check type of values
    if (!Number.isInteger(amount) || amount <= 0) {   // Validate amount is a number
        alert("Please enter a valid amount");
        return false;
    }

    if (!typeof date === 'string') {
        alert("Please enter a valid date");  // Validate date is a string
        return false;
    }

    if (!typeof category === 'string') {
        alert("Please enter a valid category");  // Validate category is a string
        return false;
    }

    if (!typeof userId === 'string') {
        alert("Please enter a valid userId");  // Validate userId is a string
        return false;
    }


    // Optional fields from the update form
    const transactionInfo = document.getElementById("transactionInfo").value;
    const receiptFilename = document.getElementById("receiptFilename").value;
    const pathOfFilename = document.getElementById("pathOfFilename").value;
    const userComments = document.getElementById("userComments").value;

    // Check types of optional field values
    if (transactionInfo || receiptFilename || pathOfFilename || userComments) {
        if (!typeof transactionInfo === 'string') {
            alert("Please enter valid transaction info");  // Validate transactionInfo is a string
            return false;
        }

        if (!typeof receiptFilename === 'string') {
            alert("Please enter a valid receiptFilename");  // Validate receiptFilename is a string
            return false;
        }

        if (!typeof pathOfFilename === 'string') {
            alert("Please enter a valid pathOfFilename");  // Validate pathOfFilename is a string
            return false;
        }
        
        if (!typeof userComments === 'string') {
            alert("Please enter a valid comment");  // Validate userComments is a string
            return false;
        }
    }


    // Trim all values
    date.trim();
    category.trim();
    userId.trim();
    if (transactionInfo) transactionInfo.trim();
    if (receiptFilename) receiptFilename.trim();
    if (pathOfFilename) pathOfFilename.trim();
    if (userComments) userComments.trim();



    // Check if any (of the required) values are empty, if so alert user
    if (!amount || !date || !category || !userId) {
        alert("Please fill out all fields");
        return false;
    }



    // Validate date is in correct format
    if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        alert("Please enter a valid date");
        return false;
    }


    // Validate category is one of the 5 options
    if (!['Income', 'Savings', 'Expenditure', 'Retirement', 'Investment'].includes(category)) {
        alert("Invalid category value");
        return false;
    }

    // Do we need to do this? => TODO: Validate that amount doesn't exceed 3 decimal places (ex. don't accept $10.859)

    return true; // Validation passed and form can be submitted
}