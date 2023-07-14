import './bootstrap';
import React, {Suspense} from "react";
import ReactDOM from "react-dom/client";

import "./assets/styles/main.css";
import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
import {AuthContext} from "./context/AuthContext.jsx";
import {ProductProvider} from "./context/ProductContext.jsx";
import {CartProvider} from "./context/CartContext.jsx";
import {InvoiceProvider} from "./context/InvoiceContext.jsx";
import {InvoiceProductProvider} from "./context/InvoiceProductContext.jsx";
import {UserProvider} from "./context/UserContext.jsx";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {ChatProvider} from "./context/ChatContext.jsx";
import {GoogleMapsProvider} from "./context/GoogleMapsContext.jsx";
import {ProjectContext} from "./context/Factory/ProjectContext.jsx";
import {ProjectProtoContext} from "./context/Factory/ProjectProtoContext.jsx";
import {DonateProvider} from "./context/DonateContext.jsx";
import {CommentContext} from "./context/Factory/CommentContext.jsx";
import {FundingProvider} from "./context/FundingContext.jsx";
import {BackProjectProvider} from "./context/BackProjectContext.jsx";

const client = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <AuthContext>
        <UserProvider>
          <GoogleMapsProvider>
            <CommentContext>
              <ProjectProtoContext>
                <ProjectContext>
                  <ChatProvider>
                    <InvoiceProductProvider>
                      <InvoiceProvider>
                        <ProductProvider>
                          <CartProvider>
                            <BackProjectProvider>
                              <FundingProvider>
                                <DonateProvider>
                                  <RouterProvider router={router}/>
                                </DonateProvider>
                              </FundingProvider>
                            </BackProjectProvider>
                          </CartProvider>
                        </ProductProvider>
                      </InvoiceProvider>
                    </InvoiceProductProvider>
                  </ChatProvider>
                </ProjectContext>
              </ProjectProtoContext>
            </CommentContext>
          </GoogleMapsProvider>
        </UserProvider>
      </AuthContext>
    </QueryClientProvider>
  </React.StrictMode>
);

