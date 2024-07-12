import { PrivateRoute, PrivateRouteAuth } from "./helpers/PrivateRouter";
import { Route, Routes } from "react-router-dom";
import { Chat, Home, LoginPage, NotFound, RegisterPage } from "./pages";
import {
  Layout,
  IndexPage,
  AdAccountPage,
  AdSetsItemPage,
  AdSetsPage,
  AdcreativeItemPage,
  AdcreativePage,
  AdsItemPage,
  AdsPage,
  CampaingsItemPage,
  CampaingsPage,
} from "./pages/dashboard";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../state/store/configureStore";
import { ProductItemPage, ProductPage } from "./pages/dashboard/products";
import HomeLayout from "./HomeLayout";
import {
  BgRemover,
  Gallery,
  GenerateFill,
  Model,
  Restore,
  TextGenerate,
  WebScraping,
} from "./pages/dashboard/AI";
import ForgetPage from "./pages/auth/ForgetPage";
import ResetPage from "./pages/auth/ResetPage";
import Profile from "./pages/profile/Profile";
import RedirectPage from "./pages/auth/RedirectPage";
import { Cancel, Success } from "./pages/home";
import { Toaster } from "react-hot-toast";
import Video from "./pages/chat/Video";
import Dashboard from "./pages/stripe/Dashboard";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Toaster position="top-center" reverseOrder={false} />

          <Routes>
            <Route path="/" element={<HomeLayout />}>
              <Route index element={<Home />} />
              <Route
                path="/login"
                element={<PrivateRouteAuth element={<LoginPage />} />}
              />
              <Route
                path="/register"
                element={<PrivateRouteAuth element={<RegisterPage />} />}
              />
              <Route
                path="/forget-password"
                element={<PrivateRouteAuth element={<ForgetPage />} />}
              />
              <Route
                path="/reset_password/:id/:token"
                element={<PrivateRouteAuth element={<ResetPage />} />}
              />
              <Route
                path="/redirect"
                element={<PrivateRouteAuth element={<RedirectPage />} />}
              />
              <Route
                path="/chat"
                element={<PrivateRoute element={<Chat />} />}
              />
              <Route
                path="/video-call"
                element={<PrivateRoute element={<Video />} />}
              />
            </Route>

            <Route
              path="/dashboard"
              element={<PrivateRoute element={<Layout />} />}
            >
              <Route index element={<IndexPage />} />
              <Route path="adAccount/:id" element={<AdAccountPage />} />
              <Route path="campaing" element={<CampaingsPage />} />
              <Route path="campaign/:id" element={<CampaingsItemPage />} />
              <Route path="adsets" element={<AdSetsPage />} />
              <Route path="adsets/:id" element={<AdSetsItemPage />} />
              <Route path="ads" element={<AdsPage />} />
              <Route path="ads/:id" element={<AdsItemPage />} />
              <Route path="adcreative" element={<AdcreativePage />} />
              <Route path="adcreative/:id" element={<AdcreativeItemPage />} />
              <Route path="products" element={<ProductPage />} />
              <Route path="products/:id" element={<ProductItemPage />} />
              <Route path="Recommendation" element={<Model />} />
              <Route path="WebScraping" element={<WebScraping />} />
              <Route path="AI">
                <Route index element={<Model />} />
                <Route path="text" element={<TextGenerate />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="generate-fill" element={<GenerateFill />} />
                <Route path="bg-remover" element={<BgRemover />} />
                <Route path="image-restore" element={<Restore />} />
              </Route>
              <Route path="profile" element={<Profile />} />
              <Route path="payment" element={<Dashboard />} />
            </Route>

            {/* Home */}
            <Route
              path="/success"
              element={<PrivateRoute element={<Success />} />}
            />
            <Route
              path="/cancel"
              element={<PrivateRoute element={<Cancel />} />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
