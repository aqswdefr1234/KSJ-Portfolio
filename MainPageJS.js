document.getElementById('show-projects').addEventListener('click', function() {
    var projectList = document.getElementById('project-list');
    
    // 프로젝트 정보를 추가합니다. 이 부분은 실제 프로젝트 정보로 대체해야 합니다.
    projectList.innerHTML = `
        <div class="project">
            <img src="ImagesFolder/BTCFutureNotificationIcon1019.png" alt="프로젝트 1 이미지">
            <p>프로젝트 1에 대한 설명</p>
        </div>
        <div class="project">
            <img src="ImagesFolder/MainScene.png" alt="프로젝트 2 이미지">
            <p>프로젝트 2에 대한 설명</p>
        </div>
    `;
    
    // 프로젝트 목록을 표시합니다.
    projectList.style.display = 'block';
    
    // 페이지를 옆으로 슬라이드합니다.
    window.scrollTo({
        top: projectList.offsetTop,
        behavior: 'smooth'
    });
});
