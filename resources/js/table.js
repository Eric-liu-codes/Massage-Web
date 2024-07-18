function deleteRow(rowIndex) {
    const row = document.getElementById(`row-${rowIndex}`);
    if (row) {
        row.parentNode.removeChild(row);
    }
}

function addTimeUntil() {
    const timeUntilCells = document.querySelectorAll('.time-until');

    timeUntilCells.forEach(cell => {
        const targetDateStr = cell.getAttribute('data-date');
        const nani = Date.parse(targetDateStr);

        if (isNaN(nani)) {
            return;
        }

        const appointmentDate = new Date(nani);
        const present = new Date();
        const past = appointmentDate - present;

        if (past <= 0) {
            cell.textContent = "PAST";
            return;
        }

        const days = Math.floor(past / (1000 * 60 * 60 * 24));
        const hours = Math.floor((past % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((past % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((past % (1000 * 60)) / 1000);

        cell.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    });
}

setInterval(addTimeUntil, 1000);