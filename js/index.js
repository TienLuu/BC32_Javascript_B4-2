var currentFormat = new Intl.NumberFormat("vn-VN");

function showInfo(id, content) {
   document.getElementById(id).innerHTML = content;
}

/* 
    ASSUMING
        - End User nhập thông tin ngày, tháng, năm

    INPUT
        - Tạo biến day, month, year để gán giá trị từ input có id tương ứng
        
    HANDLE
        - Tìm tháng có 30 ngày và 31 ngày, tháng 2 không tính năm nhuận nên 28 ngày
        - Nếu biến day 31 ngày và month là 3 thì ngày tiếp theo là ngày 1 tháng 4
        và ngày trước đó là 30 tháng 3
        - Nếu biến day là 1 và month là 5 thì ngày tiếp theo là ngày 2 tháng 5
        và ngày trước đó là 31 vì tháng 4 thuộc tháng có 31 ngày
    
    OUTPUT
        - Tạo biến showResult để gán giá trị string là các thẻ HTML
        - Hiển thị biến showResult ra thẻ div có id showResult thoả điều kiện ở handle
*/

function calcDay() {
   var day = +document.getElementById("day").value;
   var month = +document.getElementById("month").value;
   var year = +document.getElementById("year").value;
   var showResult = "";

   var flag;

   switch (month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
         flag = 0;
         showResult += calcPrevDay(day, month, year, flag);
         showResult += calcNextDay(day, month, year, flag);
         showInfo("showResult", showResult);
         break;
      case 4:
      case 6:
      case 9:
      case 11:
         flag = 1;
         showResult += calcPrevDay(day, month, year, flag);
         showResult += calcNextDay(day, month, year, flag);
         showInfo("showResult", showResult);
         break;
      case 2:
         flag = 2;
         showResult += calcPrevDay(day, month, year, flag);
         showResult += calcNextDay(day, month, year, flag);
         showInfo("showResult", showResult);
         break;
      default:
         showInfo("showResult", "<p>Tháng không hợp lệ!</p>");
         break;
   }
}

function calcPrevDay(day, month, year, flag) {
   if (day === 1 && flag === 0) {
      day = 30;
      if (month === 1) {
         day = 31;
         month = 12;
         year -= 1;
      } else if (month === 3) {
         day = 28;
         month = 2;
      } else {
         month -= 1;
      }
   } else if (flag === 0) {
      day -= 1;
   }

   if (day === 1 && flag === 1) {
      day = 31;
      month -= 1;
   } else if (flag === 1) {
      day -= 1;
   }

   if (day === 1 && flag === 2) {
      day = 28;
      month -= 1;
   } else if (flag === 2) {
      day -= 1;
   }

   return "<p>Ngày trước: " + day + "/" + month + "/" + year + "</p>";
}

function calcNextDay(day, month, year, flag) {
   if (day === 31 && flag === 0) {
      day = 1;
      if (month === 12) {
         month = 1;
         year += 1;
      } else {
         month += 1;
      }
   } else if (flag === 0) {
      day += 1;
   }

   if (day === 30 && flag === 1) {
      day = 1;
      month += 1;
   } else if (flag === 1) {
      day += 1;
   }

   if (day === 28 && flag === 2) {
      day = 1;
      month += 1;
   } else if (flag === 2) {
      day += 1;
   }

   return "<p>Ngày tiếp theo: " + day + "/" + month + "/" + year + "</p>";
}

/*  
   ASSUMING
      - End User nhập thông tin tháng, năm

   INPUT
      - Tạo biến month1, year1 gán giá trị input có id lần lượt month1, year1

   HANDLE
      - Tháng có 31 ngày gồm: 1,3,5,7,8,10,12 => Có 31 ngày
      - Tháng có 30 ngày gồm: 4,6,9,11 => Có 30 ngày
      - Tháng 2:
         + Năm nhuận: Có 29 ngày
            . Formula: year % 4 === 0 && year % 100 !== 0 || year % 400 === 0
         + Năm không nhuận: Có 28 ngày
   
   OUTPUT
      - Hiển thị kết quả ra thẻ div có id showDay
*/

function getDay() {
   var month1 = +document.getElementById("month1").value;
   var year1 = +document.getElementById("year1").value;

   switch (month1) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
         showInfo("showDay", "<p>Tháng " + month1 + " có 31 ngày </p>");
         break;
      case 4:
      case 6:
      case 9:
      case 11:
         showInfo("showDay", "<p>Tháng " + month1 + " có 30 ngày </p>");
         break;
      case 2:
         showInfo(
            "showDay",
            "<p>Tháng " + month1 + " có " + checkYear(year1) + " ngày </p>"
         );
         break;
      default:
         showInfo("showDay", "<p>Tháng không hợp lệ!</p>");
         break;
   }
}

function checkYear(year1) {
   if ((year1 % 4 === 0 && year1 % 100 !== 0) || year1 % 400 === 0) {
      return 29;
   } else {
      return 28;
   }
}

/*  
   ASSUMING
      - End User nhập số nguyên có 3 chữ số

   INPUT
      - Tạo biến integerNumber để nhận giá trị input có id integerNumber
      - Tạo biến numberx tương ứng với cách đọc số x với x chạy từ 1 - 9
      - Tạo biến hangTram, hangChuc, hangDonvi để tách các số ra
      - Tạo biến showWord để cộng dồn cách đọc

   HANDLE
      - Kiểm tra integerNumber có là số nguyên, và số có 3 chữ số
      - Nối các cách đọc từng số lại
      - Nếu hàng chục & hàng đơn vị = 0 thì đọc là trăm
      - Nếu hàng chục = 0 hàng đơn vị > 0 thì đọc là lẻ
      - Với hàng chục nhỏ hơn 1 thì hàng đơn vị có 1 thì đọc là "một", hàng chục lớn hơn 1 thì đọc 1 là "mốt"
   
   OUTPUT
      - Hiển thị kết quả ra thẻ div có id showWord
*/
function readThree() {
   var integerNumber = +document.getElementById("integerNumber").value;

   var hangTram,
      hangChuc,
      hangDonVi,
      showWord = "";

   var number1 = "Một";
   var number2 = "Hai";
   var number3 = "Ba";
   var number4 = "Bốn";
   var number5 = "Năm";
   var number6 = "Sáu";
   var number7 = "Bảy";
   var number8 = "Tám";
   var number9 = "Chín";

   if (integerNumber < 100 || integerNumber > 999) {
      showInfo("showWord", "<p>Số không hợp lệ!</p>");
      return;
   }

   hangTram = Math.floor(integerNumber / 100);
   hangChuc = Math.floor((integerNumber % 100) / 10);
   hangDonVi = (integerNumber % 100) % 10;

   // Đọc hàng trăm
   if (hangTram === 1) {
      showWord += number1 + " Trăm ";
   } else if (hangTram === 2) {
      showWord += number2 + " Trăm ";
   } else if (hangTram === 3) {
      showWord += number3 + " Trăm ";
   } else if (hangTram === 4) {
      showWord += number4 + " Trăm ";
   } else if (hangTram === 5) {
      showWord += number5 + " Trăm ";
   } else if (hangTram === 6) {
      showWord += number6 + " Trăm ";
   } else if (hangTram === 7) {
      showWord += number7 + " Trăm ";
   } else if (hangTram === 8) {
      showWord += number8 + " Trăm ";
   } else if (hangTram === 9) {
      showWord += number9 + " Trăm ";
   }

   // Đọc hàng chục
   if (hangChuc === 1) {
      showWord += " Mười ";
   } else if (hangChuc === 2) {
      showWord += number2 + " Mươi ";
   } else if (hangChuc === 3) {
      showWord += number3 + " Mươi ";
   } else if (hangChuc === 4) {
      showWord += number4 + " Mươi ";
   } else if (hangChuc === 5) {
      showWord += number5 + " Mươi ";
   } else if (hangChuc === 6) {
      showWord += number6 + " Mươi ";
   } else if (hangChuc === 7) {
      showWord += number7 + " Mươi ";
   } else if (hangChuc === 8) {
      showWord += number8 + " Mươi ";
   } else if (hangChuc === 9) {
      showWord += number9 + " Mươi ";
   }

   // Đọc hàng đơn vị
   if (hangDonVi === 1 && hangChuc === 0) {
      showWord += " Lẻ " + number1;
   } else if (hangDonVi === 1 && hangChuc === 1) {
      showWord += number1;
   } else if (hangDonVi === 1) {
      showWord += " Mốt ";
   } else if (hangDonVi === 2) {
      showWord += number2;
   } else if (hangDonVi === 3) {
      showWord += number3;
   } else if (hangDonVi === 4) {
      showWord += number4;
   } else if (hangDonVi === 5 && hangChuc === 0) {
      showWord += " Lẻ " + number5;
   } else if (hangDonVi === 5 && hangChuc > 0) {
      showWord += "Lăm";
   } else if (hangDonVi === 6) {
      showWord += number6;
   } else if (hangDonVi === 7) {
      showWord += number7;
   } else if (hangDonVi === 8) {
      showWord += number8;
   } else if (hangDonVi === 9) {
      showWord += number9;
   }

   showInfo("showWord", showWord);
}

/*  
   ASSUMING
      - Toạ độ nhà sinh viên
         + Sinh viên 1: (2,3) 
         + Sinh viên 2: (4,5)
         + Sinh viên 3: (6,1)
      - Toạ độ trường: (2,1)
   
   INPUT
      - Tạo biến svLocationzX gán lần lượt giá trị của X (2,3), (4,5), (6,1) với z chạy từ 1 - 3
      - Tạo biến svLocationzY gán lần lượt giá trị của Y (2,3), (4,5), (6,1) với z chạy từ 1 - 3
      - Tạo biến schoolLocationX gán giá trị X của toạ độ (2,1)
      - Tạo biến schoolLocationY gán giá trị Y của toạ độ (2,1)
      - Tạo biến nameSVz gán giá trị tên của sinh viên với z chạy từ 1 - 3
      - Tạo biến dmax để nhận giá trị độ dài lớn nhất

   HANDLE
      - Tạo biến showLocation gán giá trị string là các thẻ HTML hiển thị dữ liệu
      - Hiển thị toạ độ của 3 sinh viên và trường ra thẻ div có id showLocation
      - Tìm độ dài giữa 2 điểm giữa trường và sinh viên
      - So sánh 3 độ dài vừa tính được => Độ dài lớn nhất => Sinh viên đó xa trường nhất
      - Formula:
         Căn bậc 2 của bình phương x2 - x1 + bình phương y2 - y1
   
   OUTPUT
      - Hiển thị kết quả ra thẻ div có id showResult1
*/

function find() {
   var svLocation1X = 2;
   var svLocation1Y = 3;
   var svLocation2X = 4;
   var svLocation2Y = 5;
   var svLocation3X = 6;
   var svLocation3Y = 1;
   var nameSV1 = "Tèo";
   var nameSV2 = "Tí";
   var nameSV3 = "Tũn";

   var dmax = 0;
   var nameSVDmax = "";

   var schoolLocationX = 2;
   var schoolLocationY = 1;

   var showLocation = "<div>";
   showLocation += "<p>Toạ độ:</p>";
   showLocation +=
      "<p>Sinh viên " +
      nameSV1 +
      ": (" +
      svLocation1X +
      "," +
      svLocation1Y +
      ")</p>";
   showLocation +=
      "<p>Sinh viên " +
      nameSV2 +
      ": (" +
      svLocation2X +
      "," +
      svLocation2Y +
      ")</p>";
   showLocation +=
      "<p>Sinh viên " +
      nameSV3 +
      ": (" +
      svLocation3X +
      "," +
      svLocation3Y +
      ")</p>";
   showLocation +=
      "<p>Trường học: (" + schoolLocationX + "," + schoolLocationY + ")</p>";

   document.getElementById("showLocation").innerHTML = showLocation;

   // Cho dmax = quãng đường của sv1 với trường học
   dmax = calcDistance(
      schoolLocationX,
      schoolLocationY,
      svLocation1X,
      svLocation1Y
   );

   // Kiểm tra quãng đường sv1 với trường và sv2 với trường
   if (
      dmax >=
      calcDistance(schoolLocationX, schoolLocationY, svLocation2X, svLocation2Y)
   ) {
      dmax = dmax;
      nameSVDmax = nameSV1;

      // Kiểm tra tiếp tục quãng đường sv1 với trường và sv3 với trường
      if (
         dmax >=
         calcDistance(
            schoolLocationX,
            schoolLocationY,
            svLocation3X,
            svLocation3Y
         )
      ) {
         dmax = dmax;
         nameSVDmax = nameSV1;
      } else {
         dmax = calcDistance(
            schoolLocationX,
            schoolLocationY,
            svLocation3X,
            svLocation3Y
         );
         nameSVDmax = nameSV3;
      }
   }
   // Quãng đường của sv1 với trường < sv2 với trường
   else {
      dmax = calcDistance(
         schoolLocationX,
         schoolLocationY,
         svLocation2X,
         svLocation2Y
      );
      nameSVDmax = nameSV2;

      // Tiếp tục kiểm tra quãng đường sv2 với trường và sv3 với trường
      if (
         dmax >=
         calcDistance(
            schoolLocationX,
            schoolLocationY,
            svLocation3X,
            svLocation3Y
         )
      ) {
         dmax = dmax;
         nameSVDmax = nameSV2;
      } else {
         dmax = calcDistance(
            schoolLocationX,
            schoolLocationY,
            svLocation3X,
            svLocation3Y
         );
         nameSVDmax = nameSV3;
      }
   }

   showInfo(
      "showResult1",
      "<p>Sinh viên xa trường nhất là " + nameSVDmax + "</p>"
   );
}

function calcDistance(x1, y1, x2, y2) {
   return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
