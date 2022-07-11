import { SiFacebook, SiLine, SiTwitter } from 'react-icons/si';
import type { FC } from 'react';
import type { IconType } from 'react-icons';

const params = (p: { [_: string]: string }): string =>
  Object.entries(p)
    .map(entry => entry.map(encodeURIComponent).join('='))
    .join('&');

interface ShareButtonProps {
  url: string;
  icon: IconType;
  fg: string;
  bg: string;
}
const ShareButton: FC<ShareButtonProps> = ({ url, icon: Icon, fg, bg }) => (
  <a
    href={url}
    target="_blank"
    style={{ color: fg, backgroundColor: bg }}
    className="rounded-full p-3 text-xl"
    rel="noopener noreferrer"
  >
    <Icon />
  </a>
);

interface ShareProps {
  url: string;
  title: string;
}

export const Share: FC<ShareProps> = ({ url, title }) => (
  <aside className="flex gap-2">
    <ShareButton
      url={`https://twitter.com/share?${params({ url, text: title })}`}
      fg="#ffffff"
      bg="#00aced"
      icon={SiTwitter}
    />
    <ShareButton
      url={`https://www.facebook.com/sharer/sharer.php?${params({ u: url })}`}
      fg="#ffffff"
      bg="#3b5998"
      icon={SiFacebook}
    />
    <ShareButton
      url={`https://line.me/R/msg/text/?${encodeURIComponent(
        `${title} ${url}`
      )}`}
      fg="#ffffff"
      bg="#00b800"
      icon={SiLine}
    />
  </aside>
);
