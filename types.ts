export enum ZodiacSign {
  Rat = "Tý (Chuột)",
  Ox = "Sửu (Trâu)",
  Tiger = "Dần (Hổ)",
  Cat = "Mão (Mèo)",
  Dragon = "Thìn (Rồng)",
  Snake = "Tỵ (Rắn)",
  Horse = "Ngọ (Ngựa)",
  Goat = "Mùi (Dê)",
  Monkey = "Thân (Khỉ)",
  Rooster = "Dậu (Gà)",
  Dog = "Tuất (Chó)",
  Pig = "Hợi (Lợn)"
}

export enum Gender {
  Male = "Nam Mạng",
  Female = "Nữ Mạng",
  Other = "Gia Chủ"
}

export interface FormData {
  fullName: string; 
  dob: string;      
  location: string; 
  currentJob: string; // New: Công việc hiện tại
  zodiac: string;
  gender: string;
  maritalStatus: string; // New: Tình trạng hôn nhân
  topic: string;
  language?: string; 
  superChat: string; 
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  preview: string;
  fullContent: string;
}

export interface GenerationResult {
  text: string;
  audioBase64?: string;
}
