# 家庭記帳本 + CRUD + 登入系統 :wink:

![expense-tracker](https://github.com/RobertOu0213/expense-tracker/assets/115865251/f7d65087-abbf-49a0-aede-37331e2a12ff)



<h1> 功能 </h1>

1. 查看所有記帳

2. 新增記帳

4. 修改記帳

5. 刪除記帳

6. 用類別搜尋記帳
   
7. 加總記帳金額
     
8. 登入系統

# 開始使用

1. 請先確認有安裝 node.js 與 npm

2. 將專案 clone 到本地
```
https://github.com/RobertOu0213/expense-tracker
```

3. 在本地開啟之後，透過終端機進入資料夾，輸入：

```
npm install
```

4. 依據.env.example, 請自行帶入以下參數

```
   # Mongo db connect info
    MONGODB_URI=<YOUR OWN connect string>
    
   # Session secret
    SESSION_SECRET=<YOUR_SESSION_SECRET>

   # PORT=3000

```

5. 安裝完畢後，繼續輸入：

```
npm run start
```

6. 若看見此行訊息則代表順利運行，打開瀏覽器進入到以下網址

```
Listening on http://localhost:3000
```

# 7. =重要= 請輸入種子資料

```
npm run seed
```

 ### 種子資料使用者email及密碼如下

 email: user@gmail.com  
 password: 12345678


# 開發工具

- node 18.16.1
- Express 4.16.4
- Express-Handlebars 7.0.7
- mongoose 7.2.2
- 其餘工具請去package.json確認

