import { ISocialPoint } from '@/interfaces'
import { faInstagram, faTelegram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SocialPoints: ISocialPoint[] = [
    {
        href: 'https://www.instagram.com/appledealer_ua/',
        child: <FontAwesomeIcon icon={faInstagram} />,
    },
    {
        href: 'https://t.me/kirillkumchenko/',
        child: <FontAwesomeIcon icon={faTelegram} />,
    },
]

export default SocialPoints
