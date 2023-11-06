var pyramid = document.getElementById("pyramid");
var etc = document.getElementById("etcSkills");
function InsertDiv(dict, techArray, type)
{
    var str = "";
    if(type == 1)
    {
        str += `<div>`;
        for(var z = 0; z < techArray.length; z++)
        {
            str += "<div>";
            str += dict[techArray[z]];
            str += "</div>";
        }
        str += `</div>`;
    }
    else if(type == 2)//구별하는 이유는 감싸는 div 한층을 제거하기 위해서
    {
        for(var z = 0; z < techArray.length; z++)
        {
            str += "<div>";
            str += dict[techArray[z]];
            str += "</div>";
        }
    }
    return str;
}
async function ReadPyramin()//txt파일에는 항상 줄바꿈 문자 및 공백이 줄마다 들어가 있다. 반드시 제거해야한다. 직접 txt파일을 수정해서 공백을 제거하는 것은 효과가 없다.
{
    const response = await fetch("Pyramid.txt");
    const data = await response.text();
    var pyramidString = "";
    var etcString = "";
    var dict = {};
    var lines = data.split('\n');
    lines = lines.filter(line => line !== "");
    var floors = lines[0].split("^^^");//첫번째 줄에는 층 정보 나옴
    for(var j = 1; j < lines.length; j++)//첫번째 줄은 층에 대한 정보 이므로 제외
    {
        var dictKey = lines[j].substring(0, lines[j].indexOf(":"));// : 전까지
        var dictValue = lines[j].substring(lines[j].indexOf(":") + 1);// : 후부터
        dict[dictKey] = dictValue;
        //dict[dictKey] = dictValue.replace(/\r/g, '').replace(/\n/g, '');
        console.log(`${dictKey} : ${dict[dictKey]}`);
    }
    for(var i = 0; i < floors.length; i++)//층별로 쓰인 기술스택 이미지 주소찾기. 마지막 요소는 etc 스킬 정보이다. 그러니 따로 처리해준다.
    {
        var techString = floors[i].substring(floors[i].indexOf(":") + 1);//기술스택이름
        var tech = techString.split(",").map(s => s.trim());//배열의 요소의 문자열의 앞 뒤 공백 자르기
        if(i !== floors.length - 1)
        {
            pyramidString += InsertDiv(dict, tech, 1);//일반적인 경우 1
        }
            
        else
        {
            etcString += InsertDiv(dict, tech, 2);//etc일 경우 2
        }
            
        
    }
    console.log(dict);
    console.log(pyramidString);
    pyramid.innerHTML = pyramidString;
    etc.innerHTML = etcString;
}
ReadPyramin();
