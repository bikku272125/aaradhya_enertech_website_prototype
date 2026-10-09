function doPost(e) {
  try {
    // Open the spreadsheet by its ID or active sheet if attached to the spreadsheet
    // Replace 'YOUR_SPREADSHEET_ID' if you are using an independent script.
    // If you created this script FROM the Google Sheet (Extensions > Apps Script),
    // SpreadsheetApp.getActiveSpreadsheet() will work perfectly.
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Check if headers exist, if not create them
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Phone", "Email", "Service", "Message"]);
      // Make headers bold
      sheet.getRange(1, 1, 1, 6).setFontWeight("bold");
    }
    
    // Extract parameters sent from the form via POST request
    var name = e.parameter.name || "";
    var phone = e.parameter.phone || "";
    var email = e.parameter.email || "";
    var service = e.parameter.service || "";
    var message = e.parameter.message || "";
    
    // Add timestamp
    var timestamp = new Date();
    
    // Append the data as a new row
    sheet.appendRow([timestamp, name, phone, email, service, message]);
    
    // Return a success JSON response
    return ContentService.createTextOutput(JSON.stringify({"result":"success", "data": JSON.stringify(e.parameter)}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error if something goes wrong
    return ContentService.createTextOutput(JSON.stringify({"result":"error", "error": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optionally handle GET requests just to verify the script is running
function doGet(e) {
  return ContentService.createTextOutput("Google Apps Script Web App is running. Use POST to submit data.");
}
