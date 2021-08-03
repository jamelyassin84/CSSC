import { INavData } from '@coreui/angular';

export const UserNavs: INavData[] = [
     {
        title: true,
        name: 'Jamel Eid Yassin'
    },
    {
        name: 'Dashboard',
        url: '/home/dashboard',
        icon: 'icon-speedometer',
    },
    {
        name: 'Candidates',
        url: '/home/candidates',
        icon: 'icon-people',
    },
    {
        name: 'Vote',
        url: '/home/vote',
        icon: 'icon-pencil',
    },
]