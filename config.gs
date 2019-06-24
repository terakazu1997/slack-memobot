/**
* WebhookURL、Token情報など流出したら危険な情報や重要な設定などを情報シートから取得した変数群を格納したファイル
*
* config.gs  
*/
var dictSheet = SpreadsheetApp.openById("1LSUfSPTG8dD7j9Jd8r49Cc-m-uOZONVYbKh_T6faaDQ").getSheetByName('辞書');
var infoSheet = SpreadsheetApp.openById("1LSUfSPTG8dD7j9Jd8r49Cc-m-uOZONVYbKh_T6faaDQ").getSheetByName('情報');
var token= infoSheet.getRange("A1").getValue();