import type { NotFoundHandler } from "sonik"

/* eslint-disable-next-line @typescript-eslint/promise-function-async */
const NotFound: NotFoundHandler = () => <p>404: Not Found</p>

export default NotFound
