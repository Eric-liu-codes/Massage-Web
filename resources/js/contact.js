document.addEventListener("DOMContentLoaded", function() {
    const dropdown = document.getElementById("dropdown_option");
    const checkbox = document.getElementById("checkbox");
    const calculatedValue = document.getElementById("calculatedValue");

    function calculateValue() {
        let price = 72;

        if (checkbox.checked) {
            price *= 0.9;
        }

        calculatedValue.innerText = "Total Price (10% discount if paying with cash): $" + price.toFixed(2);
    }

    dropdown.addEventListener("change", calculateValue);
    checkbox.addEventListener("change", calculateValue);

    calculateValue();
});