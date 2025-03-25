
var projectTiles = document.querySelectorAll('.project-tile');
window.addEventListener('scroll', function() {
    var welcomeOffset = visualViewport.height - 1750;
    var projectTileHeight = 400;
    var scrollPos = (window.scrollY - this.visualViewport.width + welcomeOffset - this.visualViewport.height / 2) / projectTileHeight;
    var debounceI = 0;
    if (visualViewport.width < 600) {
        for (var i = 0; i < projectTiles.length; i++) {
            if(scrollPos - i < 1 && scrollPos - i > 0) {
                if(debounceI != i) {
                    navigator.vibrate(200);
                }
                debounceI = i;
                if(debounceI != i) {
                    navigator.vibrate(200);
                }
                debounceI = i;
                projectTiles[i].style.transform = 'scale(1.1)';
                projectTiles[i].style.borderRadius = '20px';
                projectTiles[i].style.backgroundColor = 'rgb(55,55,55)'
            } else {
                projectTiles[i].style.transform = 'scale(1.0)';
                projectTiles[i].style.borderRadius = '10px';
                projectTiles[i].style.backgroundColor = 'rgb(32,32,32)'
            }
        }
    }

});


getDevTime();
// fetches data for the first graph
function getDevTime() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://wakatime.com/share/@firebolt9907/6c2bf50d-513e-4529-84a5-36c8fdf7cb3d.json', true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var devTime = JSON.parse(xhr.responseText);
            console.log(devTime);
            mostTime = 0;
            totalTime = 0;
            var today = Date.now();
            console.log(today);
            for (var i = 0; i < devTime.data.length; i++) {
                totalTime += devTime.data[i].grand_total.total_seconds;
                if (mostTime < devTime.data[i].grand_total.total_seconds) {
                    mostTime = devTime.data[i].grand_total.total_seconds;
                }
            }
            element = document.getElementById("dev-time-last-week");
            element.textContent = "Total: " + Math.floor(totalTime / 3600) + "h " + Math.floor((totalTime % 3600) / 60) + "m";
            for (var i = 0; i < devTime.data.length; i++) {
                var total_seconds = devTime.data[i].grand_total.total_seconds;
                var hours = Math.floor(devTime.data[i].grand_total.total_seconds / 3600);
                var minutes = Math.floor((devTime.data[i].grand_total.total_seconds % 3600) / 60);
                var time = "";
                if (hours >= 1) {
                    time = hours + "h ";
                }
                time = time + minutes + 'm';

                var date = new Date();
                date.setDate(date.getDate() - (6 - i));
                var dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
                if (6-i == 0) {
                    dayOfWeek = "Today";
                }
                
                element = document.getElementById((6-i).toString() + "-days-ago");
                element.style.height = '0px';
                element.setAttribute('data-time', dayOfWeek + ": " + time);
                console.log(element);
                // Trigger reflow to restart CSS animations
                element.style.animation = 'none';
                element.style.height = total_seconds * 200 / mostTime + "px";
                void element.offsetWidth; // Trigger reflow
                element.style.animation = '';
            }
        }
    }
}
getDevLangs();
// fetches data for the second graph
function getDevLangs() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://wakatime.com/share/@firebolt9907/933b30fe-3770-4aae-8eea-78e2f011955c.json', true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var devTime = JSON.parse(xhr.responseText);
            console.log(devTime);
            totalPercent = 0;
            // devTime.data.reverse();
            for (var i = 0; i < devTime.data.length; i++) {
                if (totalPercent > 93) {
                    var editor = devTime.data[i];
                    var element = document.createElement('div');
                    var lang = "Other";
                    var color = "rgb(162, 162, 162)";
                    console.log(totalPercent);
                    totalPercent = (100-totalPercent).toFixed(2);
                    console.log(totalPercent);
                    element.className = 'bar';
                    element.style.width = "0px";
                    element.style.height = '10px';
                    element.style.backgroundColor = color;
                    element.setAttribute('data-lang', lang + ': ' + (100 - totalPercent));
                    document.getElementById('inner-lang-graph').insertBefore(element, document.getElementById('inner-lang-graph').firstChild);
                    console.log(element);
                    // Trigger reflow to restart CSS animations
                    element.style.animation = 'none';
                    void element.offsetWidth; // Trigger reflow
                    element.style.width = "250px";
                    element.style.animation = '';

                    (function(index) {
                        var langElement = document.createElement('div');
                        langElement.innerHTML = "<div style=\"background-color: " + color + "; height: 10px; width: 10px; border-radius: 20px;\"></div>"
                         + "<p>" + lang + ": " + totalPercent + "%</p>";
                        langElement.setAttribute('data-lang', 'Other: ' + Math.floor(totalPercent));
                        langElement.style.transition = "opacity 0.5s ease-in-out, transform 0.5s ease-in-out";
                        var delay = index * 100;
                        setTimeout(function(){
                            langElement.style.transform = "translateY(30px)";
                            langElement.style.opacity = "0";
                            document.getElementById('lang-names').append(langElement);
                            setTimeout(function(){
                                langElement.style.transform = "translateY(0px)";
                                langElement.style.opacity = "1";
                            }, 10);
                        }, delay);
                        console.log(langElement);
                    })(i);
                    break;
                }
                var editor = devTime.data[i];
                var element = document.createElement('div');
                var lang = editor.name;
                var color = editor.color;
                if (lang == 'Dart') {
                    lang = 'Flutter';
                    color = 'rgb(0, 161, 254)';
                } else if (lang == 'JSON') {
                    color = 'rgb(148, 255, 127)';
                } else if (lang == "GDScript3") {
                    lang = "Godot Script";
                }
                totalPercent += editor.percent;
                element.className = 'bar';
                element.style.width = '0px';
                element.style.height = '10px';
                element.style.backgroundColor = color;
                element.setAttribute('data-lang', lang + ': ' + Math.floor(editor.percent));
                document.getElementById('inner-lang-graph').insertBefore(element, document.getElementById('inner-lang-graph').firstChild);
                console.log(element);
                // Trigger reflow to restart CSS animations
                element.style.animation = 'none';
                void element.offsetWidth; // Trigger reflow
                element.style.width = totalPercent * 2.5 + 'px';
                element.style.animation = '';

                (function(index) {
                    var langElement = document.createElement('div');
                    langElement.innerHTML = "<div style=\"background-color: " + color + "; height: 10px; width: 10px; border-radius: 20px;\"></div>"
                     + "<p>" + lang + ": " + editor.percent + "%</p>";
                    langElement.setAttribute('data-lang', lang + ': ' + Math.floor(editor.percent));
                    langElement.style.transition = "opacity 0.5s ease-in-out, transform 0.5s ease-in-out";
                    var delay = index * 100;
                    setTimeout(function(){
                        langElement.style.transform = "translateY(30px)";
                        langElement.style.opacity = "0";
                        document.getElementById('lang-names').append(langElement);
                        setTimeout(function(){
                            langElement.style.transform = "translateY(0px)";
                            langElement.style.opacity = "1";
                        }, 10);
                    }, delay);
                    console.log(langElement);
                })(i);
            }
        }
    }
}

getDevEditors();
// fetches data for the second graph
function getDevEditors() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://wakatime.com/share/@firebolt9907/2ccbe765-7e3c-42c1-8a41-82f02a9835ed.json', true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var devTime = JSON.parse(xhr.responseText);
            console.log(devTime);
            totalPercent = 0;
            // devTime.data.reverse();
            for (var i = 0; i < devTime.data.length; i++) {
                var editor = devTime.data[i];
                var element = document.createElement('div');
                totalPercent += editor.percent;
                element.className = 'bar';
                element.style.width = "0px";
                element.style.height = '10px';
                element.style.backgroundColor = editor.color;
                element.setAttribute('data-editor', editor.name + ': ' + Math.floor(editor.percent));
                document.getElementById('inner-editor-graph').insertBefore(element, document.getElementById('inner-editor-graph').firstChild);
                console.log(element);
                // Trigger reflow to restart CSS animations
                element.style.animation = 'none';
                void element.offsetWidth; // Trigger reflow
                element.style.width = totalPercent * 2.5 + 'px';
                element.style.animation = '';

                (function(index) {
                    var editor = devTime.data[i];
                    var element = document.createElement('div');
                    element.innerHTML = "<div style=\"background-color: " + editor.color + "; height: 10px; width: 10px; border-radius: 20px;\"></div>"
                     + "<p>" + editor.name + ": " + editor.percent + "%</p>";
                    element.style.transition = "opacity 0.8s ease-in-out, transform 0.8s ease-in-out";
                    element.setAttribute('data-editor', editor.name + ': ' + Math.floor(editor.percent));
                    
                    var delay = index * 100; // Stagger delay in milliseconds

                    setTimeout(function() {
                        element.style.transform = "translateY(30px)";
                        element.style.opacity = "0";
                        document.getElementById('editor-names').append(element);

                        setTimeout(function() {
                            element.style.transform = "translateY(0px)";
                            element.style.opacity = "1";
                        }, 10); // Small delay to ensure transition
                    }, delay);
                    console.log(element);
                })(i);
            }
        }
    }
}

getDevOperatingSystems();
function getDevOperatingSystems() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://wakatime.com/share/@firebolt9907/45cdaf8f-c702-470c-9c29-1a10013bc33d.json', true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var devTime = JSON.parse(xhr.responseText);
            console.log(devTime);
            totalPercent = 0;
            for (var i = 0; i < devTime.data.length; i++) {
                var editor = devTime.data[i];
                var element = document.createElement('div');
                var osName = editor.name;
                var color = editor.color;
                if (osName == 'Mac') {
                    osName = 'School Laptop';
                    color = 'rgb(228, 130, 255)';
                } else {
                    osName = 'Personal Laptop';
                    color = 'rgb(114, 255, 133)';
                }
                totalPercent += editor.percent;
                element.className = 'bar';
                element.style.height = '10px';
                element.style.backgroundColor = color;
                element.style.width = '0px';
                element.setAttribute('data-os', osName + ': ' + Math.floor(editor.percent));
                document.getElementById('inner-os-graph').insertBefore(element, document.getElementById('inner-os-graph').firstChild);

                element.style.animation = 'none';
                void element.offsetWidth;
                element.style.width = totalPercent * 2.5 + 'px';
                element.style.animation = '';

                console.log(element);

                (function(index) {
                    var text = document.createElement('div');
                    text.innerHTML = "<div style=\"background-color: " + color + "; height: 10px; width: 10px; border-radius: 20px;\"></div>"
                     + "<p>" + osName + ": " + editor.percent + "%</p>";
                    text.setAttribute('data-os', osName + ': ' + Math.floor(editor.percent));
                    text.style.transition = "opacity 0.8s ease-in-out, transform 0.8s ease-in-out";
                    var delay = index * 100; 
                    setTimeout(function(){
                        text.style.transform = "translateY(30px)";
                        text.style.opacity = "0";
                        document.getElementById('os-names').append(text);
                        setTimeout(function(){
                            text.style.transform = "translateY(0px)";
                            text.style.opacity = "1";
                        }, 10);
                    }, delay);
                    console.log(text);
                })(i);
            }
        }
    }
}