import NavPoints from "./NavPoints";
import SocialPoints from "./SocialPoints";
import WorkSlides from "./WorkSlides";

const _apiBase = (typeof window !== 'undefined') ? window.location.origin : process.env.NEXT_PUBLIC_URL;

export {
    NavPoints,
    SocialPoints,
    WorkSlides,
    _apiBase
}

export {
    callInitialValues,
    checkInitialValues,
    orderInitialValues
} from './InitialValues'