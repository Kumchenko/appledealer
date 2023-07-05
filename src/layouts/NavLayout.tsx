import Footer from "@/components/Footer/Footer"
import Header from "@/components/Header/Header"
import { NavPoints, SocialPoints } from "@/constants"

const NavLayout = ({ children }: React.PropsWithChildren) => {
    return (
        <>
            <Header navPoints={NavPoints} socialPoints={SocialPoints} />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default NavLayout