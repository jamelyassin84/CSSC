import { ModalService } from './../../services/modal.service'
import { Input } from '@angular/core'
import { Component } from '@angular/core'
import {
	NgbModal,
	ModalDismissReasons,
	NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap'
import { OnDestroy } from '@angular/core'

@Component({
	selector: 'btn-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnDestroy {
	constructor(private modalService: NgbModal, private modalS: ModalService) {
		this.subscription = this.modalS.closeListener().subscribe(() => {
			this.modalService.dismissAll()
		})
	}

	subscription: any

	ngOnDestroy(): void {
		this.subscription.unsubscribe()
	}

	closeResult = ''
	@Input() size: any = 'lg'
	@Input() title: String = ''
	@Input() btnSize: String = ''
	@Input() btnTitle: String = ''
	@Input() btnClass: String = ''
	@Input() icon: String = ''
	@Input() template: any

	ngOnInit(): void {}

	open(content: any) {
		this.modalService
			.open(content, {
				ariaLabelledBy: 'modal-basic-title',
				size: this.size,
			})
			.result.then(
				(result) => {
					this.closeResult = `Closed with: ${result}`
				},
				(reason) => {
					this.closeResult = `Dismissed ${this.getDismissReason(
						reason
					)}`
				}
			)
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC'
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop'
		} else {
			return `with: ${reason}`
		}
	}
}
