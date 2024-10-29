import {useRouter} from "next/navigation";
/**
 *
 *
 * @param {ReturnType<typeof useRouter>} router
 * @param {string} href
 */
const onNavigate = (
  router: ReturnType<typeof useRouter>,
  href: string
): void => {
  router.push(href);
};
export default onNavigate;
