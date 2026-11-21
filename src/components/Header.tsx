import { getSession } from "@/lib/auth";
import { IconMail, IconPhone } from "@/components/icons";
import HeaderBar from "@/components/HeaderBar";
import { SITE_EMAIL, SITE_PHONE, SITE_PHONE_HREF } from "@/lib/seo";

export default async function Header() {
  const session = await getSession();

  return (
    <>
      {/* Topline с контактами: не фиксируется, уезжает при скролле */}
      <div className="bg-brand-900 text-paper">
        <div className="mx-auto flex h-9 max-w-site items-center justify-end gap-5 px-4 text-xs sm:px-6 lg:px-8">
          <a
            href={SITE_PHONE_HREF}
            className="flex items-center gap-1.5 text-paper/60 transition hover:text-accent-400"
          >
            <IconPhone className="h-3.5 w-3.5" />
            {SITE_PHONE}
          </a>
          <a
            href={`mailto:${SITE_EMAIL}`}
            className="flex items-center gap-1.5 text-paper/60 transition hover:text-accent-400"
          >
            <IconMail className="h-3.5 w-3.5" />
            {SITE_EMAIL}
          </a>
        </div>
      </div>

      <HeaderBar session={session} />
    </>
  );
}
