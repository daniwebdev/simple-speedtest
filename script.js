
let download_hist = {};
let upload_hist = {};

document.getElementById("startButton").addEventListener("click", function() {
    var xhr = new XMLHttpRequest();
    var startTime, endTime;
    var totalSize = 0;

    // Measure download speed
    xhr.open("GET", "speedtest.php", true); // Replace with your download file URL
    xhr.responseType = "arraybuffer";
    xhr.onloadstart = function() {
        startTime = performance.now();
        // document.getElementById("status").innerText = "Measuring download speed...";
    };
    xhr.onprogress = function(event) {
        if (event.lengthComputable) {
            totalSize = event.total;
            var downloaded = event.loaded;
            var elapsedTime = (performance.now() - startTime) / 1000; // in seconds
            var downloadSpeed = downloaded / elapsedTime / 1024 / 1024 * 8; // in Mbps
            download_hist[new Date().getTime()] = downloadSpeed;
            // document.getElementById("status").innerText = "Download Speed: " + downloadSpeed.toFixed(2) + " Mbps";
            document.querySelector('#download-speed').innerText = `${downloadSpeed.toFixed(2)} Mbps`

        }
    };
    xhr.onload = function() {
        endTime = performance.now();
        var duration = (endTime - startTime) / 1000; // in seconds
        var downloadSpeed = totalSize / duration / 1024 / 1024 * 8; // in Mbps
        // document.getElementById("status").innerText = "Download Speed: " + downloadSpeed.toFixed(2) + " Mbps";
        document.querySelector('#download-speed').innerText = `${downloadSpeed.toFixed(2)} Mbps`

        // Measure upload speed
        var uploadStartTime = performance.now();
        var uploadData = new ArrayBuffer(10 * 1024 * 1024); // 10MB random data for upload test
        var uploadXhr = new XMLHttpRequest();
        uploadXhr.open("POST", "speedtest.php", true); // Replace with your upload endpoint URL
        uploadXhr.onprogress = (event) => {
            if(event.lengthComputable) {
                console.log(event.loaded);
            }
        };
        uploadXhr.onload = function() {
            var uploadEndTime = performance.now();
            var uploadDuration = (uploadEndTime - uploadStartTime) / 1000; // in seconds
            var uploadedSize = uploadData.byteLength;
            var uploadSpeed = uploadedSize / uploadDuration / 1024 / 1024 * 8; // in Mbps
            upload_hist[new Date().getTime()] = uploadSpeed;
            // document.getElementById("status").innerText += "\nUpload Speed: " + uploadSpeed.toFixed(2) + " Mbps";

            document.querySelector('#upload-speed').innerText = `${uploadSpeed.toFixed(2)} Mbps`

            // Draw the chart after measuring both download and upload speeds
            drawChart(download_hist, upload_hist, "svg-container");
        };
        uploadXhr.send(uploadData);
    };
    xhr.send();
});

function drawChart(downloadData, uploadData, containerId) {
    // Code to draw the chart using downloadData and uploadData
    // This can be implemented using libraries like Chart.js or D3.js
    // Example using Chart.js:
    // var ctx = document.getElementById(containerId).getContext('2d');
    // var myChart = new Chart(ctx, {
    //     type: 'line',
    //     data: {
    //         labels: Object.keys(downloadData),
    //         datasets: [{
    //             label: 'Download Speed (Mbps)',
    //             data: Object.values(downloadData),
    //             borderColor: 'blue',
    //             fill: false
    //         }, {
    //             label: 'Upload Speed (Mbps)',
    //             data: Object.values(uploadData),
    //             borderColor: 'green',
    //             fill: false
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             x: {
    //                 type: 'linear',
    //                 position: 'bottom'
    //             }
    //         }
    //     }
    // });
}