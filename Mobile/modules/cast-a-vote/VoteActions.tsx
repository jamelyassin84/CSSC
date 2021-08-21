import { groupBy } from "../../constants/helpers"
import { collection } from "../../firebase/firebase"
import { Collections } from "../../Models/Admin"
import { Candidate } from "../../Models/Candidtate"
import { LineUpType } from "../../Models/LineUp"


export async function getCandidates() {
    collection( Collections.Candidate ).get().then( ( data: Candidate[] | any ) => {
        let presidents: Candidate[] = []
        let vps: Candidate[] = []
        let senators: any = []
        let govs: any = []
        let reps: any = []
        let mayors: any = []
        let candidates: Candidate[] = []
        data.forEach( ( canndidate: any ) => {
            candidates.push( Object.assign( canndidate.data(), { id: canndidate.id } ) )
        } );
        candidates.forEach( ( candidate: Candidate ) => {
            if ( candidate.position === LineUpType.President ) {
                presidents.push( candidate )
            }
            if ( candidate.position === LineUpType.VP ) {
                vps.push( candidate )
            }
            if ( candidate.position === LineUpType.Senator ) {
                senators.push( candidate )
            }
            if ( candidate.position === LineUpType.Governor ) {
                govs.push( candidate )
            }
            if ( candidate.position === LineUpType.Representative ) {
                reps.push( candidate )
            }
        } )
        return data
        return [
            { senators: groupBy( senators, 'partylist' ) },
            { govs: groupBy( govs, 'partylist' ) },
            { reps: groupBy( reps, 'partylist' ) },
            { mayors: groupBy( mayors, 'partylist' ) },
        ]
    } )
}