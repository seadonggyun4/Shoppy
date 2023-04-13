// 라우터 연결
import {RouterProvider} from "react-router-dom";
import router from 'routes/routes'
// 리코일 연결
import {RecoilRoot} from "recoil";


function App() {
  return (
      <RecoilRoot>
          <RouterProvider router={router} />
      </RecoilRoot>
  );
}

export default App;
