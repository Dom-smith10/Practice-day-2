// Player data
const players = {
    'Team Biff': [
        { name: 'Josh Haynes', handicap: 18, captain: true },
        { name: 'Dom Smith', handicap: 14 },
        { name: 'Benedict Gundry', handicap: 16 },
        { name: 'Richard Tucker', handicap: 18 },
        { name: 'Billy Rudolph', handicap: 24 },
        { name: 'Josh Wright', handicap: 29 }
    ],
    'Team Tails': [
        { name: 'Taylor Cornall', handicap: 21, captain: true },
        { name: 'Peter O\'Brien', handicap: 13 },
        { name: 'Will Hawtin', handicap: 18 },
        { name: 'Tom Wyatt', handicap: 16 },
        { name: 'Finn Campbell', handicap: 20 },
        { name: 'Dom Friel', handicap: 36 }
    ]
};

// Stroke indices for each course
const strokeIndices = {
    'Santa Maria': [17, 9, 2, 11, 15, 5, 13, 7, 1, 3, 10, 14, 8, 12, 18, 4, 16, 6],
    'Santa Clara': [14, 12, 18, 8, 10, 6, 4, 2, 16, 3, 11, 5, 9, 1, 15, 17, 7, 13],
    'El Chaparral': [11, 7, 1, 5, 16, 13, 9, 4, 17, 12, 10, 3, 15, 6, 14, 18, 2, 8]
};

// Score tracker
let teamScores = {
    'Team Biff': 0,
    'Team Tails': 0
};

// Utility function to generate hole inputs
function generateHoles(container, course) {
    const holesContainer = document.createElement('div');
    holesContainer.classList.add('holes-container');
    const indices = strokeIndices[course];

    for (let i = 0; i < 18; i++) {
        const holeDiv = document.createElement('div');
        holeDiv.classList.add('hole');

        const holeLabel = document.createElement('label');
        holeLabel.textContent = `Hole ${i + 1} (Stroke Index: ${indices[i]})`;
        holeDiv.appendChild(holeLabel);

        const inputFieldBiff = document.createElement('input');
        inputFieldBiff.type = 'number';
        inputFieldBiff.name = `biff_hole${i + 1}`;
        inputFieldBiff.placeholder = 'Biff Score';
        holeDiv.appendChild(inputFieldBiff);

        const inputFieldTails = document.createElement('input');
        inputFieldTails.type = 'number';
        inputFieldTails.name = `tails_hole${i + 1}`;
        inputFieldTails.placeholder = 'Tails Score';
        holeDiv.appendChild(inputFieldTails);

        holesContainer.appendChild(holeDiv);
    }

    container.appendChild(holesContainer);
}

// Calculate match result
function calculateMatchResult(matchContainer, team1, team2, course) {
    const indices = strokeIndices[course];
    let team1Wins = 0;
    let team2Wins = 0;

    for (let i = 0; i < 18; i++) {
        const team1Score = parseInt(matchContainer.querySelector(`input[name='biff_hole${i + 1}']`).value) || 0;
        const team2Score = parseInt(matchContainer.querySelector(`input[name='tails_hole${i + 1}']`).value) || 0;

        const strokeIndex = indices[i];
        const team1Adjusted = team1Score - Math.floor(players[team1][0].handicap / 18);
        const team2Adjusted = team2Score - Math.floor(players[team2][0].handicap / 18);

        if (team1Adjusted < team2Adjusted) team1Wins++;
        else if (team2Adjusted < team1Adjusted) team2Wins++;
    }

    const result = team1Wins > team2Wins ? team1 : team2;
    teamScores[result]++;

    return result;
}

// Update leaderboard
function updateLeaderboard() {
    const leaderboard = document.getElementById('leaderboard');
    leaderboard.innerHTML = `
        <h2>Leaderboard</h2>
        <p>Team Biff: ${teamScores['Team Biff']} points</p>
        <p>Team Tails: ${teamScores['Team Tails']} points</p>
    `;
}

// Initialize the day match
function initializeMatchDay(day, course, matchId) {
    const matchContainer = document.getElementById(matchId);
    generateHoles(matchContainer, course);

    const submitButton = matchContainer.querySelector('button');
    submitButton.addEventListener('click', function() {
        const result = calculateMatchResult(matchContainer, 'Team Biff', 'Team Tails', course);
        alert(`${result} wins the match!`);
        updateLeaderboard();
    });
}

// Initialize all days
function initializeTournament() {
    initializeMatchDay('Day 1', 'Santa Maria', 'match1');
    initializeMatchDay('Day 1', 'Santa Clara', 'match2');
    initializeMatchDay('Day 1', 'El Chaparral', 'match3');
    initializeMatchDay('Day 2', 'Santa Maria', 'match4');
    initializeMatchDay('Day 2', 'Santa Clara', 'match5');
    initializeMatchDay('Day 2', 'El Chaparral', 'match6');
    initializeMatchDay('Day 3', 'Santa Maria', 'match7');
    initializeMatchDay('Day 3', 'Santa Clara', 'match8');
    initializeMatchDay('Day 3', 'El Chaparral', 'match9');

    updateLeaderboard();
}

// Initialize tournament on page load
window.onload = initializeTournament;

