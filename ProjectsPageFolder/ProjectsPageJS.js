async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  console.log(data);
}

window.onload = function() {
  fetchData();
  var projectList = document.getElementById("project-list");
  int projectCount = 2;
  string projectsDiv = "";
  
  for(int i = 1; i <= projectCount; i++)
  {
    string explanation = "";
    fetch('ProjectsFolder/Explanation.txt')
    .then(response => response.text())
    .then(data => {
      projectsDiv += "
        <div class="project">
          <img src="Project/project${projectCount}.png">
          <p>프로젝트 1에 대한 설명</p>
        </div>
        "
    .catch(error => console.error(error));
  }
};
