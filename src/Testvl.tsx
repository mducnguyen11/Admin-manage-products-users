import React from 'react';
import { compare, dinero, lessThan } from 'dinero.js';
import * as xx from '@dinero.js/currencies';
interface Props {}

const Testvl = (props: Props) => {
  // const d1 = ;
  // const d2 = dinero({ amount: 800, currency: USD });
  const gh = 'USD';
  console.log(
    compare(dinero({ amount: 500, currency: xx[gh as keyof typeof xx] }), dinero({ amount: 800, currency: xx.EUR })),
  );
  return <div>Testvl</div>;
};

export default Testvl;
