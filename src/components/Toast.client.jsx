import 'react-toastify/dist/ReactToastify.min.css';
import {ToastContainer, toast as toastify} from 'react-toastify';

export const toast = toastify;

export default function CustomToastContainer() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
