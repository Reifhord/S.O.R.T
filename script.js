// Profile menu toggle
const profile = document.querySelector('.profile');
const profileMenu = document.getElementById('profileMenu');
profile.addEventListener('click', () => {
    profileMenu.style.display = profileMenu.style.display === 'flex' ? 'none' : 'flex';
});

// Theme toggle
const toggleBtn = document.getElementById('toggleThemeBtn');
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

// QR Scan simulation
const scanBtn = document.getElementById('scanBtn');
const qrInput = document.getElementById('qrInput');
const table = document.getElementById('fileTable');
const notifications = document.getElementById('notifications');
const historyList = document.getElementById('historyList');

scanBtn.addEventListener('click', () => {
    const value = qrInput.value.trim();
    if (!value) {
        notifications.textContent = 'Please enter a QR code value!';
        return;
    }
    notifications.textContent = '';

    // Simulate splitting QR into Name + Barangay
    const [name, barangay] = value.split(',');
    if (!name || !barangay) {
        notifications.textContent = 'QR must be in format Name,Barangay';
        return;
    }

    // Add row to table
    const row = document.createElement('div');
    row.classList.add('row');
    const cell1 = document.createElement('div');
    cell1.classList.add('cell');
    cell1.textContent = name;
    const cell2 = document.createElement('div');
    cell2.classList.add('cell');
    cell2.textContent = barangay;
    row.appendChild(cell1);
    row.appendChild(cell2);
    table.appendChild(row);

    // Add to history
    const li = document.createElement('li');
    li.textContent = `${name} - ${barangay}`;
    historyList.appendChild(li);

    qrInput.value = '';
});

// Search functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();
    const rows = table.querySelectorAll('.row');
    rows.forEach((row, index) => {
        if (index === 0) return; // skip header
        const name = row.children[0].textContent.toLowerCase();
        const barangay = row.children[1].textContent.toLowerCase();
        row.style.display = name.includes(filter) || barangay.includes(filter) ? '' : 'none';
    });
});

// Sort functionality
const sortSelect = document.getElementById('sortSelect');
sortSelect.addEventListener('change', () => {
    const rows = Array.from(table.querySelectorAll('.row')).slice(1); // skip header
    const index = sortSelect.value === 'name' ? 0 : 1;
    rows.sort((a,b) => a.children[index].textContent.localeCompare(b.children[index].textContent));
    rows.forEach(row => table.appendChild(row));
});

// Export CSV
const exportBtn = document.getElementById('exportBtn');
exportBtn.addEventListener('click', () => {
    let csv = 'Name,Barangay\n';
    const rows = table.querySelectorAll('.row');
    rows.forEach((row, index) => {
        if (index === 0) return; // skip header
        csv += `${row.children[0].textContent},${row.children[1].textContent}\n`;
    });
    const blob = new Blob([csv], {type: 'text/csv'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'SORT_data.csv';
    a.click();
});
