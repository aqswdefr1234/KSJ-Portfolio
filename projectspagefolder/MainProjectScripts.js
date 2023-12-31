// " / " 로 시작하면 루트 디렉토리부터시작하는 절대경로. " ./ " 는 현재 디렉토리인 상대경로.  " ../ " 는 상위 폴더
// HTML 요소를 가져오기
var txtContentElement = document.getElementById("main-content");
var txtContentElement_sub = document.getElementById("sub-content");
var txtContentElement_team = document.getElementById("team-content");

// Txt 파일을 읽는 함수
function readTxtFile(index, txtOrder, FilePath) 
{
    var fileName = FilePath.split("/").pop()
    if(fileName !== "null")
    {
        fetch(FilePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(txtContent => {
                // 가져온 txt 내용을 배열 요소에 추가
                txtOrder[index] = txtContent.replace(/\n/g, '<br>');//줄바꿈문자(\n)를 문자열전체(/g)에서 <br>로 교체
            })
            .catch(error => {
                console.error('Error fetching txt file:', error);
                txtOrder[index] = "error";
            });
    }
    else
    {
        txtOrder[index] = "null"
    }
    
}
function readImageFile(index, imageOrder, FilePath)
{
    var fileName = FilePath.split("/").pop()
    if(fileName !== "null")
    {
        imageOrder[index] = FilePath;
    }
    else
    {
        imageOrder[index] = "null";
    }
}
function readAllTxtFilesInTopFolder(content)
{
    var txtOrder;
    var imageOrder;
    var linkUrlOrder;
    
    var txtFileName = "";
    if(content == "main-content")
        txtFileName = "MainProjectOrder.txt";
    else if(content == "sub-content")
        txtFileName = "SubProjectOrder.txt";
    else if(content == "team-content")
        txtFileName = "TeamProjectOrder.txt";
    
    fetch(txtFileName)
        .then(response => response.text())
        .then(data => {
            // 이 내용을 기반으로 txt 파일을 읽음
            var lines = data.split('\n');
            lines = lines.filter(line => line !== "");
            txtOrder = new Array(lines.length).fill("");
            imageOrder = new Array(lines.length).fill("");
            linkUrlOrder = new Array(lines.length).fill("");//여기에는 굳이 fill 안붙여도되지만 일관성을 위해 붙여준다.
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                line = line.split("^^^");
                linkUrlOrder[i] = line[3];//ex, GitHub:www.github.com,YouTube:www.youtube.com,Tistory:www.tistory.com 공백없어야함
                readTxtFile(i, txtOrder, `${line[0]}/${line[1]}`);
                readImageFile(i, imageOrder, `${line[0]}/${line[2]}`);
                }
            
            var count = 0;
            const intervalId = setInterval(() => {
                console.log("반복 실행중: " + count);
                count++;
            
                // 원하는 조건에 도달하면 반복을 중지
                var allTXTFilled = txtOrder.every(value => value !== "");
                var allImageFilled = imageOrder.every(value => value !== "");
                if (allTXTFilled == true && allImageFilled == true) {//15초
                    DivString(content, txtOrder, imageOrder, linkUrlOrder);
                    clearInterval(intervalId);
                }
                if (count >= 30) {//15초
                    txtContentElement.textContent = "Error";
                    clearInterval(intervalId);
                }
            }, 500);
        })
        .catch(error => {
            console.error('Error fetching top folder:', error);
        });
}
function DivString(content, txtOrder, imageOrder, linkUrlOrder)
{
    var divString = "";
    for(var i = 0; i < txtOrder.length; i++)
    {
        if(txtOrder[i] !== "null" && imageOrder[i] !== "null")//
        {
            divString += `
                <div class="white-block-with-shadow">
                    <div>
                        <img src=${imageOrder[i]}/>
                    </div>
                    <div>
                        <div>
                            ${txtOrder[i]}
                        </div>
                    </div>
                </div>
                `;
        }
        else if(imageOrder[i] == "null")
        {
            divString += `
                <div class="white-block-with-shadow">
                    <div>
                        <div>
                            ${txtOrder}
                        </div>
                    </div>
                </div>
                `;
        }
        else if(txtOrder[i] == "null")
        {
            divString += `
                <div class="white-block-with-shadow">
                    <div>
                        <img src=${imageOrder[i]}/>
                    </div>
                </div>
                `;
        }

        if(linkUrlOrder[i] !== "null")//null값이 아닌경우 링크 이미지 삽
        {
            var url = linkUrlOrder[i].split(",");// , 없을 경우 첫번째 요소로 문자열이 배정된다.
            divString += `
                <div class="link-icon">
                `;
            for(var j = 0; j < url.length; j++)
            {
                
                if(url[j].includes("GitHub:"))
                {
                    divString += `
                            <a href="${url[j].substring(url[j].indexOf(":") + 1)}" target="_blank">
            	                <img src="LinkIcon/GitHub_Icon.png" height="30" width="30">
                            </a>
                        `;
                }
                else if(url[j].includes("Tistory:"))
                {
                    divString += `
                            <a href="${url[j].substring(url[j].indexOf(":") + 1)}" target="_blank">
            	                <img src="LinkIcon/Tistory_Icon.png" height="30" width="30">
                            </a>
                        `;
                }
                else if(url[j].includes("YouTube:"))
                {
                    divString += `
                            <a href="${url[j].substring(url[j].indexOf(":") + 1)}" target="_blank">
            	                <img src="LinkIcon/YouTube_Icon.png" height="30" width="30">
                            </a>
                        `;
                }
                else if(url[j].includes("GooglePlayStore:"))
                {
                    divString += `
                            <a href="${url[j].substring(url[j].indexOf(":") + 1)}" target="_blank">
            	                <img src="LinkIcon/GooglePlayStore_Icon.png" height="30" width="30">
                            </a>
                        `;
                }
                else
                {
                    divString += `
                            <a href="${url[j].substring(url[j].indexOf(":") + 1)}" target="_blank">
            	                <img src="LinkIcon/Etc_Icon.png" height="30" width="30">
                            </a>
                        `;
                }

            }
            divString += `
                </div>
                `;
        }
    }
    InnerHtml(content, divString)
}
function InnerHtml(content, divString)
{
    if(content == "main-content")
        txtContentElement.innerHTML = divString;
    else if(content == "sub-content")
        txtContentElement_sub.innerHTML = divString;
    else if(content == "team-content")
        txtContentElement_team.innerHTML = divString;
}
// 최상위 폴더에서 시작
readAllTxtFilesInTopFolder("main-content");
readAllTxtFilesInTopFolder("sub-content");
readAllTxtFilesInTopFolder("team-content");

/*
justify-content: center;: 이 속성은 주 축(main axis)을 따라 flex 아이템들을 가운데에 배치하도록 지시합니다.
align-items: center;: 이 속성은 교차 축(cross axis)을 따라 flex 아이템들을 가운데에 배치하도록 지시합니다.

주축과 justify-content: Flexbox에서 주 축(main axis)의 기본 방향은 가로입니다.
따라서 flex-direction 속성을 명시적으로 설정하지 않으면, 주 축은 가로 방향이 됩니다.
justify-content: center; 속성은 주 축을 따라 flex 아이템들을 가운데에 배치하도록 지시합니다. 그래서 이 속성이 가로의 중앙으로 정렬됩니다.
교차 축: 교차 축(cross axis)은 주 축과 직각으로 교차하는 축입니다. 즉, 주 축이 가로 방향이면 교차 축은 세로 방향이고,
주 축이 세로 방향이면 교차 축은 가로 방향입니다. align-items 속성은 교차 축을 따라 flex 아이템들을 어떻게 배치할지를 결정합니다.
*/
