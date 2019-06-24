/**
* 処理を振り分けるファイル
*
* h3Rmv6z3UIcEAJMUwegv4TDG
* 基本的に入力された単語の状態orスプレッドシートのoperatonFlagの状態で呼び出すactionを変化させる。
* Actionから渡された値と返信用トークンを元にSlackにメッセージを送信。
* controllers.gs 
*/
function controller(e) {
    var keyword=e.parameter.text;
    if(e.parameter.user_name === "slackbot")return;
    var app = SlackApp.create(token);
    if(dictSheet === ""){
        sendToSlackAction(msCreateSheet+msHelp,app);
        return;
    }
    var wordList = dictSheet.getRange(1,1,dictSheet.getLastRow()).getValues(); 
    var operationFlag = dictSheet.getRange("C2").getValue();
    if(keyword === "")return;
    var targetCmd = keyword.slice(0,3);
    var findCmd = keyword.slice(0,5);
    
    //url判定
    if(targetCmd === "url" && operationFlag != "L"){
        urlJudgeAction(dictSheet,keyword,operationFlag);
        return;
    }
    
    //入力値置換の結果""になっていないか判定
    if (keywordSplit(keyword) === "NG"){
        sendToSlackAction(msNoUseWord,app);
        return;
    }
    
    //操作フラグ判定　L（50件目以降のリスト表示） or I(追加）　U(意味更新） u(新単語更新）
    switch(operationFlag){
        //50件目以降のリストはnが入力された場合のみ次の50件を表示する。n以外が入力時は次の入力確認へ。
        case "L":  
            if(keyword === 'n'){
                var sendListMessage = listDefaultAction(dictSheet,wordList);
                sendToSlackAction(sendListMessage,app);
                return;
            }
            dictSheet.getRange("C2").setValue('F');
            dictSheet.getRange("C3").setValue(0);
            break;
        case "I":
            var sendInsertMessage = insertAction(dictSheet,keyword);
            sendToSlackAction(sendInsertMessage,app);
            return;
        case "U":
        case "u":
            var sendUpdateMessage=updateAction(dictSheet,keyword,wordList,operationFlag);
            sendToSlackAction(sendUpdateMessage,app);
            return;
    }
    
    //入力値判定 help(ヘルプ表示） list -a,ls -a(全件表示）list,　ls(0〜50件目までのリスト表示)　
    switch (keyword){
        case "help":
            var sendHelpMessage = helpAction();
            sendToSlackAction(sendHelpMessage,app);
            return;
        case "list -a":
        case "ls -a":
            var sendListAllMessage = listAllAction(wordList);
            sendToSlackAction(sendListAllMessage,app);
            return;
        case "list":
        case "ls":
            var sendListMessage = listDefaultAction(dictSheet,wordList);
            sendToSlackAction(sendListMessage,app);
            return;
    }
   
    //入力値判定2 前3文字がrm (削除）,　up (更新チェック)
    switch(targetCmd){
        case "rm ":
            var sendRemoveMessage =removeAction(dictSheet,keyword,wordList);
            sendToSlackAction(sendRemoveMessage,app);
            return;
        case "up ":
            var sendUpdateCheckMessage = updateCheckAction(dictSheet,keyword,wordList);
            sendToSlackAction(sendUpdateCheckMessage,app);
            return;
    }
   
   //入力値判定3 前5文字がfind　(文字一致検索)
    if(findCmd == "find "){
        var sendFindMessage =findAction(keyword,wordList);
        sendToSlackAction(sendFindMessage,app);
        return;
    }
    var sendMeanMessage = wordMeanAction(dictSheet,keyword,wordList)
    //入力値判定4 入力された単語が存在しない(単語の追加チェック）　存在する（単語と意味表示）
    if(sendMeanMessage===false){
        var sendInsertCheckMessage =insertCheckAction(dictSheet,keyword);
        sendToSlackAction(sendInsertCheckMessage,app);
        return;
    }
    sendToSlackAction(sendMeanMessage,app);
    return;
}