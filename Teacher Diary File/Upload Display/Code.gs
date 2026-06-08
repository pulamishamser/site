function doGet(e) {
  // Handle GET requests for fetching records
  if (e && e.parameter && e.parameter.action === 'getRecords') {
    return handleGetRecords();
  }
  
  // Handle direct file view
  if (e && e.parameter && e.parameter.action === 'viewFile' && e.parameter.fileId) {
    return viewFile(e.parameter.fileId);
  }
  
  // Default: return the HTML form
  return HtmlService.createTemplateFromFile('index').evaluate()
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setTitle("File Upload & Download Form")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doPost(e) {
  // Handle POST requests for file upload
  try {
    // Handle both JSON and form data
    let postData;
    if (e.parameter && e.parameter.data) {
      postData = JSON.parse(e.parameter.data);
    } else if (e.postData && e.postData.contents) {
      postData = JSON.parse(e.postData.contents);
    } else {
      throw new Error('No data received');
    }
    return handleFileUpload(postData);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleFileUpload(formdata) {
  try {
    const folderId = '1x07lWBUKB-rwaPWKHqe-ftdm9Xz8-MBL'; // Your folder ID
    const ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1ABWFbqxMBK1JTofjM21p02bN7U2WEDcLEgD0_sdsqV4/edit?gid=0#gid=0');
    const ws = ss.getSheets()[0];
    
    // Decode base64 file
    const fileData = Utilities.base64Decode(formdata.myfile.data);
    const fileBlob = Utilities.newBlob(fileData, getMimeType(formdata.myfile.name), formdata.myfile.name);
    
    const folder = DriveApp.getFolderById(folderId);
    const file = folder.createFile(fileBlob);
    
    // Set file sharing to anyone with link can view
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    const fileUrl = file.getUrl();
    const fileId = file.getId();
    
    // Add record to spreadsheet
    ws.appendRow([
      formdata.username,
      formdata.Contact_No,
      formdata.scl,
      new Date(),
      fileUrl,
      fileId
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        fileUrl: fileUrl,
        fileId: fileId,
        message: 'File uploaded successfully!'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleGetRecords() {
  try {
    const ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1ABWFbqxMBK1JTofjM21p02bN7U2WEDcLEgD0_sdsqV4/edit?gid=0#gid=0');
    const ws = ss.getSheets()[0];
    const data = ws.getDataRange().getValues();
    
    const records = [];
    // Start from row 1 (skip header row)
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] && data[i][0].toString().trim() !== '') {
        records.push({
          username: data[i][0] || 'N/A',
          Contact_No: data[i][1] || 'N/A',
          scl: data[i][2] || 'N/A',
          timestamp: data[i][3] || new Date(),
          fileUrl: data[i][4] || '',
          fileId: data[i][5] || ''
        });
      }
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, records: records }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function viewFile(fileId) {
  try {
    const file = DriveApp.getFileById(fileId);
    const blob = file.getBlob();
    const contentType = blob.getContentType();
    
    return ContentService
      .createTextOutput(blob.getDataAsString())
      .setMimeType(contentType);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: 'File not found' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getMimeType(filename) {
  const extension = filename.split('.').pop().toLowerCase();
  const mimeTypes = {
    'pdf': 'application/pdf',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'txt': 'text/plain',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  };
  return mimeTypes[extension] || 'application/octet-stream';
}