const apiKey = 'AIzaSyDVRV0kt-4XTP5F7IVkpqwXRhkMek2IVBE';
const sheetId = '1H-1RYuhUos-jz7OBJyr5fqvICOI9AOOaZKgcH-phSPU';
const range = 'clubs!A:E'; // Adjusted range to include column E

function initClient() {
    gapi.client.init({
        'apiKey': apiKey,
        'discoveryDocs': ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    }).then(function() {
        fetchClubsData();
    }, function(error) {
        console.error('Error initializing Google API client', error);
    });
}

function fetchClubsData() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: range,
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
        if (index === 0) return; // Skip header row

        const clubCol = document.createElement('div');
        clubCol.className = 'col-lg-4 col-md-6 mb-4';

        const clubCard = document.createElement('div');
        clubCard.className = 'card h-100';

        const imageUrl = club[3] ? club[3] : 'placeholder-image.jpg'; // Default image if needed
        const clubPin = club[1]; // PIN from column B
        const clubLink = club[4]; // Link from column E

        clubCard.innerHTML = `
            <img src="${imageUrl}" class="card-img-top" alt="${club[0]}">
            <div class="card-body">
                <h5 class="card-title">${club[0]}</h5>
                <button onclick="verifyPin('${clubPin}', '${clubLink}')" class="btn btn-primary">More Info</button>
            </div>
        `;

        clubCol.appendChild(clubCard);
        clubListSection.appendChild(clubCol);
    });
}

function verifyPin(expectedPin, redirectLink) {
    const userPin = prompt("Please enter the PIN for this club:");
    if (userPin === expectedPin) {
        window.location.href = redirectLink;
    } else {
        alert("Incorrect PIN. Access denied.");
    }
}

gapi.load('client', initClient);
