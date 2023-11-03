var pyramid = document.getElementById("pyramid");

var techStack = [
    {tech: "JavaScript", img: "JavaScript.png"},
    {tech: "HTML", img: "HTML.png"},
    {tech: "CSS", img: "CSS.png"},
    {tech: "Firebase", img: "Firebase.png"},
    {tech: "Python", img: "Python.png"}
];
for (var i = 0; i < techStack.length; i++) {
    var layer = document.createElement("div");
    layer.style.textAlign = "center";
    layer.style.marginBottom = "10px";
    
    for (var j = 0; j <= i; j++) {
        var img = document.createElement("img");
        img.src = techStack[i].img;
        img.alt = techStack[i].tech;
        img.style.width = "50px";
        img.style.height = "50px";
        img.style.margin = "5px";
        layer.appendChild(img);
    }
    
    pyramid.appendChild(layer);
}
