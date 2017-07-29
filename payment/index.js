function buy(){
    // PaymentRequest APIをサポートしているかどうかを判定
    if (!window.PaymentRequest) {
        // 従来のフォームにリダイレクト
        location.href='/payment.html';
        return;
    }

    // 支払い方法を定義
    var methodData = [
    {     
        supportedMethods: ['basic-card'],
        data: {          
            supportedNetworks: ['visa', 'mastercard', 'jcb'],
            supportedTypes: ['credit']
        }
    }];

    // 購入の詳細
    var details =  {
        displayItems: [
        {
            label: "マンガ",
            amount: { currency: "JPY", value : "400" }
        },
        {
            label: "雑誌",
            amount: { currency: "JPY", value : "300" }
        },
        {
            label: "消費税",
            amount: { currency: "JPY", value : "56" } 
        }],
        total:  {
            label: "合計",
            amount: { currency: "JPY", value : "756" } 
        }
    };

    // 支払い情報として必要な項目を選択
    var options = {
        requestShipping: true,      // 住所
        requestPayername: true,     // 名前
        requestPayerEmail: true,    // Email
        requestPayerPhone: true     // 電話番号
    };

    // 支払いフォームを表示する
    var payment = new PaymentRequest(methodData, details, options);
    payment.show()
    // 支払いフォームの結果をPromiseで受けて、サーバーの処理を呼び出す
    .then(result => {
        return process(result).then(response => {
            if (response.status === 200) {
                // 支払い成功のUIを表示する
                return result.complete('成功');
            } else {
                // 支払い失敗のUIを表示する
                return result.complete('失敗');
            }
        }).catch((err) => {
            console.error('要求が拒否されました', err.message)
        });
    });
}