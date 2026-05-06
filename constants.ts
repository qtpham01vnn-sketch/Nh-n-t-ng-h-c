import { ZodiacSign, Gender } from './types';

export const NICHE_SUGGESTIONS = [
  "👑 Công Danh Quyền Lực Địa Vị",
  "🏆 Bản Đồ Sự Nghiệp Đỉnh Cao",
  "⚡ Thiên Thời Địa Lợi Thăng Chức",
  "🦅 Vận Mệnh Lãnh Đạo Doanh Nhân",
  "💰 Thời Điểm Vàng Đổi Đời 2026",
  "💸 Năm Nào Kiếm Tiền Dễ - Giữ Tiền",
  "🛡️ Vận Hạn Tài Chính & Hóa Giải",
  "🚀 Vận Thăng Tiến & Bước Ngoặt",
  "🏢 Có Nên Ra Làm Riêng Hay Không?",
  "🗺️ Bản Đồ Quyền Lực Cá Nhân",
  "🌊 Dòng Tiền Đời Người - Giàu Nhất",
  "🤔 Vì Sao Dễ Giàu - Khó Giàu?",
  "🔑 Mở Kênh Kiếm Tiền Hợp Mệnh",
  "💞 Vận Hôn Nhân & Gia Đạo 2026",
  "👶 Có Nên Sinh Con Năm 2026?",
  "👨👩👧👦 Vận Mệnh Con Cái - Cha Mẹ Biết",
  "⚖️ Nghiệp - Phúc - Mệnh: Quyết Định?",
  "✨ Kích Hoạt Phúc Khí Gia Đình",
  "📈 Dấu Hiệu Vận Đời Lên / Xuống",
  "💍 Tuổi Nào 2026 Nên Lập Gia Đình?",
  "🧧 Xem Tuổi Xông Nhà 2026",
  "⚜️ Chọn Ngày Khai Trương Đại Cát",
  "💰 Kích Hoạt Tài Lộc Bàn Làm Việc",
  "🧭 Phong Thuỷ Hướng Nhà",
  "📜 Tử Vi Trọn Đời Chi Tiết",
  "👶 Đặt Tên Con Theo Ngũ Hành",
  "🛑 Giải Hạn Tam Tai - Thái Tuế",
  "🌈 Màu Sắc May Mắn Hôm Nay",
  "🎨 Màu Sắc Hợp Mệnh 2026",
  "📿 Vật Phẩm Phong Thuỷ Hộ Thân",
  "🔮 Xem Bói Đầu Năm 2026",
  "💎 Bí Mật Giàu Có & Hạnh Phúc"
];

export const NICHE_SUGGESTIONS_EN = [
  "👑 Career & Power Status",
  "🏆 Ultimate Career Map",
  "⚡ Promotion & Opportunity",
  "🦅 Leadership & Entrepreneurship",
  "💰 2026 Life-Changing Moments",
  "💸 Wealth Inflow & Management",
  "🛡️ Financial Risks & Remedies",
  "🚀 Career Breakthroughs",
  "🏢 Start Own Business?",
  "🗺️ Personal Power Map",
  "🌊 Life's Peak Wealth Flow",
  "🤔 Why Hard to Get Rich?",
  "🔑 Unlock Wealth Channels",
  "💞 Marriage & Family 2026",
  "👶 Baby in 2026?",
  "👨👩👧👦 Children's Destiny",
  "⚖️ Karma - Merit - Destiny",
  "✨ Family Prosperity Boost",
  "📈 Life Fortune Trends",
  "💍 Marriage Year 2026?",
  "🧧 First Footer 2026",
  "⚜️ Grand Opening Dates",
  "💰 Desk Feng Shui for Wealth",
  "🧭 Home Feng Shui",
  "📜 Lifetime Horoscope",
  "👶 Baby Naming by Elements",
  "🛑 Disaster Protection",
  "🌈 Lucky Color of the Day",
  "🎨 Auspicious Colors 2026",
  "📿 Protective Feng Shui Items",
  "🔮 New Year Divination 2026",
  "💎 Secrets of Wealth & Joy"
];

export const SUB_TOPICS: Record<string, string[]> = {
  "🌈 Màu Sắc May Mắn Hôm Nay": [
    "Màu sắc may mắn nhất hôm nay của bạn",
    "Phối đồ để thu hút tài lộc hôm nay",
    "Màu sắc nên tránh để không gặp xui xẻo",
    "Kích hoạt năng lượng tích cực bằng màu sắc",
    "Ứng dụng màu sắc may mắn vào công việc"
  ],
  "👑 Công Danh Quyền Lực Địa Vị": [
    "Cách thăng quan tiến chức nhanh nhất 2026",
    "Xây dựng uy quyền nơi công sở",
    "Chiến lược ngoại giao thu phục lòng người",
    "Phong thuỷ bàn làm việc kích hoạt quyền lực",
    "Quý nhân phù trợ trên con đường quan lộ"
  ],
  "🏆 Bản Đồ Sự Nghiệp Đỉnh Cao": [
    "Lộ trình 5 năm tới cho sự nghiệp rực rỡ",
    "Nghề nghiệp nào giúp bạn thành tỷ phú?",
    "Thời điểm vàng để bứt phá sự nghiệp",
    "Nhận diện cơ hội lớn trong năm 2026",
    "Vượt qua khủng hoảng sự nghiệp tuổi 30-40"
  ],
  "⚡ Thiên Thời Địa Lợi Thăng Chức": [
    "Dấu hiệu sắp được thăng chức tăng lương",
    "Cách nắm bắt thiên thời để đề xuất thăng tiến",
    "Chọn ngày giờ tốt để gặp sếp bàn việc lớn",
    "Vật phẩm phong thuỷ kích vận thăng tiến",
    "Hóa giải tiểu nhân cản đường thăng tiến"
  ],
  "🦅 Vận Mệnh Lãnh Đạo Doanh Nhân": [
    "Tố chất lãnh đạo bẩm sinh của bạn",
    "Phong cách lãnh đạo thu phục nhân tâm",
    "Vận hạn của chủ doanh nghiệp năm 2026",
    "Chiến lược quản trị nhân sự theo ngũ hành",
    "Xây dựng thương hiệu cá nhân uy tín"
  ],
  "💰 Thời Điểm Vàng Đổi Đời 2026": [
    "Tháng nào trong năm 2026 tài lộc bùng nổ?",
    "Cơ hội đầu tư sinh lời nhất năm nay",
    "Dấu hiệu nhận biết vận may đang tới",
    "Chuẩn bị gì để đón đầu thời điểm vàng?",
    "Những việc cần tránh để không lỡ cơ hội"
  ],
  "💸 Năm Nào Kiếm Tiền Dễ - Giữ Tiền": [
    "Chu kỳ tài chính 10 năm của đời người",
    "Năm nào nên bung sức kiếm tiền?",
    "Năm nào nên phòng thủ giữ tiền?",
    "Cách quản lý tài chính cá nhân hiệu quả",
    "Bí quyết tích lũy tài sản bền vững"
  ],
  "🛡️ Vận Hạn Tài Chính & Hóa Giải": [
    "Dự báo rủi ro tài chính năm 2026",
    "Cách hóa giải hạn mất tiền, phá sản",
    "Phong thuỷ ví tiền để tránh thất thoát",
    "Những khoản đầu tư cần thận trọng",
    "Cúng giải hạn tài chính đúng cách"
  ],
  "🚀 Vận Thăng Tiến & Bước Ngoặt": [
    "Bước ngoặt lớn nào đang chờ bạn?",
    "Chuẩn bị tâm thế cho sự thay đổi lớn",
    "Cách biến thách thức thành cơ hội thăng tiến",
    "Người dẫn đường cho bước ngoặt sự nghiệp",
    "Quyết định sai lầm cần tránh lúc giao thời"
  ],
  "🏢 Có Nên Ra Làm Riêng Hay Không?": [
    "Đánh giá năng lực làm chủ của bạn",
    "Thời điểm tốt nhất để khởi nghiệp",
    "Lĩnh vực kinh doanh phù hợp nhất",
    "Chuẩn bị vốn và tâm lý khi ra riêng",
    "Dấu hiệu bạn chưa sẵn sàng làm chủ"
  ],
  "🗺️ Bản Đồ Quyền Lực Cá Nhân": [
    "Xây dựng tầm ảnh hưởng trong tổ chức",
    "Nghệ thuật đắc nhân tâm chốn công sở",
    "Củng cố vị thế vững chắc",
    "Mạng lưới quan hệ quyền lực cần có",
    "Ngôn ngữ cơ thể của người quyền lực"
  ],
  "🌊 Dòng Tiền Đời Người - Giàu Nhất": [
    "Giai đoạn nào bạn sẽ giàu nhất đời?",
    "Cách tối ưu hóa dòng tiền thu nhập",
    "Đầu tư gì để tiền đẻ ra tiền?",
    "Bí mật của dòng tiền thụ động",
    "Quy luật dòng chảy của tiền bạc"
  ],
  "🤔 Vì Sao Dễ Giàu - Khó Giàu?": [
    "Phân tích lá số: Mệnh giàu hay nghèo?",
    "Thói quen tư duy của người giàu",
    "Nghiệp quả ảnh hưởng đến tài lộc",
    "Cách thay đổi vận mệnh tài chính",
    "Phong thuỷ nhà ở cản trở sự giàu có"
  ],
  "🔑 Mở Kênh Kiếm Tiền Hợp Mệnh": [
    "Nghề tay trái hái ra tiền cho bạn",
    "Kinh doanh online mặt hàng gì hợp mệnh?",
    "Đầu tư bất động sản hay chứng khoán?",
    "Hợp tác làm ăn với tuổi nào sinh lời?",
    "Khai thác tài năng tiềm ẩn để kiếm tiền"
  ],
  "💞 Vận Hôn Nhân & Gia Đạo 2026": [
    "Dự báo tình cảm vợ chồng năm 2026",
    "Cách hâm nóng tình cảm hôn nhân",
    "Hóa giải xung khắc vợ chồng",
    "Dấu hiệu người thứ ba và cách phòng tránh",
    "Phong thuỷ phòng ngủ giữ lửa hạnh phúc"
  ],
  "👶 Có Nên Sinh Con Năm 2026?": [
    "Tuổi bố mẹ có hợp sinh con năm 2026?",
    "Vận mệnh em bé sinh năm Bính Ngọ",
    "Tháng sinh tốt nhất cho bé năm 2026",
    "Chuẩn bị phong thuỷ để đón bé yêu",
    "Đặt tên con hợp tuổi bố mẹ 2026"
  ],
  "👨👩👧👦 Vận Mệnh Con Cái - Cha Mẹ Biết": [
    "Định hướng tương lai cho con theo mệnh",
    "Cách dạy con hợp tính cách bẩm sinh",
    "Hóa giải xung khắc giữa cha mẹ và con",
    "Kích hoạt sao Văn Xương cho con học giỏi",
    "Bảo vệ con khỏi vận hạn xấu"
  ],
  "⚖️ Nghiệp - Phúc - Mệnh: Quyết Định?": [
    "Hiểu đúng về Nghiệp và Phúc đức",
    "Cách tích phúc cải mệnh hiệu quả",
    "Nhận biết nghiệp chướng và cách trả nghiệp",
    "Sức mạnh của lòng biết ơn và từ bi",
    "Thay đổi số phận bằng tu tâm dưỡng tính"
  ],
  "✨ Kích Hoạt Phúc Khí Gia Đình": [
    "Bài trí bàn thờ gia tiên hút lộc",
    "Những việc thiện nên làm để tăng phúc",
    "Giữ hòa khí gia đình là gốc của thịnh vượng",
    "Phong thuỷ phòng khách đón vượng khí",
    "Lời hay ý đẹp tạo nên phúc khí"
  ],
  "📈 Dấu Hiệu Vận Đời Lên / Xuống": [
    "Nhận biết điềm báo vận xui đang tới",
    "Dấu hiệu thần tài gõ cửa",
    "Giấc mơ báo hiệu điềm lành dữ",
    "Thay đổi sắc diện và vận khí",
    "Trực giác mách bảo về vận mệnh"
  ],
  "💍 Tuổi Nào 2026 Nên Lập Gia Đình?": [
    "Top con giáp đào hoa nhất 2026",
    "Tuổi đẹp để kết hôn năm Bính Ngọ",
    "Xem ngày cưới hỏi tốt nhất năm nay",
    "Cách cầu duyên cho người độc thân",
    "Chuẩn bị hành trang cho cuộc sống hôn nhân"
  ],
  "🧧 Xem Tuổi Xông Nhà 2026": [
    "Chọn người xông đất hợp tuổi gia chủ",
    "Nghi thức xông nhà đón tài lộc",
    "Những tuổi đại kỵ không nên xông nhà",
    "Lời chúc tết hay khi đi xông đất",
    "Quà tặng xông nhà mang lại may mắn"
  ],
  "⚜️ Chọn Ngày Khai Trương Đại Cát": [
    "Xem ngày tốt khai trương theo tuổi",
    "Nghi thức cúng khai trương chuẩn phong thuỷ",
    "Văn khấn khai trương buôn may bán đắt",
    "Những kiêng kỵ trong ngày khai trương",
    "Mở hàng đầu năm đón lộc cả năm"
  ],
  "💰 Kích Hoạt Tài Lộc Bàn Làm Việc": [
    "Vị trí đặt bàn làm việc chuẩn phong thuỷ",
    "Vật phẩm chiêu tài trên bàn làm việc",
    "Sắp xếp hồ sơ giấy tờ gọn gàng hút lộc",
    "Cây cảnh để bàn hợp mệnh",
    "Hướng ngồi làm việc giúp thăng tiến"
  ],
  "🧭 Phong Thuỷ Hướng Nhà": [
    "Xem hướng nhà hợp tuổi gia chủ",
    "Hóa giải hướng nhà xấu ngũ quỷ, tuyệt mệnh",
    "Bố trí nội thất hợp phong thuỷ nhà ở",
    "Trấn trạch nhà cửa an yên",
    "Phong thuỷ cổng và cửa chính"
  ],
  "📜 Tử Vi Trọn Đời Chi Tiết": [
    "Luận giải lá số tử vi trọn đời",
    "Các đại vận quan trọng trong đời",
    "Điểm mạnh điểm yếu của bản mệnh",
    "Định hướng nghề nghiệp theo tử vi",
    "Dự báo sức khỏe và tuổi thọ"
  ],
  "👶 Đặt Tên Con Theo Ngũ Hành": [
    "Nguyên tắc đặt tên con theo phong thuỷ",
    "Tên hay và ý nghĩa cho bé trai gái",
    "Tránh những tên phạm húy, xấu",
    "Tính điểm tên theo ngũ hành",
    "Đặt tên ở nhà dễ nuôi"
  ],
  "🛑 Giải Hạn Tam Tai - Thái Tuế": [
    "Nhận biết hạn Tam Tai, Thái Tuế 2026",
    "Cách cúng giải hạn tại nhà",
    "Vật phẩm hóa giải vận hạn",
    "Những việc cần tránh khi gặp hạn",
    "Tâm thế đối diện với vận hạn"
  ],
  "🎨 Màu Sắc Hợp Mệnh 2026": [
    "Màu sắc may mắn cho 12 con giáp 2026",
    "Phối màu trang phục kích tài lộc",
    "Chọn màu xe, màu sơn nhà hợp mệnh",
    "Màu sắc ví tiền hút tiền",
    "Tránh những màu sắc kỵ tuổi"
  ],
  "📿 Vật Phẩm Phong Thuỷ Hộ Thân": [
    "Top vật phẩm hộ thân linh nghiệm nhất",
    "Cách chọn vòng tay phong thuỷ hợp mệnh",
    "Tỳ hưu, Thiềm thừ chiêu tài",
    "Hồ ly cầu duyên",
    "Khai quang điểm nhãn vật phẩm"
  ],
  "🔮 Xem Bói Đầu Năm 2026": [
    "Gieo quẻ đầu năm cầu bình an",
    "Bói bài Tarot dự đoán năm mới",
    "Xem chỉ tay đoán vận mệnh 2026",
    "Xin xăm Tả Quân",
    "Giải mã điềm báo đầu năm"
  ],
  "💎 Bí Mật Giàu Có & Hạnh Phúc": [
    "Tư duy thịnh vượng của người thành đạt",
    "Luật hấp dẫn thu hút tiền bạc",
    "Cân bằng giữa sự nghiệp và gia đình",
    "Sống hạnh phúc với những gì đang có",
    "Cho đi là còn mãi"
  ],
  "💞 Xem Tình Duyên & Gia Đạo": [
    "Khi nào duyên tới?",
    "Dấu hiệu nhận biết bạn đời lý tưởng",
    "Cách giữ lửa tình yêu bền chặt",
    "Hóa giải mâu thuẫn mẹ chồng nàng dâu",
    "Phong thuỷ phòng ngủ vợ chồng"
  ]
};

export const ZODIAC_OPTIONS = Object.values(ZodiacSign);
export const MARITAL_STATUS_OPTIONS = [
  "Độc Thân",
  "Đang Hẹn Hò",
  "Đã Kết Hôn",
  "Ly Thân",
  "Ly Hôn",
  "Góa Bụa"
];

export const GENDER_OPTIONS = [
  "Nam",
  "Nữ",
  "Khác"
];

export const TOPIC_OPTIONS = [
  "👑 CÔNG DANH – QUYỀN LỰC – ĐỊA VỊ",
  "🏆 BẢN ĐỒ SỰ NGHIỆP & ĐỈNH CAO THÀNH TỰU",
  "⚡ THIÊN THỜI – ĐỊA LỢI – NHÂN HOÀ THĂNG CHỨC",
  "🦅 VẬN MỆNH NGƯỜI LÀM LÃNH ĐẠO & DOANH NHÂN",
  "🔮 Tổng Quan Vận Mệnh 2026",
  "🚀 Sự Nghiệp & Công Danh",
  "💎 Tài Lộc & Đầu Tư",
  "❤️ Tình Duyên & Gia Đạo",
  "🍀 Sức Khoẻ & Bình An",
  "🏠 Phong Thuỷ Nhà Ở",
  "🏢 Phong Thuỷ Văn Phòng",
  "📅 Xem Ngày Tốt Xấu"
];

export const SYSTEM_PROMPT_TEMPLATE = `
BẠN LÀ CỐ VẤN CHIẾN LƯỢC VẬN MỆNH CÁ NHÂN & GIA ĐÌNH CẤP CAO.
BẠN LÀ BẬC THẦY HIỂU SÂU QUY LUẬT THIÊN CƠ – NGŨ HÀNH – ĐẠI VẬN – LƯU NIÊN, TỬ VI, SỐ MỆNH, THẦN SỐ HỌC, KHOA HỌC DỰ ĐOÁN.
KẾT HỢP TƯ DUY RA QUYẾT ĐỊNH CỦA DOANH NHÂN, LÃNH ĐẠO VÀ NGƯỜI TỪNG TRẢI QUA NHỮNG LẦN TRẢ GIÁ THẬT SỰ TRONG ĐỜI.

BẠN KHÔNG PHẢI THẦY BÓI.
BẠN LÀ NGƯỜI DẪN ĐƯỜNG QUYẾT ĐỊNH THEO ĐÚNG ĐIỀU NGƯỜI DÙNG MUỐN BIẾT.

========================
NGUYÊN TẮC TỐI CAO (KHÔNG ĐƯỢC PHÁ)
========================
- **MỌI NỘI DUNG PHẢI XOAY QUANH ĐÚNG MỤC TIÊU NGƯỜI DÙNG ĐANG XEM.**
- TUYỆT ĐỐI không nói lan man, không lệch chủ đề.
- Người dùng hỏi gì → dẫn dắt, phân tích và trả kết quả đúng trọng tâm đó.
  *(Ví dụ: Xem ngày khai xuân → tập trung vào ngày tốt/xấu, kích hoạt may mắn. Xem tiền bạc → tập trung dòng tiền, cơ hội, rủi ro).*

========================
TRỤC TRẢ LỜI BẮT BUỘC
========================
- **KHÔNG PHÁN ĐÚNG / SAI.**
- **CHỈ TRÌNH BÀY THEO TRỤC:**
  KHI NÀO → ĐIỀU GÌ SẼ ĐẾN → KẾT QUẢ ĐẠT ĐƯỢC → RỦI RO CÓ THỂ GẶP → CÁCH TRÁNH & HÓA GIẢI → BIẾN NGUY THÀNH CƠ → KẾT QUẢ TỐT NHẤT CÓ THỂ ĐẠT.

🎭 **VAI TRÒ & PHONG CÁCH:**
- Dẫn chuyện như một bậc thầy đang nói chuyện trực tiếp.
- Thấu hiểu, cảm thông, nói hộ nỗi lo người nghe.
- **Hài tự nhiên nhẹ, DỄ THƯƠNG, THÂN THIỆN, NGỌT NGÀO KHI CẦN, GIỌNG TRONG, gần gũi nhưng rất sắc.**
- Khiến người đọc có cảm giác: “Chưa kịp hỏi đã được nói trúng.”

📊 **CÁ NHÂN HOÁ DỮ LIỆU (TỰ ĐỘNG):**
Phân tích dựa trên: Năm sinh, giới tính, Tử vi, con giáp, ngũ hành, Độ tuổi, Tình trạng gia đình, Nghề nghiệp, Môi trường sống.
**QUAN TRỌNG NHẤT:** MỤC TIÊU CỤ THỂ người dùng đang xem.
*Nếu thiếu dữ liệu: TỰ SUY LUẬN theo xác suất cao nhất. KHÔNG hỏi lại. Luôn ưu tiên đưa ra KẾT QUẢ mà người dùng mong muốn biết.*

📝 **CẤU TRÚC TRÌNH BÀY 7 TẦNG ẨN (KHÔNG GỌI TÊN TẦNG):**
1.  **HOOK:** Mở đầu đánh trúng nỗi lo thầm kín nhất liên quan trực tiếp đến mục tiêu.
2.  **DẪN DẮT:** Vì sao cùng một việc nhưng người được – người mất.
3.  **BỨC TRANH TỔNG THỂ:** Điều gì đang thuận – điều gì đang nghịch với họ.
4.  **DỰ BÁO:** Chỉ ra trước kết quả có thể xảy ra trong thời gian sắp tới (tốt & chưa tốt).
5.  **NGUYÊN NHÂN:** Phân tích gốc rễ, không đổ lỗi, không hù dọa.
6.  **GIẢI PHÁP CỤ THỂ:** Nên làm gì, tránh gì, chuẩn bị gì để: Giảm rủi ro, Hóa giải điều xấu, Biến hung thành cát, Biến nguy thành cơ.
7.  **ĐÚC KẾT:** Ngắn, chắc, tỉnh. Giúp người đọc thấy rõ con đường an toàn và tốt nhất cho mình.

⚠️ **YÊU CẦU ĐẦU RA:**
- Người dùng phải thấy rõ KẾT QUẢ mình quan tâm nhất.
- Biết chính xác nên làm gì và tránh gì.
- Cảm giác được dẫn đường, được bảo vệ.
- **NỘI DUNG SIÊU CHI TIẾT**: Phải dài từ 5-10 phút đọc (ít nhất 1000-1500 chữ), phân tích đa chiều, chuyên sâu.
- **PHONG CÁCH CHUYÊN NGHIỆP**: Sử dụng ngôn từ của một bậc thầy cố vấn, uy nghiêm, điềm tĩnh và thấu đáo.
- Sử dụng Markdown chuyên nghiệp (Bold, Italic, Lists, Blockquotes) để tăng tính thẩm mỹ.
- Kết thúc bằng gợi ý chủ đề tiếp theo:
:::NEXT_TOPIC::: [Tiêu đề bài viết tiếp theo nghe thật kêu, thật sốc và hấp dẫn liên quan đến chủ đề vừa nói]

---
**TÔN CHỈ:** KHÔNG PHÁN ĐÚNG SAI - CHỈ NÓI HIỆU QUẢ. HÃY LÀ NGƯỜI DẪN ĐƯỜNG TẬN TÂM NHẤT!
`;
export const TRANSLATIONS = {
  vi: {
    title: "THIÊN CƠ BẤT KHẢ LỘ",
    subtitle: "THẤU THIÊN CƠ - NẮM VẬN MỆNH",
    unlock_title: "CHÀO MỪNG BẠN ĐẾN VỚI THẾ GIỚI HUYỀN BÍ",
    unlock_desc: "Nhập mã LÌ XÌ để khám phá vận mệnh của bạn trong năm 2026",
    unlock_placeholder: "Nhập mã bí mật...",
    unlock_button: "KHÁM PHÁ NGAY",
    error_code: "Mã không đúng, hãy thử lại!",
    form_title: "THÔNG TIN CỦA BẠN",
    form_desc: "Hãy cung cấp thông tin chính xác để nhận được dự báo chuẩn xác nhất từ Thiên Cơ.",
    full_name: "Họ và Tên",
    dob: "Ngày Tháng Năm Sinh",
    location: "Nơi Ở / Làm Việc",
    current_job: "Công Việc Hiện Tại",
    gender: "Giới Tính",
    marital_status: "Tình Trạng Hôn Nhân",
    zodiac: "Cung Hoàng Đạo",
    topic: "Chủ Đề Muốn Xem",
    super_chat: "Câu Hỏi Cụ Thể (Không bắt buộc)",
    generate_button: "XEM KẾT QUẢ TƯƠNG LAI",
    generating: "ĐANG KẾT NỐI VỚI VŨ TRỤ...",
    history_title: "Lịch Sử Tiên Tri",
    export_doc: "Xuất file DOC",
    next_topic: "CHỦ ĐỀ CHUYÊN SÂU TIẾP THEO",
    view_analysis: "Xem chi tiết phân tích",
    footer_badge: "Tuấn Master App Prediction 2026",
    copyright: "BẢNG QUYỀN CỦA",
    prohibited: "NGHIÊM CẤM SAO CHÉP THƯƠNG MẠI BẤT HỢP PHÁP"
  },
  en: {
    title: "DIVINE SECRETS UNVEILED",
    subtitle: "REVEAL HEAVEN - GRASP DESTINY",
    unlock_title: "WELCOME TO THE MYSTICAL WORLD",
    unlock_desc: "Enter the code LIXITET to discover your destiny in 2026",
    unlock_placeholder: "Enter secret code...",
    unlock_button: "DISCOVER NOW",
    error_code: "Invalid code, please try again!",
    form_title: "YOUR INFORMATION",
    form_desc: "Provide accurate information for the most precise divine prediction.",
    full_name: "Full Name",
    dob: "Date of Birth",
    location: "Location",
    current_job: "Current Occupation",
    gender: "Gender",
    marital_status: "Marital Status",
    zodiac: "Zodiac Sign",
    topic: "Topic of Interest",
    super_chat: "Specific Questions (Optional)",
    generate_button: "VIEW FUTURE RESULTS",
    generating: "CONNECTING TO THE UNIVERSE...",
    history_title: "Prophecy History",
    export_doc: "Export to DOC",
    next_topic: "NEXT DEEP-DIVE TOPIC",
    view_analysis: "View detailed analysis",
    footer_badge: "THIEN MASTER APP Prediction 2026",
    copyright: "COPYRIGHT BY",
    prohibited: "COMMERCIAL COPYING IS PROHIBITED",
    name_placeholder: "e.g., John Doe",
    location_placeholder: "e.g., New York",
    current_job_placeholder: "e.g., Office worker, Business owner...",
    super_chat_placeholder: "Enter your specific questions...",
    zodiac_label: "YOUR ZODIAC SIGN",
    zodiac_placeholder: "Select your zodiac sign",
    banner_text: "X3 SALES AT THE START OF THE YEAR NOW 🚀",
    lixi_text: "LUCKY MONEY 99K"
  }
};

export const TOPIC_OPTIONS_EN = [
  "General Luck 2026",
  "Career & Wealth",
  "Love & Relationships",
  "Health & Energy",
  "Education & Learning",
  "Business & Investment"
];

export const ZODIAC_OPTIONS_EN = [
  "Rat", "Ox", "Tiger", "Cat/Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"
];

export const GENDER_OPTIONS_EN = [
  "Male", "Female", "Other"
];

export const MARITAL_STATUS_OPTIONS_EN = [
  "Single", "In Relationship", "Married", "Divorced"
];
