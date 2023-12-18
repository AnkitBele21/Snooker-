const apiKey = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
const sheetId = '1MdV4NpeuadDczDGOS7peYTFk7P3NGeZJQo20GzEjQtc';
const range = 'clubs!A:D'; // Adjust the range to target the 'clubs' sheet

function fetchClubsData() {
    gapi.client.init({
        'apiKey': apiKey,
    }).then(function() {
        return gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: range,
        });
    }).then(function(response) {
        var clubs = response.result.values;
        if (clubs.length > 0) {
            appendClubs(clubs);
        } else {
            console.log('No data found.');
        }
    }, function(reason) {
        console.error('error: ' + (reason.result ? reason.result.error.message : 'Unknown error'));
    });
}

function appendClubs(clubs) {
    const clubListSection = document.querySelector('.club-list');
    clubs.forEach(function(club, index) {
        if (index === 0) return; // Skip header row if your sheet has one
        const clubDiv = document.createElement('div');
        clubDiv.className = 'club';
        clubDiv.innerHTML = `
            <img src="${club[3]}" alt="${club[0]}">
            <a href="#">${club[0]}</a>
        `;
        clubListSection.appendChild(clubDiv);
    });
}

gapi.load('client', fetchClubsData);
