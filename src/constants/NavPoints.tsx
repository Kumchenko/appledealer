import { INavPoint } from "@/interfaces";

const NavPoints: INavPoint[] = [
    {
        href: '/',
        title: 'about-us',
        subPoints: [
            {
                href: '/#about',
                title: 'contacts'
            },
            {
                href: '/#discount',
                title: 'discount'
            },
            {
                href: '/#works',
                title: 'works'
            },
            {
                href: '/#how',
                title: 'how'
            }
        ]
    },
    {
        href: '/order',
        title: 'order-repair'
    },
    {
        href: '/check',
        title: 'order-status'
    }
]

export default NavPoints