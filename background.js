// 右クリック時に出る表示のやつ
chrome.contextMenus.create({
  "title": "short->通常URL変換",
  "type": "normal",
  "contexts": ["link"],
  "onclick": conversionURL()
});

// リンクで右クリックするとメニュー表示する
function conversionURL(info, tab) {
  return function (info, tab) {
    var shortsurl = info.linkUrl;

    // https://www.youtube.com/shorts/xxxxxxxxx
    // https://www.youtube.com/watch?v=xxxxxxxxx

    var sampleurl = 'https://www.youtube.com/shorts';

    // ショートのURLか判別
    if (shortsurl.indexOf(sampleurl) !== 0) {
      // ショート動画ではない時はそのままを返すようにする
      returnurl = shortsurl;
    } else {
      // [ 'https:', ''. 'www.youtube.com', 'shorts', 'xxxxxxxxx']
      spliturl = shortsurl.split('/');
      id = spliturl[4];

      returnurl = 'https://www.youtube.com/watch?v=' + id;
    }

    saveToClipboard(returnurl);  // 取得した文字列をクリップボードにコピーする関数に送る
  }
}


// 変換したURLをクリップボードに送る
function saveToClipboard(str) {
  var textArea = document.createElement("textarea");
  document.body.appendChild(textArea);
  textArea.value = str;
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}