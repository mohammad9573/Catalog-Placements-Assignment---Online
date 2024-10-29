const fs = require('fs');

// Function to decode a value in a given base
function decodeValue(base, value) {
    return parseInt(value, base);
}

// Function to perform Lagrange interpolation
function lagrangeInterpolation(xValues, yValues) {
    const k = xValues.length;
    let c = 0;

    for (let i = 0; i < k; i++) {
        let term = yValues[i];
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                term *= (0 - xValues[j]) / (xValues[i] - xValues[j]);
            }
        }
        c += term;
    }
    
    return Math.round(c);
}

// Main function to read input and calculate the secret
function main() {
    const data = JSON.parse(fs.readFileSync('input.json', 'utf8'));
    
    const n = data.keys.n;
    const k = data.keys.k;
    
    let xValues = [];
    let yValues = [];
    
    // Extract x and decoded y values
    for (let i = 1; i <= n; i++) {
        const keyData = data[i.toString()];
        const base = parseInt(keyData.base);
        const value = keyData.value;

        const x = i; // The key itself is the x value
        const y = decodeValue(base, value);

        xValues.push(x);
        yValues.push(y);
    }

    // Calculate the secret (constant term)
    const secret = lagrangeInterpolation(xValues, yValues);
    
    console.log(`Secret (constant term): ${secret}`);
}

// Execute the main function
main();
