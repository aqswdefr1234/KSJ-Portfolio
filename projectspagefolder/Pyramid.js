var pyramid = document.getElementById("pyramid");

function ReadPyramin()
{
    fetch("Pyramid.txt")
        .then(response => response.text())
        .then(data => {
            var divString = "";
            var dict = {};
            var lines = data.split('\n');
            lines = lines.filter(line => line !== "");
            console.log(lines);
            var floors = lines[0].split("^^^");//첫번째 줄에는 층 정보 나옴
            //lines.shift();//첫번째 요소 제거 후, 한칸 씩 앞으로
            for(var j = 1; j < lines.length; j++)//첫번째 줄은 층에 대한 정보 이므로 제
            {
                var dictKey = lines[j].substring(0, lines[j].indexOf(":"));// : 전까지
                var dictValue = lines[j].substring(lines[j].indexOf(":") + 1);// : 후부터
                console.log(`${dictKey} : ${dictValue}`);
                dict[dictKey] = dictValue;
            }
            
            for(var i = 0; i < floors.length; i++)//층별로 쓰인 기술스택 이미지 주소찾기
            {
                var tech = floors[i].substring(0, floors[i].indexOf(":"));//기술스택이름
                console.log(tech)
                divString += dict[tech];
                divString += "<br>";
            }
            console.log(divString);
            pyramid.innerHTML = divString;
        })
        .catch(error => {
            console.error('Error fetching top folder:', error);
        });
}
ReadPyramin();
