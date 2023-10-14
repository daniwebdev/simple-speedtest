<?php
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    // Simulate a file download (10MB file)
    $fileSize = 5 * 1024 * 1024; // 10MB in bytes
    header("Content-type: application/octet-stream");
    header("Content-length: $fileSize");
    header("Content-Disposition: attachment; filename=testfile.bin");
    // Output random data for the file download
    echo str_repeat("0", $fileSize);
    exit;
} elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Simulate a file upload
    $input = fopen("php://input", "r");
    $tempFile = tempnam(sys_get_temp_dir(), "upload");
    $output = fopen($tempFile, "w");
    stream_copy_to_stream($input, $output);
    fclose($input);
    fclose($output);
    unlink($tempFile); // Clean up temporary file
    header("HTTP/1.1 200 OK");
    exit;
}
?>
