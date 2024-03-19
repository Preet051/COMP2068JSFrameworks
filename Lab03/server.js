// Import required modules
const connect = require('connect');
const url = require('url');

// Define a function to calculate the result based on URL parameters
function calculate(req, res) {
    // Parse the URL and extract query parameters
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;

    // Extract method, x, and y parameters from the query
    const method = query.method;
    const x = parseFloat(query.x);
    const y = parseFloat(query.y);

    // Check if x and y are valid numbers
    if (isNaN(x) || isNaN(y)) {
        res.end('Error: Invalid numbers provided');
        return;
    }

    let result;
    // Perform math operation based on the method parameter
    switch (method) {
        case 'add':
            result = x + y;
            break;
        case 'subtract':
            result = x - y;
            break;
        case 'multiply':
            result = x * y;
            break;
        case 'divide':
            if (y === 0) {
                res.end('Error: Division by zero');
                return;
            }
            result = x / y;
            break;
        default:
            res.end('Error: Invalid method provided');
            return;
    }

    // Send the result back as response
    res.end(`Result: ${result}`);
}

// Create a Connect app
const app = connect();

// Register the calculate function as a request handler for the '/lab3' endpoint
app.use('/lab3', calculate);

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
