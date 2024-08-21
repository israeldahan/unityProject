
const CustomerDetails = (params) => {
    const { username, userid, price, timestamp } = params.data;
    return (
        <div>
            <h3>Customer Details</h3>
            <p>Username: {username} <br/> User ID: {userid} <br/> Price: {price} <br/> Timestamp: {timestamp}</p>
        </div> 
    );
};

export default CustomerDetails;