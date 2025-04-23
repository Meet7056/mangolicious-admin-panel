import toast from 'react-hot-toast';

const infoToast = (msg) => {
    toast(msg,
        {
            icon: '📌',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        }
    );

}

export default infoToast;