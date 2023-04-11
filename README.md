# Animate Algorithm

The objective of this project is to create examples of 2D animations using Motion Canvas. The animation scenes will be designed to illustrate visually the steps of a given algorithm. The algorithm will not necessarily be optimized, but the animation scene will be designed to be as clear and as customizable as possible.

[Demo](demo.mp4)


## How generate a video
One of the ways to generate a video is to run the Motion Canvas tool and then render the scene.

Run the following command to start the Motion Canvas tool.

```shellscript
npm run serve
``` 

Make sure to setup the range for of the rendering from the beginning to the end of the scene.

Render the scene and then run the following commands in the project's folder to generate the video.

```shellscript
ffmpeg -framerate 60 -i output/project/%06d.png -c:a copy -shortest -c:v libx264 -pix_fmt yuv420p .output/test.mp4
```