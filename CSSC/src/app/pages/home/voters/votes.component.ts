import { sections } from './../../../constants/AppConstants'
import { Voter } from './../../../Models/User'
import { Component, OnInit } from '@angular/core'
import { BaseService } from 'src/app/services/base.service'
import { Collections } from 'src/app/Models/Admin'
import { Fire } from 'src/app/components/Alert'
import { ReloadService } from 'src/app/services/reload.service'
import { Subscription } from 'rxjs'
import { yearLevels } from 'src/app/constants/AppConstants'
import { sortBy } from 'src/app/constants/helpers'

@Component({
	selector: 'app-votes',
	templateUrl: './votes.component.html',
	styleUrls: ['./votes.component.scss'],
})
export class VotesComponent implements OnInit {
	constructor(
		private service: BaseService,
		private component: ReloadService
	) {
		this.subscriptions.add(
			this.component.shouldReload().subscribe(() => {
				this.ngOnInit()
			})
		)
	}

	private subscriptions = new Subscription()

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
	ngOnInit(): void {
		this.getVoters()
		this.flattenSections()
	}

	voters: Voter[] = []

	departments: string[] = []
	courses: string[] = []
	years: string[] = yearLevels
	sections: string[] = []

	filters: any = {
		department: '',
		course: '',
		year: '',
		section: '',
	}

	flattenSections() {
		const temp: string[] = []
		sections.forEach((section: string) => {
			for (let index in this.years) {
				temp.push(`${parseFloat(index) + 1}-${section}`)
			}
		})
		this.sections = temp.sort()
	}

	getVoters() {
		this.departments = []
		this.courses = []
		new BaseService(
			this.service.firestore,
			Collections.Voters,
			[],
			this.service.store
		)
			.fetchAll()
			.subscribe((voters: any) => {
				this.voters = sortBy(voters, 'name', 'ASC', 'string', false)
				for (let data of voters) {
					if (!this.departments.includes(data.department)) {
						this.departments.push(data.department)
					}
					if (!this.courses.includes(data.course)) {
						this.courses.push(data.course)
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
				this.voters = sortBy(voters, 'name', 'ASC', 'string', false)
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
