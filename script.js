// Sample leaderboard data
const leaderboardData = [
    { rank: 1, name: "Rohit K.", avatar: "RK", game: "Teen Patti", winnings: "₹2,45,670", level: 92 },
    { rank: 2, name: "Priya S.", avatar: "PS", game: "Rummy", winnings: "₹1,98,450", level: 87 },
    { rank: 3, name: "Amit R.", avatar: "AR", game: "Aviator", winnings: "₹1,67,890", level: 81 },
    { rank: 4, name: "Neha P.", avatar: "NP", game: "Teen Patti", winnings: "₹1,45,230", level: 76 },
    { rank: 5, name: "Vikash M.", avatar: "VM", game: "Rummy", winnings: "₹1,23,450", level: 72 },
    { rank: 6, name: "Sneha D.", avatar: "SD", game: "Aviator", winnings: "₹98,760", level: 68 },
    { rank: 7, name: "Rahul S.", avatar: "RS", game: "Teen Patti", winnings: "₹87,540", level: 65 },
    { rank: 8, name: "Kavya T.", avatar: "KT", game: "Rummy", winnings: "₹76,890", level: 62 },
    { rank: 9, name: "Deepak L.", avatar: "DL", game: "Aviator", winnings: "₹65,430", level: 59 },
    { rank: 10, name: "Anjali G.", avatar: "AG", game: "Teen Patti", winnings: "₹54,210", level: 56 },
    { rank: 11, name: "Suresh Y.", avatar: "SY", game: "Rummy", winnings: "₹43,870", level: 53 },
    { rank: 12, name: "Meera N.", avatar: "MN", game: "Aviator", winnings: "₹32,650", level: 50 },
];

// Initialize leaderboard
function initLeaderboard() {
    renderLeaderboard(leaderboardData);
    setupEventListeners();
}

// Render leaderboard
function renderLeaderboard(data) {
    const tbody = document.getElementById('leaderboardBody');
    tbody.innerHTML = data.map(player => `
        <div class="table-row">
            <div class="rank rank-${player.rank <= 3 ? player.rank : ''}">${player.rank}</div>
            <div class="player-info">
                <div class="player-avatar">${player.avatar}</div>
                <div class="player-name">${player.name}</div>
            </div>
            <div class="game-tag">${player.game}</div>
            <div class="winnings">${player.winnings}</div>
            <div class="level">
                <span>Lv.${player.level}</span>
                <div class="level-bar">
                    <div class="level-progress" style="width: ${Math.min(player.level * 2, 100)}%"></div>
                </div>
            </div>
        </div>
    `).join('');
}

// Event listeners
function setupEventListeners() {
    // Refresh button
    document.querySelector('.refresh-btn').addEventListener('click', () => {
        document.querySelector('.refresh-btn i').classList.add('fa-spin');
        setTimeout(() => {
            document.querySelector('.refresh-btn i').classList.remove('fa-spin');
            // Simulate data refresh
            const shuffled = [...leaderboardData].sort(() => Math.random() - 0.5);
            renderLeaderboard(shuffled.slice(0, 12));
        }, 1500);
    });

    // Sort buttons
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            let sortedData = [...leaderboardData];
            const sortBy = btn.dataset.sort;
            
            if (sortBy === 'rank') {
                sortedData.sort((a, b) => a.rank - b.rank);
            } else if (sortBy === 'name') {
                sortedData.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sortBy === 'winnings') {
                sortedData.sort((a, b) => parseFloat(b.winnings.replace(/[^0-9]/g, '')) - parseFloat(a.winnings.replace(/[^0-9]/g, '')));
            }
            
            renderLeaderboard(sortedData.slice(0, 12));
        });
    });

    // Auto update every 30 seconds
    setInterval(() => {
        const shuffled = [...leaderboardData].sort(() => Math.random() - 0.5);
        renderLeaderboard(shuffled.slice(0, 12));
    }, 30000);
}

// Live counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-info h3');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = counter.textContent.replace(/[\d,]+/, target.toLocaleString());
                clearInterval(timer);
            } else {
                counter.textContent = counter.textContent.replace(/[\d,]+/, Math
