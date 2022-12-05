import { configureStore } from "@reduxjs/toolkit";
import InforHoaDon from "./slice/hoaDon";
import InforUser from "./slice/inforUser";

export default configureStore({
  reducer: {
    storeInforUser: InforUser,
    storeInforHoaDon: InforHoaDon,
  },
});
