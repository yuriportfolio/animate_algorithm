# Animate Algorithm

The objective of this project is to create examples of 2D animations using Motion Canvas. The animation scenes will be designed to illustrate visually the steps of a given algorithm. The algorithm will not necessarily be optimized, but the animation scene will be designed to be as clear and as customizable as possible.

## How generate a video

One of the ways to generate a video is to run the Motion Canvas tool and then render the scene.

```shellscript
npm run serve
``` 

Then run the following command to generate the video.

```shellscript
ffmpeg -framerate 60 -i output/project/%06d.png -c:a copy -shortest -c:v libx264 -pix_fmt yuv420p ./test.mp4
```