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
            var floors = lines[0].split("^^^");//첫번째 줄에는 층 정보 나옴
            for(var j = 1; j < lines.length; j++)//첫번째 줄은 층에 대한 정보 이므로 제외
            {
                var dictKey = lines[j].substring(0, lines[j].indexOf(":"));// : 전까지
                var dictValue = lines[j].substring(lines[j].indexOf(":") + 1);// : 후부터
                dict[dictKey] = dictValue.replace(/\r/g, '');
                console.log(`${dictKey} : ${dict[dictKey]}`)
            }
            divString += "<div>"
            for(var i = 0; i < floors.length; i++)//층별로 쓰인 기술스택 이미지 주소찾기
            {
                var techString = floors[i].substring(floors[i].indexOf(":") + 1);//기술스택이름
                var tech = techString.split(",");
                for(var z = 0; z < tech.length; z++)
                {
                    divString += dict[tech[z]];
                    console.log(tech[z]);
                }
                if(i !== floors.length - 1)
                    divString += "<br>";
            }
            divString += "</div>"
            console.log(dict);
            console.log(divString);
            pyramid.innerHTML = divString;
        })
        .catch(error => {
            console.error('Error fetching top folder:', error);
        });
}
ReadPyramin();
