song_1 = ""
song_2 = ""

leftWristY = 0
leftWristX = 0

rightWristY = 0
rightWristX = 0

score_leftWrist = 0
score_rightWrist = 0

function preload() 
{
    song_1 = loadSound("harry potter.mp3")
    song_2 = loadSound("peter pan.mp3")
}
function setup() 
{
    canvas = createCanvas(500, 460)
    canvas.position(485, 200)

    video = createCapture(VIDEO)
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotposes)
}
function play_song() 
{
    song_1.play()
    song_1.rate(1)
    song_1.volume(1)
}
function draw() 
{
    image(video, 0, 0, 500, 460)
    fill("red")
    stroke("red")
    console.log("score_rightWrist = " + score_rightWrist)
    if (score_rightWrist > 0.2) 
    {
        console.log("rightWristY = " + rightWristY)
        circle(rightWristX, rightWristY, 30)
    if (song_2.isPlaying()==false) 
    {
        song_2.play()
        song_2.volume(1)
        song_2.rate(1)
    }
}
if (score_leftWrist > 0.2) 
{
    console.log("leftWristY = " + leftWristY)
    circle(leftWristX, leftWristY, 30)
if (song_1.isPlaying()==false) 
{
    song_1.play()
    song_1.volume(1)
    song_1.rate(1)
}
} 
}
function modelLoaded() 
{
    console.log("Posenet is initialized")
}
function gotposes(results) 
{
   if (results.length > 0) 
   {
    score_leftWrist = results[0].pose.keypoints[9].score
    score_rightWrist = results[0].pose.keypoints[10].score

    leftWristX = results[0].pose.leftWrist.x
    rightWristX = results[0].pose.rightWrist.x

    leftWristY= results[0].pose.leftWrist.y
    rightWristY = results[0].pose.rightWrist.y
   }
}