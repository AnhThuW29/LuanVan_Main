import { configureStore } from "@reduxjs/toolkit";
import InforHoaDon from "./slice/hoaDon";
import InforUser from "./slice/inforUser";
import InforYeuThich from "./slice/yeuThich";

export default configureStore({
  reducer: {
    storeInforUser: InforUser,
    storeInforHoaDon: InforHoaDon,
    storeInforYeuThich: InforYeuThich,
  },
});
