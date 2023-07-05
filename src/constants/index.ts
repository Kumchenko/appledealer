import NavPoints from "./NavPoints";
import SocialPoints from "./SocialPoints";
import WorkSlides from "./WorkSlides";

const _apiBase = process.env.NEXT_PUBLIC_API_URL;

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