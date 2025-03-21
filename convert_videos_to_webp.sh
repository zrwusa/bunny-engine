#!/bin/bash

# Prompt the user to enter the video file path
read -p "Please enter the path to the video files (absolute or relative): " input_path

# Check if the input path exists
if [ ! -d "$input_path" ]; then
    echo "Input path does not exist or is not a directory."
    exit 1
fi

# Prompt the user to enter the video file extension
read -p "Please enter the video file extension (e.g., mp4): " video_extension

# Prompt the user to enter the resolution for WebP files
read -p "Please enter the resolution for WebP files (format like 1280:720 or 1024:-1, leave empty to omit -s parameter): " resolution_input

# Create the output directory path
output_dir="$input_path/webp_output"

# Check if the output directory exists, and create it if it doesn't
if [ ! -d "$output_dir" ]; then
    mkdir -p "$output_dir"
fi

# Iterate through all video files in the specified path
for input_file in "$input_path"/*."$video_extension"; do
    # Check if there are matching files
    if [ -e "$input_file" ]; then
        # Extract the filename (without extension)
        filename=$(basename "$input_file" ".$video_extension")

        # Set the output filename
        output_file="$output_dir/$filename.webp"

        # Build the ffmpeg command
        ffmpeg_command="ffmpeg -i '$input_file'"

        # If the user provided a resolution, add the -s parameter
        if [ -n "$resolution_input" ]; then
            ffmpeg_command="$ffmpeg_command -vf 'scale="$resolution_input",fps=10,setpts=PTS-STARTPTS' -vcodec libwebp -lossless 0 -loop 0 -preset default -an -fps_mode drop "
        else
            ffmpeg_command="$ffmpeg_command -vf 'fps=10,setpts=PTS-STARTPTS' -vcodec libwebp -lossless 0 -loop 0 -preset default -an -fps_mode drop "
        fi

        # Finally, add the output filename
        ffmpeg_command="$ffmpeg_command '$output_file'"

        # Execute the ffmpeg command
        eval "$ffmpeg_command"
    fi

done

echo "Conversion complete!"
