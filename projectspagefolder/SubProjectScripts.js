var txtContentElement_sub = document.getElementById("sub-content");
var txtOrder_sub;
var imageOrder_sub;
var linkUrlOrder_sub;
// Txt 파일을 읽는 함수
function readTxtFile_sub(index, txtOrder_sub, FilePath) 
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
                txtOrder_sub[index] = txtContent.replace(/\n/g, '<br>');//줄바꿈문자(\n)를 문자열전체(/g)에서 <br>로 교체
                console.log(txtContent)
            })
            .catch(error => {
                console.error('Error fetching txt file:', error);
                txtOrder_sub[index] = "error";
            });
    }
    else
    {
        txtOrder_sub[index] = "null"
    }
    
}
function readImageFile_sub(index, imageOrder_sub, FilePath)
{
    var fileName = FilePath.split("/").pop()
    if(fileName !== "null")
    {
        imageOrder_sub[index] = FilePath;
    }
    else
    {
        imageOrder_sub[index] = "null";
    }
}
function readAllTxtFilesInTopFolder_sub() {
    fetch("SubProjectOrder.txt")
        .then(response => response.text())
        .then(data => {
            // 이 내용을 기반으로 txt 파일을 읽음
            var lines = data.split('\n');
            lines = lines.filter(line => line !== "");
            console.log(lines);
            txtOrder_sub = new Array(lines.length).fill("");
            imageOrder_sub = new Array(lines.length).fill("");
            linkUrlOrder_sub = new Array(lines.length).fill("");//여기에는 굳이 fill 안붙여도되지만 일관성을 위해 붙여준다.
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                line = line.split(" ");
                linkUrlOrder_sub[i] = line[3];//ex, GitHub:www.github.com,YouTube:www.youtube.com,Tistory:www.tistory.com 공백없어야함
                readTxtFile_sub(i, txtOrder_sub, `${line[0]}/${line[1]}`);
                readImageFile_sub(i, imageOrder_sub, `${line[0]}/${line[2]}`);
                }
            
            var count = 0;
            const intervalId = setInterval(() => {
                console.log("반복 실행중: " + count);
                count++;
            
                // 원하는 조건에 도달하면 반복을 중지
                var allTXTFilled = txtOrder_sub.every(value => value !== "");
                var allImageFilled = imageOrder_sub.every(value => value !== "");
                if (allTXTFilled == true && allImageFilled == true) {//15초
                    console.log(txtOrder_sub);
                    DivString_sub(txtOrder_sub, imageOrder_sub, linkUrlOrder_sub);
                    clearInterval(intervalId);
                }
                if (count >= 30) {//15초
                    console.log(txtOrder_sub);
                    txtContentElement.textContent = "Error";
                    clearInterval(intervalId);
                }
            }, 500);
        })
        .catch(error => {
            console.error('Error fetching top folder:', error);
        });
}
function DivString_sub(txtOrder_sub, imageOrder_sub, linkUrlOrder_sub)
{
    var divString = "";
    for(var i = 0; i < txtOrder_sub.length; i++)
    {
        if(txtOrder_sub[i] !== "null" && imageOrder_sub[i] !== "null")//
        {
            divString += `
                <div class="white-block-with-shadow">
                    <div>
                        <img src=${imageOrder_sub[i]}/>
                    </div>
                    <div>
                        <div style="width: 100%; height: 100%; overflow: auto; box-sizing: border-box">
                            ${txtOrder_sub[i]}
                        </div>
                    </div>
                </div>
                `;
        }
        else if(imageOrder_sub[i] == "null")
        {
            divString += `
                <div class="white-block-with-shadow">
                    <div>
                        ${txtOrder_sub}
                    </div>
                </div>
                `;
        }
        else if(txtOrder_sub[i] == "null")
        {
            divString += `
                <div class="white-block-with-shadow">
                    <div>
                        <img src=${imageOrder_sub[i]}/>
                    </div>
                </div>
                `;
        }

        if(linkUrlOrder_sub[i] !== "null")//null값이 아닌경우 링크 이미지 삽
        {
            var url = linkUrlOrder_sub[i].split(",");// , 없을 경우 첫번째 요소로 문자열이 배정된다.
            divString += `
                <div class="link-icon">
                `;
            for(var j = 0; j < url.length; j++)
            {
                
                if(url[j].includes("GitHub:"))
                {
                    divString += `
                            <a href="${url[j].substring(url[j].indexOf(":") + 1)}" target="_blank">
            	                <img src="LinkIcon/GitHub_Icon.png" height="20" width="20">
                            </a>
                        `;
                }
                else if(url[j].includes("Tistory:"))
                {
                    divString += `
                            <a href="${url[j].substring(url[j].indexOf(":") + 1)}" target="_blank">
            	                <img src="LinkIcon/Tistory_Icon.png" height="20" width="20">
                            </a>
                        `;
                }
                else if(url[j].includes("YouTube:"))
                {
                    divString += `
                            <a href="${url[j].substring(url[j].indexOf(":") + 1)}" target="_blank">
            	                <img src="LinkIcon/YouTube_Icon.png" height="20" width="20">
                            </a>
                        `;
                }
                else if(url[j].includes("GooglePlayStore:"))
                {
                    divString += `
                            <a href="${url[j].substring(url[j].indexOf(":") + 1)}" target="_blank">
            	                <img src="LinkIcon/GooglePlayStore_Icon.png" height="20" width="20">
                            </a>
                        `;
                }
                else
                {
                    divString += `
                            <a href="${url[j].substring(url[j].indexOf(":") + 1)}" target="_blank">
            	                <img src="LinkIcon/Etc_Icon.png" height="20" width="20">
                            </a>
                        `;
                }

            }
            divString += `
                </div>
                `;
        }
    }
    txtContentElement_sub.innerHTML = divString;
}
    
// 최상위 폴더에서 시작
readAllTxtFilesInTopFolder_sub();
/*
justify-content: center;: 이 속성은 주 축(main axis)을 따라 flex 아이템들을 가운데에 배치하도록 지시합니다.
align-items: center;: 이 속성은 교차 축(cross axis)을 따라 flex 아이템들을 가운데에 배치하도록 지시합니다.

주축과 justify-content: Flexbox에서 주 축(main axis)의 기본 방향은 가로입니다.
따라서 flex-direction 속성을 명시적으로 설정하지 않으면, 주 축은 가로 방향이 됩니다.
justify-content: center; 속성은 주 축을 따라 flex 아이템들을 가운데에 배치하도록 지시합니다. 그래서 이 속성이 가로의 중앙으로 정렬됩니다.
교차 축: 교차 축(cross axis)은 주 축과 직각으로 교차하는 축입니다. 즉, 주 축이 가로 방향이면 교차 축은 세로 방향이고,
주 축이 세로 방향이면 교차 축은 가로 방향입니다. align-items 속성은 교차 축을 따라 flex 아이템들을 어떻게 배치할지를 결정합니다.
*/
