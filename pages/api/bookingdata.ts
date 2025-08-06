import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SHEET_ID = process.env.GOOGLE_SHEET_ID as string;

// 兼容本地和部署环境的 Service Account 密钥获取
const getGoogleCredentials = () => {
  // 优先使用环境变量（部署环境）
  const serviceAccountEnv = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (serviceAccountEnv) {
    return JSON.parse(serviceAccountEnv);
  }
  
  // 回退到文件方式（本地开发）
  try {
    const keyFile = path.join(process.cwd(), 'google-service-account.json');
    return JSON.parse(fs.readFileSync(keyFile, 'utf8'));
  } catch (error) {
    throw new Error('Neither GOOGLE_SERVICE_ACCOUNT_KEY environment variable nor google-service-account.json file found');
  }
};

const auth = new google.auth.GoogleAuth({
  credentials: getGoogleCredentials(),
  scopes: SCOPES,
});

// 业务逻辑：根据 Event 判断 ClassType
function getClassType(event: string): string {
  if (['Basic', 'Advance'].includes(event)) return 'Regular';
  if (event === 'Workshop') return 'Special';
  if (event === 'Rehearsal') return 'Practice';
  return 'Regular';
}

// 业务逻辑：根据 Studio 和 Room 判断 Max participants（学生人数 = 房间容量 - 1）
function getMaxParticipants(studio: string, room: string): number {
  // 提取 Studio 名称
  const studioName = studio.split(',')[0].trim();
  
  // BUZZ池袋西口PARK
  if (studioName === 'BUZZ池袋西口PARK') {
    switch (room) {
      case 'D':
        return 7; // 25.0m²，适合8人，学生7人
      case 'E':
        return 5; // 20.0m²，适合6人，学生5人
      case 'F':
        return 5; // 21.5m²，适合6人，学生5人
      default:
        return 5; // 默认用较小的房间容量
    }
  }
  
  // BUZZ池袋西口タワー
  if (studioName === 'BUZZ池袋西口タワー') {
    switch (room) {
      case '101':
        return 9; // 较大房间，适合10人，学生9人
      case '201':
        return 7; // 中等房间，适合8人，学生7人
      case '202':
        return 5; // 较小房间，适合6人，学生5人
      case '301':
        return 7; // 中等房间，适合8人，学生7人
      case '302':
        return 7; // 中等房间，适合8人，学生7人
      default:
        return 7; // 默认中等房间容量
    }
  }
  
  // studio worcle Ikebukuroten
  if (studioName === 'studio worcle Ikebukuroten' || studioName === 'ワークル池袋') {
    switch (room) {
      case '201':
      case '202':
      case '402':
      case '403':
        return 10; // 30m²，最大10人（已减1）
      case '301':
      case '302':
      case '303':
        return 5; // 20m²，最大5人（已减1）
      default:
        return 5; // 默认值
    }
  }
  
  return 5; // 其他 Studio 默认值（学生5人）
}

// 业务逻辑：根据 Studio 和 Room 判断 Studio cost（使用晚上价格）
function getStudioCost(studio: string, room: string, startTime: string, endTime: string, classType: string): number {
  // 提取 Studio 名称（第一个逗号前的内容）
  const studioName = studio.split(',')[0].trim();
  
  // 计算时长（小时）
  // 处理时间格式，确保兼容 "7:00 PM" 和 "19:00" 格式
  const parseTime = (timeStr: string) => {
    // 如果包含 AM/PM，直接解析
    if (timeStr.includes('AM') || timeStr.includes('PM')) {
      return new Date(`2000-01-01 ${timeStr}`);
    }
    // 否则假设是 24 小时格式
    return new Date(`2000-01-01 ${timeStr}`);
  };
  
  const start = parseTime(startTime);
  const end = parseTime(endTime);
  const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  // 转换为半小时单位（因为价格是按半小时计算的）
  const durationHalfHours = durationHours * 2;
  
  console.log(`StudioCost 计算: ${studioName}, ${room}, ${startTime}-${endTime}, 时长: ${durationHours}小时 = ${durationHalfHours}个半小时`);
  
  // BUZZ池袋西口PARK - 晚上价格（18:00-23:00）按半小时计算
  if (studioName === 'BUZZ池袋西口PARK') {
    switch (room) {
      case 'D':
        return 1100 * durationHalfHours; // 晚上D价格，1100円/半小时
      case 'E':
        return 900 * durationHalfHours; // 晚上E价格，900円/半小时
      case 'F':
        return 900 * durationHalfHours; // 晚上F价格，900円/半小时
      default:
        return 900 * durationHalfHours; // 默认用 E 房间晚上价格
    }
  }
  
  // BUZZ池袋西口タワー - 晚上价格（18:00-23:00）按半小时计算
  if (studioName === 'BUZZ池袋西口タワー') {
    switch (room) {
      case '101':
        return 1000 * durationHalfHours; // 晚上101价格，1000円/半小时
      case '201':
        return 1000 * durationHalfHours; // 晚上201价格，1000円/半小时
      case '202':
        return 750 * durationHalfHours; // 晚上202价格，750円/半小时
      case '301':
        return 1000 * durationHalfHours; // 晚上301价格，1000円/半小时
      case '302':
        return 1000 * durationHalfHours; // 晚上302价格，1000円/半小时
      default:
        return 1000 * durationHalfHours; // 默认晚上101价格，1000円/半小时
    }
  }
  
  // studio worcle Ikebukuroten - 晚上价格（18:00-23:00）按半小时计算
  if (studioName === 'studio worcle Ikebukuroten' || studioName === 'ワークル池袋') {
    switch (room) {
      case '201':
      case '202':
      case '402':
      case '403':
        return 1100 * durationHalfHours; // 30m²，1100円/半小时
      case '301':
      case '302':
      case '303':
        return 800 * durationHalfHours; // 20m²，800円/半小时
      default:
        return 800 * durationHalfHours; // 默认价格
    }
  }
  
  // 其他 Studio 的默认晚上价格
  return 1000 * durationHalfHours; // 默认晚上1000円/半小时
}

// 修改 calculatePrice 函数，用 EventID 匹配
function calculatePrice(classType: string, eventID: string, allBookings: any[]): number {
  // 统计同一 EventID 的报名人数（不算已取消的）
  const eventCount = allBookings.filter(booking => {
    const bookingEventID = booking[14]; // O列的EventID
    return bookingEventID === eventID && booking[9] !== 'TRUE'; // 不算已取消的
  }).length;

  if (classType === 'Regular') {
    // 当前报名是第 eventCount + 1 个人
    return (eventCount + 1) >= 4 ? 2500 : 3000;
  }
  return 3000; // Special/Practice 默认价格
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const sheets = google.sheets({ version: 'v4', auth: await auth.getClient() as any });

    if (req.method === 'GET') {
      // 读取所有预约（包含P列Note和Q列Introducer）
      const result = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: 'BettyDance!A2:Q', // 使用BettyDance工作表，包含Note列和Introducer列
      });
      
      const bookings = (result.data.values || []).map(row => ({
        date: row[0],
        event: row[1],
        startTime: row[2],
        endTime: row[3],
        maxParticipants: row[4],
        nickName: row[5], // 保持 nickName 作为内部字段名
        classType: row[6],
        status: row[7],
        attended: row[8] === 'TRUE',
        cancelled: row[9] === 'TRUE',
        studio: row[10],
        room: row[11],
        price: row[12],
        studioCost: row[13],
        eventID: row[14], // O列的EventID
        note: row[15],    // P列的Note
        introducer: row[16] || '', // Q列的Introducer（推荐人）
      }));
      
      res.status(200).json(bookings);
    } 
    
    else if (req.method === 'POST') {
      // 新增预约
      const { 
        event, 
        date, 
        startTime, 
        endTime, 
        nickName, 
        studio, 
        room,
        note,
        introducer 
      } = req.body;

      // 验证必需字段
      if (!event || !date || !startTime || !endTime || !nickName || !studio || !room) {
        console.error('Missing required fields:', { event, date, startTime, endTime, nickName, studio, room });
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // 1. 先读取现有数据（包含P列Note和Q列Introducer）
      const existingData = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: 'BettyDance!A2:Q', // 使用BettyDance工作表，包含Note列和Introducer列
      });
      
      // 2. 生成 EventID（和 Google Sheets 公式一致）
      const eventID = `${date.replace(/\//g, '')}${event.toLowerCase()}`;
      
      // 3. 统计同一 Event 的报名人数
      const existingRows = existingData.data.values || [];
      const eventCount = existingRows
        .filter(row => {
          const rowEventID = row[14]; // O列的EventID
          return rowEventID === eventID && row[9] !== 'TRUE'; // 不算已取消的
        })
        .length + 1; // +1 是因为要加上当前这个新报名

      // 4. 计算所有业务逻辑字段
      const classType = getClassType(event);
      const maxParticipants = getMaxParticipants(studio, room);
      const status = eventCount >= maxParticipants ? 'Full' : 'Open';
      const price = calculatePrice(classType, eventID, existingRows);
      const studioCost = getStudioCost(studio, room, startTime, endTime, classType);

      // 5. 写入新行（包含P列Note和Q列Introducer）
      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: 'BettyDance!A:Q', // 使用BettyDance工作表，包含Note列和Introducer列
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[
            date,           // A: Date
            event,          // B: Event
            startTime,      // C: Start Time
            endTime,        // D: End Time
            maxParticipants, // E: Max participants
            nickName,       // F: Nick Name
            classType,      // G: Class Type
            status,         // H: Status
            false,          // I: Attended (布尔值会自动转换为复选框)
            false,          // J: Cancelled (布尔值会自动转换为复选框)
            studio,         // K: Studio
            room,           // L: Room
            price,          // M: Price
            studioCost,     // N: Studio cost
            eventID,        // O: Event ID
            note,           // P: Note（备注信息）
            introducer || '', // Q: Introducer（推荐人）
          ]],
        },
      });

      res.status(200).json({ success: true, eventCount, status, price });
    }
    
    else if (req.method === 'PUT') {
      // 更新签到或取消状态
      const { date, event, startTime, nickName, field, value, rowIndex } = req.body;
      
      // 计算列字母（A=0, B=1, ...）
      const columnMap = { attended: 'I', cancelled: 'J' };
      const column = columnMap[field as keyof typeof columnMap];
      
      if (!column) {
        return res.status(400).json({ error: 'Invalid field' });
      }

      // 如果传入了具体的booking信息，使用精确匹配
      if (date && event && startTime && nickName) {
        // 读取所有数据以找到匹配的行
        const result = await sheets.spreadsheets.values.get({
          spreadsheetId: SHEET_ID,
          range: 'BettyDance!A2:Q', // 从第2行开始
        });
        
        const rows = result.data.values || [];
        let targetRowIndex = -1;
        
        // 查找匹配的行
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          if (row[0] === date &&        // A列：Date
              row[1] === event &&       // B列：Event
              row[2] === startTime &&   // C列：StartTime
              row[5] === nickName) {    // F列：NickName
            targetRowIndex = i + 2;     // +2 因为数据从第2行开始，且i是0-based
            break;
          }
        }
        
        if (targetRowIndex === -1) {
          return res.status(404).json({ error: 'Booking not found' });
        }
        
        // 更新找到的行
        await sheets.spreadsheets.values.update({
          spreadsheetId: SHEET_ID,
          range: `BettyDance!${column}${targetRowIndex}`,
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [[value]], // 直接使用布尔值
          },
        });
      } 
      // 兼容旧的rowIndex方式（为了向后兼容）
      else if (rowIndex !== undefined) {
        await sheets.spreadsheets.values.update({
          spreadsheetId: SHEET_ID,
          range: `BettyDance!${column}${rowIndex + 2}`,
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [[value]],
          },
        });
      } else {
        return res.status(400).json({ error: 'Missing booking identification data' });
      }

      res.status(200).json({ success: true });
    }
    
  } catch (error) {
    console.error('Google Sheets API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 