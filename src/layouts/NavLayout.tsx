import Footer from "@/components/Footer/Footer"
import Header from "@/components/Header/Header"
import { NavPoints, SocialPoints } from "@/constants"

const NavLayout = ({ children }: React.PropsWithChildren) => {
    return (
        <div style={{overflowX: 'hidden'}}>
            <Header navPoints={NavPoints} socialPoints={SocialPoints} />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default NavLayout