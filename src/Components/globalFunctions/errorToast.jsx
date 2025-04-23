import toast from 'react-hot-toast';

const errorToast = (msg) => {
    toast.error(msg || "Request failed!")
}

export default errorToast;