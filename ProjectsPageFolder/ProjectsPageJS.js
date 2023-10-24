var topFolder = "/ProjectsPageFolder/"; // 실제 상위 폴더 경로로 변경하세요. " / " 로 시작하면 루트 디렉토리부터시작하는 절대경로. " ./ " 는 현재 디렉토리인 상대경로
                                        // " ../ " 는 상위 폴더
    // HTML 요소를 가져오기
    var txtContentElement = document.getElementById("txt-content");

    // Txt 파일을 읽는 함수
    function readTxtFile(txtFilePath) {
        fetch(txtFilePath)
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

    // 상위 폴더 내의 모든 txt 파일을 읽음
    function readAllTxtFilesInTopFolder(topFolder) {
        fetch(topFolder)
            .then(response => response.text())
            .then(data => {
                // data는 상위 폴더 내의 내용을 나타냄
                // 이 내용을 기반으로 txt 파일을 읽음
                var lines = data.split('\n');
                console.log(lines);
                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i];
                    if (line.endsWith(".txt")) {
                        // txt 파일인 경우 읽음
                        readTxtFile(topFolder + line + "/");
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching top folder:', error);
            });
    }

    // 최상위 폴더에서 시작
    readAllTxtFilesInTopFolder(topFolder);
