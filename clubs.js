const apiKey = 'AIzaSyDVRV0kt-4XTP5F7IVkpqwXRhkMek2IVBE';
const sheetId = '1H-1RYuhUos-jz7OBJyr5fqvICOI9AOOaZKgcH-phSPU';
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
    console.error('Google Sheets API error', reason);
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
