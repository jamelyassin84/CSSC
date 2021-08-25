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

export function sortBy<T, K extends keyof T>(
	data: Array<T>,
	key: K | any,
	order: 'ASC' | 'DESC',
	type: 'number' | 'string',
	child: boolean = false
) {
	return data.sort((a: any, b: any) => {
		if (!child) {
			if (type === 'number') {
				return order === 'ASC' ? a[key] + b[key] : b[key] + a[key]
			}
			return order === 'ASC'
				? a[key].localeCompare(b[key])
				: b[key].localeCompare(a[key])
		}
		if (type === 'number') {
			return order === 'ASC'
				? a.voter[key] + b.voter[key]
				: b.voter[key] + a.voter[key]
		}
		return order === 'ASC'
			? a.voter[key].localeCompare(b.voter[key])
			: b.voter[key].localeCompare(a.voter[key])
	})
}

export function where(data: Array<any>, key: string, value: any) {
	if (data.length > 0 && !(key in data[0])) {
		throw new Error(`${key} does not exist in data.`)
	}
	return data.filter((item) => item[key] === value)
}

export function dataExist(
	object: any,
	array: Array<any>,
	key: string,
	child: boolean = false
) {
	if (!child) {
		return array.some((element: any) => element[key] === object[key])
	}
	return array.some(
		(element: any) => element.voter[key] === object.voter[key]
	)
}
