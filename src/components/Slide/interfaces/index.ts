export interface ISlideProps extends React.ComponentPropsWithoutRef<'div'> {
    title: string
    desc: string
    src: string
    href: string
    priority?: boolean
}
