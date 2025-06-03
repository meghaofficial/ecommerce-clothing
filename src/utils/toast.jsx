import { toast } from 'react-toastify';
import { CheckCircle, XCircle } from 'lucide-react';
import '../App.css';

export const showSuccessToast = (message = 'Operation successful!') => {
  toast.success(
    <div className="toast-content">
      <CheckCircle className="toast-icon success" />
      <span className='text-[0.9em]'>{message}</span>
    </div>
  );
};

export const showErrorToast = (message = 'Something went wrong!') => {
  toast.error(
    <div className="toast-content">
      <XCircle className="toast-icon error" />
      <span className='text-[0.9em]'>{message}</span>
    </div>
  );
};
