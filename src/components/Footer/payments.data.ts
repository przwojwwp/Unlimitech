import type { ComponentType, SVGProps } from "react";
import InpostKurier from "@assets/icons/inpost-kurier.svg?react";
import InpostPaczkomat from "@assets/icons/inpost-paczkomaty.svg?react";
import Blick from "@assets/icons/blik.svg?react";
import Przelewy from "@assets/icons/przelewy24.svg?react";
import Paypo from "@assets/icons/paypo.svg?react";
import Paypal from "@assets/icons/paypal.svg?react";

export type SvgC = ComponentType<SVGProps<SVGSVGElement>>;

export type PaymentItem = {
  key: string;
  label: string;
  Icon: SvgC;
};

export const PAYMENTS: PaymentItem[] = [
  { key: "inpost-kurier", label: "InPost Kurier", Icon: InpostKurier },
  {
    key: "inpost-paczkomat",
    label: "InPost Paczkomaty",
    Icon: InpostPaczkomat,
  },
  { key: "blik", label: "BLIK", Icon: Blick },
  { key: "przelewy24", label: "Przelewy24", Icon: Przelewy },
  { key: "paypo", label: "PayPo", Icon: Paypo },
  { key: "paypal", label: "PayPal", Icon: Paypal },
];
