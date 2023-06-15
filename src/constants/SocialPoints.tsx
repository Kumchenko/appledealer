import { ISocialPoint } from "@/interfaces";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SocialPoints: ISocialPoint[] = [
    {
        href: 'https://www.instagram.com/appledealer_ua/',
        child: <FontAwesomeIcon icon={faInstagram} />
    }
]

export default SocialPoints