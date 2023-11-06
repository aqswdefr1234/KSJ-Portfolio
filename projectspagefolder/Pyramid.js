var pyramid = document.getElementById("pyramid");

async function ReadPyramin()//txt파일에는 항상 줄바꿈 문자 및 공백이 줄마다 들어가 있다. 반드시 제거해야한다. 직접 txt파일을 수정해서 공백을 제거하는 것은 효과가 없다.
{
    const response = await fetch("Pyramid.txt");
    const data = await response.text();
    var divString = "";
    var dict = {};
    var lines = data.split('\n');
    lines = lines.filter(line => line !== "");
    var floors = lines[0].split("^^^");//첫번째 줄에는 층 정보 나옴
    for(var j = 1; j < lines.length; j++)//첫번째 줄은 층에 대한 정보 이므로 제외
    {
        var dictKey = lines[j].substring(0, lines[j].indexOf(":"));// : 전까지
        var dictValue = lines[j].substring(lines[j].indexOf(":") + 1);// : 후부터
        dict[dictKey] = dictValue.replace(/\r/g, '').replace(/\n/g, '');
        console.log(`${dictKey} : ${dict[dictKey]}`);
    }
    for(var i = 0; i < floors.length; i++)//층별로 쓰인 기술스택 이미지 주소찾기
    {
        var techString = floors[i].substring(floors[i].indexOf(":") + 1);//기술스택이름
        var tech = techString.split(",").map(s => s.trim());//배열의 요소의 문자열의 앞 뒤 공백 자르기
        console.log(`tech의 길이 ${i}번째 : ${tech.length}`);
        divString += `<div>`;
        for(var z = 0; z < tech.length; z++)
        {
            console.log(`${tech[z]} : ${dict[tech[z]]}`);
            divString += "<div>";
            divString += dict[tech[z]];
            divString += "</div>";
        }
        divString += `</div>`;
        
    }
    console.log(dict);
    console.log(divString);
    pyramid.innerHTML = divString;
}
ReadPyramin();
