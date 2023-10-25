// " / " 로 시작하면 루트 디렉토리부터시작하는 절대경로. " ./ " 는 현재 디렉토리인 상대경로.  " ../ " 는 상위 폴더
// HTML 요소를 가져오기
var txtContentElement = document.getElementById("txt-content");
var txtOrder;
var imageOrder;
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
                txtOrder[index] = txtContent;
                console.log(txtContent)
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
function readAllTxtFilesInTopFolder() {
    fetch("ProjectFolder.txt")
        .then(response => response.text())
        .then(data => {
            // 이 내용을 기반으로 txt 파일을 읽음
            var lines = data.split('\n');
            lines = lines.filter(line => line !== "");
            console.log(lines);
            txtOrder = new Array(lines.length).fill("");
            imageOrder = new Array(lines.length).fill("");
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                line = line.split(" ");
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
                    console.log(txtOrder);
                    DivString(txtOrder, imageOrder);
                    clearInterval(intervalId);
                }
                if (count >= 30) {//15초
                    console.log(txtOrder);
                    txtContentElement.textContent = "Error";
                    clearInterval(intervalId);
                }
            }, 500);
        })
        .catch(error => {
            console.error('Error fetching top folder:', error);
        });
}
function DivString(txtOrder, imageOrder)
{
    var divString = "";
    for(var i = 0; i < txtOrder.length; i++)
    {
        if(txtOrder[i] !== "null" && imageOrder[i] !== "null")
        {
            divString += `
                <div style="display: flex; align-items: center;">
                    <div style="flex: 1;">
                        <img src=${imageOrder[i]} />
                    </div>
                    <div style="flex: 1; text-align: center;">
                        ${txtOrder[i]}
                    </div>
                </div>
                `
        }
        else if(imageOrder[i] == "null")
        {
            divString += `
                <div style="display: flex; align-items: center;">
                    <div style="flex: 1; text-align: center;">
                        ${txtOrder}
                    </div>
                </div>
                `
        }
        else if(txtOrder[i] == "null")
        {
            divString += `
                <div style="display: flex; align-items: center;">
                    <div style="flex: 1;">
                        <img src=${imageOrder[i]} />
                    </div>
                </div>
                `
        }
    }
    txtContentElement.textContent = divString;
}
    
// 최상위 폴더에서 시작
readAllTxtFilesInTopFolder();
