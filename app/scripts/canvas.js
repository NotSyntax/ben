const canvas = document.getElementById('ben');
const context = canvas.getContext('2d');

const images = 'assets/images';
const sounds = {
    no: new Audio('assets/sounds/no01.wav'),
    yes: new Audio('assets/sounds/yes01.wav'),
    laugh: new Audio('assets/sounds/phoneLaugh.wav'),
    silly: new Audio('assets/sounds/sillyFace01.wav'),

    answer: new Audio('assets/sounds/phoneAnswer.wav'),
    ring: new Audio('assets/sounds/phoneRing01.wav'),
    drop: [
        new Audio('assets/sounds/phoneDrop.wav'),
        new Audio('assets/sounds/phoneDrop02.wav')
    ],
}

const frame = new Image();

const idle = new Image();
const waiting = new Image();

idle.src = 'assets/images/idle.png';
waiting.src = 'assets/images/waiting.png';

frame.src = idle.src;

window.state = frame;

let animating = false;
let call = false;

window.render = (image) => {
    context.canvas.width = 0.68085106383 * window.innerHeight;
    context.canvas.height = window.innerHeight;

    context.clearRect(0, 0, canvas.width, canvas.height);
    frame.src = image.src;

    context.drawImage(frame, 0, 0, canvas.width, canvas.height)
}

window.render(window.state);
window.addEventListener('resize', () => {
    window.render(window.state);
});

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

if (navigator.getUserMedia) {
   navigator.getUserMedia({ audio: true },
      (stream) => {
        let audioContext = new AudioContext();
        let audioSource = new audioContext.createMediaStreamSource(stream);
        let analyser = audioContext.createAnalyser();

        analyser.fftSize = 512;
        analyser.minDecibels = -127;
        analyser.maxDecibels = 0;
        analyser.smoothingTimeConstant = 0.4;

        audioSource.connect(analyser);
      },
      (err) => {
         console.log("Microphone access denied!");
      }
    );
} else {
   console.log('Microphone not supported!')
}

document.body.addEventListener('click', () => {
    if (!animating) {
        call = !call
        animating = true;

        if (call) {
            sounds.ring.play();
            window.playAnimation(window.animations.ring, 10, () => {
                window.playAnimation(window.animations.pick_up, 10, () => {
                    animating = false;

                    window.state = waiting;
                    window.render(waiting);
                });

                sounds.answer.play();
            });
        } else {
            window.playAnimation(window.animations.hang_up, 10, () => {
                animating = false;

                window.state = idle;
                window.render(idle);
            });

            sounds.drop[Math.floor(Math.random() * sounds.drop.length)].play();
        }
    }
}, true); 