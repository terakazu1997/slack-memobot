//Discordに表示するメッセージをスプレッドシートの【メッセージシート】から取得した変数群
var messageSheet = SpreadsheetApp.openById("1LSUfSPTG8dD7j9Jd8r49Cc-m-uOZONVYbKh_T6faaDQ").getSheetByName('メッセージ');
var msWord = messageSheet.getRange("A1").getValue()
var msMean = messageSheet.getRange("A2").getValue();
var msInsertUrl = messageSheet.getRange("A3").getValue();
var msInsertMean = messageSheet.getRange("A4").getValue();
var msUpMean = messageSheet.getRange("A5").getValue();
var msInsertWord = messageSheet.getRange("A6").getValue();
var msUpNewMean = messageSheet.getRange("A7").getValue();
var msNGUrl = messageSheet.getRange("A8").getValue();
var msNoInsertWord = messageSheet.getRange("A9").getValue();
var msNoUpWord = messageSheet.getRange("A10").getValue();
var msHelp = messageSheet.getRange("A11").getValue();
var msList = messageSheet.getRange("A12").getValue();
var msRemove = messageSheet.getRange("A13").getValue();
var msNoRemove = messageSheet.getRange("A14").getValue();
var msNoUseWord = messageSheet.getRange("A15").getValue(); 
var msNextWord = messageSheet.getRange("A16").getValue(); 
var msDisplayCnt = messageSheet.getRange("A17").getValue(); 
var msDisplayResultCnt = messageSheet.getRange("A18").getValue();
var msListDefault = messageSheet.getRange("A19").getValue();
var msFindWord = messageSheet.getRange("A20").getValue();
var msNoFindWord = messageSheet.getRange("A21").getValue();
var msFindCnt = messageSheet.getRange("A22").getValue();
var msUpWord = messageSheet.getRange("A23").getValue();
var msUpNewWord = messageSheet.getRange("A24").getValue();
var msFindPromotion = messageSheet.getRange("A25").getValue();
var msHelpPromotion = messageSheet.getRange("A26").getValue();
var msCreateSheet = messageSheet.getRange("A27").getValue();
var msExistsWord = messageSheet.getRange("A28").getValue();