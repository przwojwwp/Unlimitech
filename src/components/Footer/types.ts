export type FooterLink = { label: string; href: string };

export type FooterLinksSection = {
  kind: "links";
  id: string;
  title: string;
  items: FooterLink[];
  colClass?: string;
  collapsible?: boolean;
};

export type FooterContactSection = {
  kind: "contact";
  id: string;
  title: string;
  tel: { label: string; href: string };
  email: { label: string; href: string };
  note?: string;
  colClass?: string;
  collapsible?: false;
};

export type FooterSection = FooterLinksSection | FooterContactSection;
