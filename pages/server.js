// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('.'));

app.post('/update-bookingdata', (req, res) => {
  const { code } = req.body;
           const filePath = path.join(__dirname, 'api', 'bookingdata.ts'); 
  
  try {
    // 读取原文件
    const originalContent = fs.readFileSync(filePath, 'utf8');
    
    // 替换函数内容 - 更精确的正则表达式
    const updatedContent = originalContent.replace(
      /\/\/ 业务逻辑：根据 Studio 和 Room 判断 Studio cost[\s\S]*?return 1200 \* durationHours;[\s\S]*?}\n\n\/\/ 业务逻辑：根据 Studio 和 Room 判断 Max participants[\s\S]*?return 5;[\s\S]*?}/,
      code
    );
    
    // 写入文件
    fs.writeFileSync(filePath, updatedContent);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5004, () => {
  console.log('Studio Manager running on http://localhost:5004');
});
