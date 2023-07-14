import React, {Fragment, useContext, useEffect, useState} from "react";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import {InvoiceView} from "../../components/ui/InvoiceView.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {Progress, Spinner} from "flowbite-react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {Link, Navigate} from "react-router-dom";
import {PendingItem} from "../../components/CartComponents/PendingItem.jsx";

export const OrderView = () => {
  useEffect(() => {
    invoicesReFetch();
  }, []);
  const {invoices, isLoading, invoicesReFetch} = useContext(InvoiceContext);
  const {user, token} = useAuthContext();

  const [open, setOpen] = useState(0);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const {scrollTop} = useContext(InvoiceContext);

  useEffect(() => {
    scrollTop(0);
  })

  const Invoice = ({invoice}) => {
    return (
      <div key={invoice.id} className="px-2 border-l-2 border-b-2 border-tealBase mb-6">
                        <span className={`font-semibold`}>
                          Order #{invoice.id}
                        </span>
        <PendingItem invoice={invoice}/>
        <Progress
          textLabelPosition='outside'
          color={
            invoice.status === -2 ? "red" :
              invoice.status === -1 ? "yellow" :
                invoice.status === 1 ? "blue" :
                  invoice.status === 2 ? "purple" : "green"
          }
          labelText={true} size="lg" textLabel={
          invoice.status === -2 ? "Order Frozen" :
            invoice.status === -1 ? "Pending" :
              invoice.status === 1 ? "Accepted" :
                invoice.status === 2 ? "Delivering" : "Arrived"
        } className="mb-3"
          progress={
            invoice.status === -2 ? 5 :
              invoice.status === -1 ? 25 :
                invoice.status === 1 ? 50 :
                  invoice.status === 2 ? 75 : 100
          }/>
      </div>
    )
  }

  if (token) {
    if (isLoading) {
      return (
        <Fragment>
          <Accordion className="bg-[rgba(0,0,0,0.1)] border-2 border-tealActive px-2 rou nded-lg mb-6 shadow-2xl"
                     open={open === 1}>
            <AccordionHeader className={`text-[16px] text-blackFactory`} onClick={() => handleOpen(1)}>
              <div>
                <Spinner
                  size="xl"
                  color="purple"
                  aria-label="Purple spinner example"
                />
                <span className="ml-3 font-semibold">Loading...</span>
              </div>
            </AccordionHeader>
          </Accordion>
        </Fragment>
      );
    }

    if (invoices?.filter((invoice) => invoice.user_id === user?.id).length === 0) {
      return (
        <main>
          No orders have been placed yet <Link to={'/'}></Link>
        </main>
      );
    } else {
      return (
        <main>
          <div className="mb-3">
            {invoices?.filter((invoice) => invoice.user_id === user?.id && invoice.status !== 3)?.sort((a,b) => b.status - a.status).map((invoice) => {
              return (
                <Invoice key={invoice?.id} invoice={invoice}/>
              );
            })}
          </div>
          <div>
            <div className="font-bold mb-3 text-blackFactory">History</div>
            {invoices?.filter((invoice) => {
              return (invoice.user_id === user?.id && invoice.status === 3)
            }).length === 0 && (
              <div>No orders have arrived yet... <Link className="text-tealHover font-semibold" to="/shop"><br/>Maybe
                be browse some more products?</Link></div>
            )}

            {invoices?.filter((invoice) => {
              return (invoice.user_id === user?.id && invoice.status === 3)
            }).map((invoice) => {
                return <InvoiceView key={invoice?.id} invoice={invoice}/>
              }
            )}
          </div>
        </main>
      );
    }
  } else {
    return (
      <main>
        <Link to={'/login'}>Sign in</Link>
        <Link to={'/signup'}>Sign Up</Link>
      </main>
    );
  }
};
