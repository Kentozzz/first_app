function memo() { //memoと言う関数の定義
  const submit = document.getElementById("submit"); //既読機能と同様にwindow（ページ）をload（読み込んだ時）に実行されるように記述します。
  submit.addEventListener("click", (e) => {  //addEventListener→イベントリスナー（イベントに合わせて実行させる関数）を登録するためのメソッドです。 ブラウザ上では、クリックやマウスホバー、キーボード入力など様々なイベントが発生。
    //submitをクリックしたらイベントが発火するように登録。
    //JavaScriptを勉強した際には大抵つまずくであろうfunction(e)の「e」。 これはイベントハンドラ、イベントリスナとして設定したコールバック関数が受け取ることができるイベントオブジェクトです。
    //イベントハンドラとは、JavaScriptで記述された、マウスの動きといった動作・操作に対して特定の処理を与えるための命令のこと
    const formData = new FormData(document.getElementById("form")); // id プロパティが指定された文字列に一致する要素を表す Element オブジェクトを返します。要素の ID は指定されていれば固有であることが求められているため、特定の要素にすばやくアクセスするには便利な方法です。
    const XHR = new XMLHttpRequest(); //XHRの宣言。非同期通信するもの。XHR以外のデータも受け取ることができる。データが到着したときにコールバックを受け取ります。
    XHR.open("POST", "/posts", true); //openメソッドにPOSTを指定して送信先のURLを指定します
    XHR.responseType = "json"; //json形式でレスポンスする
    XHR.send(formData); // sendメソッドにデータを渡して送信を実行する
    XHR.onload = () => { //xhr.onloadは受信成功した時に呼び出される
      const item = XHR.response.post;
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);

      formText.value = "";

      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
      } else {
        return null;
      }
    };

    XHR.onerror = function () {
      alert("Request failed");
    };

    e.preventDefault();
  })
}
window.addEventListener("load", memo);