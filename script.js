const apiKey = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
const sheetId = '1MdV4NpeuadDczDGOS7peYTFk7P3NGeZJQo20GzEjQtc';
const range = 'A:A'; // Assuming you want to fetch all data from column A

function fetchClubNames() {
    gapi.client.init({
        'apiKey': apiKey,
    }).then(function() {
        return gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: range,
        });
    }).then(function(response) {
        var range = response.result;
        if (range.values.length > 0) {
            appendClubNames(range.values);
        } else {
            console.log('No data found.');
        }
    }, function(reason) {
        console.error('error: ' + reason.result.error.message);
    });
}

function appendClubNames(clubs) {
    const dropdown = document.getElementById('partnerClubsDropdown');
    clubs.forEach(function(club) {
        let a = document.createElement('a');
        a.textContent = club[0]; // Assuming the club name is in the first column
        dropdown.appendChild(a);
    });
}

gapi.load('client', fetchClubNames);

document.getElementById("partnerClubsBtn").addEventListener("click", function() {
    document.getElementById("partnerClubsDropdown").classList.toggle("show");
});
