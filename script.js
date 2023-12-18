document.getElementById("partnerClubsBtn").addEventListener("click", function() {
    document.getElementById("partnerClubsDropdown").classList.toggle("show");
});

// Fetch club names from a spreadsheet
// This is a placeholder function. You'll need to implement the actual data fetching logic
function fetchClubNames() {
    // Fetch data from the spreadsheet
    // For example, using Google Sheets API or a similar service
    // Populate the 'partnerClubsDropdown' div with club names
}

// Call the function to populate the dropdown on page load
fetchClubNames();
