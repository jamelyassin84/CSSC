import { Voter } from './../../../Models/User'
import { Component, OnInit } from '@angular/core'
import { BaseService } from 'src/app/services/base.service'
import { Collections } from 'src/app/Models/Admin'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'app-votes',
	templateUrl: './votes.component.html',
	styleUrls: ['./votes.component.scss'],
})
export class VotesComponent implements OnInit {
	constructor(private service: BaseService) {}

	ngOnInit(): void {
		this.getVoters()
	}

	voters: Voter[] = []

	departments: string[] = []
	courses: string[] = []
	years: string[] = []
	sections: string[] = []

	filters: any = {
		department: '',
		course: '',
		year: '',
		section: '',
	}

	getVoters() {
		this.departments = []
		this.courses = []
		this.years = []
		this.sections = []
		new BaseService(
			this.service.firestore,
			Collections.Voters,
			[],
			this.service.store
		)
			.fetchAll()
			.subscribe((voters: any) => {
				this.voters = voters
				for (let data of voters) {
					if (!this.departments.includes(data.department)) {
						this.departments.push(data.department)
					}
					if (!this.courses.includes(data.course)) {
						this.courses.push(data.course)
					}
					if (!this.years.includes(data.year)) {
						this.years.push(data.year)
					}
					if (!this.sections.includes(data.section)) {
						this.sections.push(data.section)
					}
				}
			})
	}

	changeHandler() {
		let builder: any = []
		for (let key in this.filters) {
			if (this.filters[key] !== 'All') {
				if (this.filters[key] !== '') {
					let object: any = {}
					object[key] = this.filters[key]
					builder.push(object)
				}
			}
		}
		new BaseService(
			this.service.firestore,
			Collections.Voters,
			builder,
			this.service.store
		)
			.fetchAll()
			.subscribe((voters: any) => {
				this.voters = voters
			})
	}

	remove(id: string | any) {
		Fire(
			'Remove Data',
			'Are you sure you want to remove this data?',
			'info',
			() => {
				new BaseService(
					this.service.firestore,
					Collections.Voters,
					[],
					this.service.store
				).remove(id)
				this.changeHandler()
			}
		)
	}
}
