var pyramid = document.getElementById("pyramid");

function ReadPyramin()
{
    fetch(Pyramid.txt)
        .then(response => response.text())
        .then(data => {
            // 이 내용을 기반으로 txt 파일을 읽음
            var lines = data.split('\n');
            lines = lines.filter(line => line !== "");
            var floor = lines[0].split("^^^");//첫번째 줄에는 층 정보 나옴
            for(var i = 0; i < floor.length; i++)
            {
                
            }
        })
        .catch(error => {
            console.error('Error fetching top folder:', error);
        });
}
