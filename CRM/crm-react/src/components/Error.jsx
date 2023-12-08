import PropTypes from 'prop-types';

function Error({children}) {
    return (
        <div className='text-center my-4 bg-red-800 text-white font-bold p-3 uppercase rounded-md'>
            {children}
        </div>
    )
}

Error.propTypes = {
    children: PropTypes.node.isRequired
  };

export default Error
