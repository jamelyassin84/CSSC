import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
	name: 'twoDecimals',
})
export class TwoDecimalsPipe implements PipeTransform {
	transform(value: number, ...args: unknown[]): unknown {
		return Math.round(value * 100) / 100
	}
}
