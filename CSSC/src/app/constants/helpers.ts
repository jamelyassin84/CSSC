export function groupBy(data: Array<any>, property: string) {
	if (data.length > 0 && !(property in data[0])) {
		throw new Error(`${property} does not exist in array.`)
	}
	const temp: any = {}
	data.forEach((item: any) => {
		const key = item[property]
		if (!(key in temp)) {
			temp[key] = []
		}
		temp[key].push(item)
	})

	return Object.keys(temp).map((key) => temp[key])
}

export function where(data: Array<any>, key: string, value: any) {
	return data.filter((item) => item[key] === value)
}
