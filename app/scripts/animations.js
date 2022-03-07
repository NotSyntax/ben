const loadAnimations = (directory, start, end) => {
	let frames = [];

	while (start <= end) {
		let frame = new Image();
		frame.src = `${directory}/${start.toString().padStart(4, "0")}.png`
		frames.push(frame);

		start++;
	}

	return frames
}

window.animations = {
	laugh: loadAnimations('assets/images/answers/laugh', 27, 42),
	no: loadAnimations('assets/images/answers/no', 46, 53),
	silly: loadAnimations('assets/images/answers/silly', 67, 75),
	yes: loadAnimations('assets/images/answers/yes', 154, 163),

	ring: loadAnimations('assets/images/ring', 2, 9),
	hang_up: loadAnimations('assets/images/hang_up', 166, 173),
	pick_up: loadAnimations('assets/images/pick_up', 10, 25),
}

window.playAnimation = (frames, fps, finished) => {
	frames.forEach((frame, i) => {
		setTimeout(() => {
			window.state = frame;
			window.render(frame);

			if (i == frames.length - 1) {
				finished();
			}
		}, i * (1000 / fps))
	});
}