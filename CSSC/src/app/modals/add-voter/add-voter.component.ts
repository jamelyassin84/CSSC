import { BaseService } from 'src/app/services/base.service'
import { Store } from '@ngrx/store'
import { AppState } from '../../store/app.state'
import { AngularFireAuth } from '@angular/fire/auth'
import { Voter } from './../../Models/User'
import { Component, OnInit } from '@angular/core'
import { Alert, Fire } from 'src/app/components/Alert'
import { Collections } from 'src/app/Models/Admin'

@Component({
	selector: 'app-add-voter',
	templateUrl: './add-voter.component.html',
	styleUrls: ['./add-voter.component.scss'],
})
export class AddVoterComponent implements OnInit {
	constructor(private store: Store<AppState>, private service: BaseService) {
		this.store.select('campus').subscribe((campus) => {
			this.data.campus = campus
		})
	}

	data: Voter | any = {
		id_number: '',
		name: '',
		campus: '',
		department: '',
		course: '',
		section: '',
		year: '',
	}

	ngOnInit(): void {}

	save() {
		for (let key in this.data) {
			if (this.data[key] === '') {
				return Alert(
					'Error',
					`One or more fields should not be empty`,
					'error'
				)
			}
		}
		Fire(
			'Add an Administrator',
			'Are you sure you want to add this voter?',
			'info',
			() => {
				new BaseService(
					this.service.firestore,
					Collections.Voters,
					[],
					this.store
				).add(this.data)
				Alert(
					'Student Succesffully Registered',
					`New student has been registered on ${this.data.campus} campus`,
					'success'
				)
			}
		)
	}
}
