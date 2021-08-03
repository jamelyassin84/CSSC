import { INavData } from '@coreui/angular';

export const AdminNavs: INavData[] = [
    {
        title: true,
        name: 'CSSC'
    },
    {
        name: 'Dashboard',
        url: '/home/dashboard',
        icon: 'icon-speedometer',
    },
    {
        name: 'Summary',
        url: '/home/s',
        icon: 'icon-pin',
    },
    {
        name: 'Voters',
        url: '/home/voters',
        icon: 'icon-user',
    },
    {
        name: 'Ordering',
        url: '/home/ordering',
        icon: 'icon-layers',
    },
    {
        name: 'Candidates',
        url: '/home/candidates',
        icon: 'icon-people',
    },
     {
        title: true,
        name: 'For User'
    },
    {
        name: 'Vote',
        url: '/home/vote',
        icon: 'icon-pencil',
    },
]