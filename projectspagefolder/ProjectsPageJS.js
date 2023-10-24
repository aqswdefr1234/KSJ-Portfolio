// " / " 로 시작하면 루트 디렉토리부터시작하는 절대경로. " ./ " 는 현재 디렉토리인 상대경로.  " ../ " 는 상위 폴더
// HTML 요소를 가져오기
var txtContentElement = document.getElementById("txt-content");

// Txt 파일을 읽는 함수
function readTxtFile(FilePath) {
    fetch(FilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(txtContent => {
            // 가져온 txt 내용을 HTML 요소에 추가
            txtContentElement.textContent += txtContent;
        })
        .catch(error => {
            console.error('Error fetching txt file:', error);
        });
}

function readAllTxtFilesInTopFolder() {
    fetch("ProjectFolder.txt")
        .then(response => response.text())
        .then(data => {
            // 이 내용을 기반으로 txt 파일을 읽음
            var lines = data.split('\n');
            console.log(lines);
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                readTxtFile(line + "/Explanation.txt");
                }
            }
        })
        .catch(error => {
            console.error('Error fetching top folder:', error);
        });
}
*/
// 최상위 폴더에서 시작
readAllTxtFilesInTopFolder();    
