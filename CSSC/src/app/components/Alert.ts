import Swal from 'sweetalert2'
export function Fire(
	title: string,
	text: string,
	type: any,
	callback: Function
) {
	Swal.fire({
		title: title,
		text: text,
		icon: type,
		showCancelButton: true,
		confirmButtonText: 'Yes',
		cancelButtonText: 'Cancel',
	}).then((result: any) => {
		if (result.value) {
			return callback()
		}
	})
	if (type == 'error') {
		type = 'warning'
	}
	const audio = new Audio(`/assets/audio/${type}.mp3`)
	audio.volume = 0.5
	audio.play()
}

export function Alert(title: string, text: string, type: any) {
	Swal.fire(title, text, type)
	if (type == 'error') {
		type = 'warning'
	}
	const audio = new Audio(`/assets/audio/${type}.mp3`)
	audio.volume = 0.5
	audio.play()
}

export function Welcome(name: String) {
	Alert('Success', `Welcome Back! ${name}`, 'success')
}

export function pop() {
	const audio = new Audio(`/assets/audio/pop1.mp3`)
	audio.volume = 0.1
	audio.play()
}
