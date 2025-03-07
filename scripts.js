if (visualViewport.width < 600) {
    var scroll = document.querySelectorAll('.project-tile');
    window.addEventListener('scroll', function() {
        var welcomeOffset = visualViewport.height - 530;
        var projectTileHeight = 400;
        var scrollPos = (window.scrollY - this.visualViewport.width + welcomeOffset) / projectTileHeight;
        for (var i = 0; i < scroll.length; i++) {
            if(scrollPos - i < 1 && scrollPos - i > 0) {
                scroll[i].style.transform = 'scale(1.1)';
                scroll[i].style.borderRadius = '20px';
                scroll[i].style.backgroundColor = 'rgb(55,55,55)'
            } else {
                scroll[i].style.transform = 'scale(1.0)';
                scroll[i].style.borderRadius = '10px';
                scroll[i].style.backgroundColor = 'rgb(32,32,32)'
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var popup = document.getElementById('popup');
    var popupContent = document.querySelector('.popup-content');
    var popupTitle = document.getElementById('popup-title');
    var popupYearTech = document.getElementById('popup-year-tech');
    var popupDescription = document.getElementById('popup-description');
    var closeBtn = document.querySelector('.close');

    document.querySelectorAll('.project-tile').forEach(function(tile) {
        tile.addEventListener('click', function(event) {
            event.preventDefault();
            popupTitle.textContent = tile.getAttribute('data-title');
            popupYearTech.textContent = tile.getAttribute('data-year') + ' - ' + tile.getAttribute('data-tech');
            popupDescription.textContent = tile.getAttribute('data-description');
            popup.style.display = 'block';

            // Trigger reflow to restart CSS animations
            popupTitle.style.animation = 'none';
            popupYearTech.style.animation = 'none';
            popupDescription.style.animation = 'none';
            void popupTitle.offsetWidth; // Trigger reflow
            void popupYearTech.offsetWidth; // Trigger reflow
            void popupDescription.offsetWidth; // Trigger reflow
            popupTitle.style.animation = '';
            popupYearTech.style.animation = '';
            popupDescription.style.animation = '';
        });
    });

    function closePopup() {
        popup.classList.add('fade-out');
        popupContent.classList.add('slide-out');
        popupTitle.classList.add('fade-out');
        popupYearTech.classList.add('fade-out');
        popupDescription.classList.add('fade-out');

        setTimeout(function() {
            popup.style.display = 'none';
            popup.classList.remove('fade-out');
            popupContent.classList.remove('slide-out');
            popupTitle.classList.remove('fade-out');
            popupYearTech.classList.remove('fade-out');
            popupDescription.classList.remove('fade-out');
        }, 500); // Match the duration of the fade-out animation
    }

    closeBtn.addEventListener('click', closePopup);

    window.addEventListener('click', function(event) {
        if (event.target == popup) {
            closePopup();
        }
    });
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

                element = document.createElement('div');
                element.innerHTML = "<div style=\"background-color: " + editor.color + "; height: 10px; width: 10px; border-radius: 20px;\"></div>"
                 + "<p>" + editor.name + ": " + editor.percent + "%</p>";
                 element.style.translate = "translateY(-30px)";
                 element.style.opacity = "0%";
                element.setAttribute('data-editor', editor.name + ': ' + Math.floor(editor.percent));
                element.style.animation = 'opacity 0.5s, translate 0.5s';
                document.getElementById('editor-names').append(element);
                console.log(element);
                // Trigger reflow to restart CSS animations
                element.style.animation = 'none';
                void element.offsetWidth; // Trigger reflow
                element.style.opacity = "100%";
                element.style.translate = "translateY(0px)";
                element.style.animation = '';
            }
        }
    }
}

getDevOperatingSystems();
// fetches data for the second graph
function getDevOperatingSystems() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://wakatime.com/share/@firebolt9907/45cdaf8f-c702-470c-9c29-1a10013bc33d.json', true);
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

                // Trigger reflow to restart CSS animations
                element.style.animation = 'none';
                void element.offsetWidth; // Trigger reflow
                element.style.width = totalPercent * 2.5 + 'px';
                element.style.animation = '';

                console.log(element);

                text = document.createElement('div');
                text.innerHTML = "<div style=\"background-color: " + color + "; height: 10px; width: 10px; border-radius: 20px;\"></div>"
                 + "<p>" + osName + ": " + editor.percent + "%</p>";
                text.setAttribute('data-os', osName + ': ' + Math.floor(editor.percent));
                document.getElementById('os-names').append(text);
                console.log(text);
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
                if (totalPercent > 90) {
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

                    element = document.createElement('div');
                    element.innerHTML = "<div style=\"background-color: " + color + "; height: 10px; width: 10px; border-radius: 20px;\"></div>"
                    + "<p>" + lang + ": " + (totalPercent) + "%</p>";
                    element.setAttribute('data-lang', lang + ': ' + Math.floor(totalPercent));
                    document.getElementById('lang-names').append(element);
                    console.log(element);
                    break;
                }
                var editor = devTime.data[i];
                var element = document.createElement('div');
                var lang = editor.name;
                var color = editor.color;
                if (lang == 'Dart') {
                    lang = 'Flutter';
                    color = 'rgb(0, 161, 254)';
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

                element = document.createElement('div');
                element.innerHTML = "<div style=\"background-color: " + color + "; height: 10px; width: 10px; border-radius: 20px;\"></div>"
                 + "<p>" + lang + ": " + editor.percent + "%</p>";
                element.setAttribute('data-lang', lang + ': ' + Math.floor(editor.percent));
                document.getElementById('lang-names').append(element);
                console.log(element);
            }
        }
    }
}