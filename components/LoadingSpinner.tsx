import { Spinner } from 'react-bootstrap';

const LoadingSpinner = (props: { message: string }) => {
  return (
    <div className='pt-5 d-flex align-items-center justify-content-center'>
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>{props.message}</span>
      </Spinner>
    </div>
  );
};
export default LoadingSpinner;
